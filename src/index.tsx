import { Elysia, t } from "elysia";
import { html } from '@elysiajs/html';
import { HomePage } from "./pages/homepage";
import { SearchSector } from "./components/searchsector";
import { HomeSector } from "./components/homesector";

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
    }, {
        params: t.Object({
            id: t.String()
        })
    })
    .listen(3000);

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}: ${app.server?.port}`
);
