import { Elysia, t } from "elysia";
import { html } from '@elysiajs/html';
import { HomePage } from "./lib/pages/homePage";
import { SearchSector } from "./lib/components/searchSector";
import { HomeSector } from "./lib/components/homeSector";
import { ItemPage } from "./lib/pages/itemPage";
import { LoginPage } from "./lib/pages/loginPage";
import { SignUpPage } from "./lib/pages/signupPage";
import { SignUpForm } from "./lib/components/signupForm";
import { db } from "./utils/drizzle";
import { users } from "./lib/db/schema";
import { eq } from "drizzle-orm";
import { LoginForm } from "./lib/components/loginForm";
import bcrypt from "bcrypt";
import jwt from "@elysiajs/jwt";

const api_key = process.env.USDA_API_KEY;
const salt_rounds = process.env.SALT_ROUNDS;

const app = new Elysia()
    .use(html())
    .use(jwt({
        name: "jwt",
        secret: process.env.JWT_SECRET || "nutrimax-secret-key",
        exp: "1d"
    }))
    .get("/", async ({ cookie: { auth }, jwt }) => {
        const profile = await jwt.verify(auth.value) as { name: string, email: string };
        if (!profile) {
            return (<LoginPage />)
        }

        return (<HomePage profile={profile} />)
    })
    .get("/login", () =>
        (<LoginPage />)
    )
    .get("/signup", () =>
        (<SignUpPage />)
    )
    .post("/signup/user", async ({ body }) => {
        const { name, email, password } = body;

        // Check if all fields are provided
        if (!name || !email || !password) {
            return <SignUpForm success={null} errors={{ name: "All fields are required.", email: "All fields are required", password: "All fields are required" }} />;

        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return <SignUpForm success={null} errors={{ name: null, email: "Invalid email format.", password: null }} />;
        }

        // Validate password strength
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
        if (!passwordRegex.test(password)) {
            return <SignUpForm success={null} errors={{ name: null, email: null, password: "Password must be at least 6 characters long and include at least one lowercase letter, one uppercase letter, and one number." }} />;
        }

        // Check if the email is already in use
        const existingUser = await db.select().from(users).where(eq(users.email, email));
        console.log(existingUser);
        if (existingUser.length > 0) {
            return <SignUpForm success={null} errors={{ name: null, email: "Email already in use.", password: null }} />;
        }

        try {
            await bcrypt.hash(password, parseInt(salt_rounds || "10")).then(async (hash: string) => {
                await db.insert(users).values({
                    name,
                    email,
                    password: hash
                });
            });
        } catch (err) {
            console.error(err);
            return <SignUpForm success={null} errors={{ name: null, email: null, password: "Something went wrong." }} />;
        }

        return <LoginForm success="Account created successfully. Please login." errors={{ email: null, password: null, major: null }} />;
    }, {
        body: t.Object({
            name: t.String(),
            email: t.String(),
            password: t.String()
        })
    })
    .post("/login/user", async ({ body, set, jwt, cookie: { auth } }) => {
        const { email, password } = body;

        // Check if all fields are provided
        if (!email || !password) {
            return <LoginForm success={null} errors={{ email: null, password: null, major: "All the fields need to be filled." }} />;
        }

        const user = await db.select().from(users).where(eq(users.email, email));
        if (user.length === 0) {
            return <LoginForm success={null} errors={{ email: null, password: null, major: "User does not exist. Please Register." }} />;
        }

        const passwordMatch = await bcrypt.compare(password, user[0].password);
        if (!passwordMatch) {
            return <LoginForm success={null} errors={{ email: null, password: "Incorrect password.", major: null }} />;
        }
        auth.set({
            value: await jwt.sign({ name: user[0].name, email: user[0].email })
        })
        set.headers['hx-redirect'] = '/';
        return <LoginForm success="Login successful." errors={{ email: null, password: null, major: null }} />;
    }, {
        body: t.Object({
            email: t.String(),
            password: t.String()
        })

    })
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
