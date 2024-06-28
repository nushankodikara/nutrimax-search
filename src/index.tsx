import { Elysia, t } from "elysia";
import { html } from '@elysiajs/html';
import { HomePage } from "./pages/homepage";
import { SearchSector } from "./components/searchsector";
import { HomeSector } from "./components/homesector";
import { ItemPage } from "./pages/itempage";

const api_key = process.env.API_KEY;
const app = new Elysia()
    .use(html())
    .get("/", () =>
        (<HomePage />)
    )
    .post("/homeSector", () => (
        <HomeSector />
    ))
    .post("/searchSector", () => (
        <SearchSector />
    ))
    .post("/search", async ({ body }) => {
        const data = await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?query=${body.query}&pageSize=10&api_key=${api_key}`)
            .then(res => res.json())
            .then(data => {
                return data;
            })
            .catch(err => {
                console.error(err);
            });
        const html = data.foods.map((food: {
            description: string;
            brandName: string;
            allHighlightFields: string;
            fdcId: string;
            dataType: string;
        }) => {
            return (
                // @ts-ignore
                <a key={food.fdcId} href={`/item/${food.fdcId}`} class="bg-white p-4 rounded-lg hover:shadow-lg shadow-md w-full flex flex-col justify-center items-center">
                    <p class="text-sm font-thin"><i class="fa-solid fa-bowl-food" /> {food.dataType} </p>
                    <h1 class="font-thin capitalize my-2">{food.description}</h1>
                    <p class="text-gray-400 text-xs uppercase">{food.dataType === "Branded" && food.brandName ? food.brandName : "Generic"}</p>
                </a>
            );
        });

        return html.join("");
    }, {
        body: t.Object({
            query: t.String()
        })

    })
    .get("/item/:id", async ({ params }) => {
        const data = await fetch(`https://api.nal.usda.gov/fdc/v1/food/${params.id}?api_key=${api_key}`)
            .then(res => res.json())
            .then(data => {
                return data;
            })
            .catch(err => {
                console.error(err);
            });

        const nutrientMap = data.foodNutrients.reduce((acc: { [x: string]: { id: string; number: number; rank: number; unitName: string; amount: number; }; }, nutrient: { nutrient: { name: string; id: string; number: number; rank: number; unitName: string; }; amount: number; }) => {
            try {
                const nutrientName = nutrient.nutrient.name;
                acc[nutrientName] = {
                    id: nutrient.nutrient.id,
                    number: nutrient.nutrient.number || 0,
                    rank: nutrient.nutrient.rank || 0,
                    unitName: nutrient.nutrient.unitName || "No Record",
                    amount: nutrient.amount || 0
                };
                return acc;
            } catch (err) {
                console.error(err);
            }
        }, {});

        // Check all the macro nutrient data available
        if (!nutrientMap.Energy) {
            nutrientMap.Energy = {
                amount: 0,
                unitName: "No Record"
            };
        }

        if (!nutrientMap.Protein) {
            nutrientMap.Protein = {
                amount: 0,
                unitName: "No Record"
            };
        }

        if (!nutrientMap["Carbohydrate, by difference"]) {
            nutrientMap["Carbohydrate, by difference"] = {
                amount: 0,
                unitName: "No Record"
            };
        }

        if (!nutrientMap["Total lipid (fat)"]) {
            nutrientMap["Total lipid (fat)"] = {
                amount: 0,
                unitName: "No Record"
            };
        }

        return (
            <ItemPage
                foodName={data.description}
                brandName={data.dataType === "Branded" && data.brandName ? data.brandName : "Generic"}
                servingSize={data.servingSize}
                servingSizeUnit={data.servingSizeUnit}
                energy={nutrientMap.Energy.amount}
                energyUnit={nutrientMap.Energy.unitName}
                proteins={nutrientMap.Protein.amount}
                proteinsUnit={nutrientMap.Protein.unitName}
                carbs={nutrientMap["Carbohydrate, by difference"].amount}
                carbsUnit={nutrientMap["Carbohydrate, by difference"].unitName}
                fats={nutrientMap["Total lipid (fat)"].amount}
                fatsUnit={nutrientMap["Total lipid (fat)"].unitName}
            />)
    }, {
        params: t.Object({
            id: t.String()
        })
    })
    .get("/calNutrients", async ({ query }: {
        query: {
            foodWeight: number;
            proteins: number;
            proteinsUnit: string;
            carbs: number;
            carbsUnit: string;
            fats: number;
            fatsUnit: string;
        }
    }) => {
        return (
            <>
                <div class="flex flex-col justify-center items-center text-2xl">
                    <i class="fa-solid fa-calculator" />
                </div>
                <div class="flex flex-col">
                    <p class="text-sm">Proteins</p>
                    <p class="font-thin text-xs">{(query.foodWeight * query.proteins / 100).toFixed(2)}{query.proteinsUnit}</p>
                </div>
                <div class="flex flex-col">
                    <p class="text-sm">Carbs</p>
                    <p class="font-thin text-xs">{(query.foodWeight * query.carbs / 100).toFixed(2)}{query.carbsUnit}</p>
                </div>
                <div class="flex flex-col">
                    <p class="text-sm">Fats</p>
                    <p class="font-thin text-xs">{(query.foodWeight * query.fats / 100).toFixed(2)}{query.fatsUnit}</p>
                </div>
            </>
        )
    })
    .listen(3000);

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
