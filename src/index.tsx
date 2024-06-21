import { Elysia, t } from "elysia";
import { html } from '@elysiajs/html';
import { HomePage } from "./pages/homepage";
import { SearchPage } from "./pages/searchpage";
import { Card } from "./components/card";
import { db, users } from "./utils/drizzle";

const api_key = process.env.API_KEY;
const app = new Elysia()
    .use(html())
    .get("/", () =>
        (<HomePage />)
    )
    .get("/search", () => (
        <SearchPage />
    ))
    .post("/search", async ({ body }) => {
        const data = await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?query=${body.query}&api_key=${api_key}`)
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
                <Card key={food.fdcId} title={`${food.description} - ${food.dataType === "Branded" && food.brandName ? food.brandName : "Generic"}`} body={food.allHighlightFields} href={`/search/${food.fdcId}`} />
            );
        });

        return html.join("");
    }, {
        body: t.Object({
            query: t.String()
        })

    })
    .get("/search/:id", async ({ params }) => {
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
