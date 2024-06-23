import { Head } from "../components/head";
import { MobNav } from "../components/mobnav";

export const ItemPage = ({ foodName = "Error", brandName = "Generic", servingSize = 0, servingSizeUnit = "g", energy = 0, energyUnit = "KCAL", proteins = 0, proteinsUnit = "g", carbs = 0, carbsUnit = "g", fats = 0, fatsUnit = "g", calProtein = 0, calProteinUnit = "g", calCarbs = 0, calCarbsUnit = "g", calFats = 0, calFatsUnit = "g" }: {
    foodName: string,
    brandName: string,
    servingSize: number,
    servingSizeUnit: string,
    energy: number,
    energyUnit: string,
    proteins: number,
    proteinsUnit: string,
    carbs: number,
    carbsUnit: string,
    fats: number,
    fatsUnit: string,
    calProtein?: number,
    calProteinUnit?: string,
    calCarbs?: number,
    calCarbsUnit?: string,
    calFats?: number
    calFatsUnit?: string
}) => {
    return (
        <html lang='en'>
            <Head title="Nutrimax" />
            <body class="min-h-screen text-white bg-fixed bg-[url('https://unsplash.com/photos/42RRIGJMOdw/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTQyfHxjdWN1bWJlcnxlbnwwfHx8fDE3MTkwNDM5OTl8MA&w=640')]">
                <MobNav />
                <div class="flex flex-col justify-center p-8 pb-0">
                    <p class="text-2xl">{foodName}</p>
                    <p class="font-thin">{brandName !== "Generic" ? `by ${brandName}` : brandName}</p>
                </div>
                {/* Calorie Overview */}
                <div class="flex flex-row gap-4 p-8">
                    <div class="flex flex-col justify-center items-center -rotate-90">
                        <p class="font-thin">Serving Size</p>
                        <p class="text-4xl">{servingSize}{servingSizeUnit}</p>
                    </div>
                    <div class="flex flex-col justify-center">
                        <p class="font-thin">Total Energy Per 100g</p>
                        <p class="text-7xl">{energy}</p>
                        <p class="text-2xl font-thin uppercase">{energyUnit}</p>
                    </div>
                </div>
                {/* Macro Nutrients */}
                <div class="grid grid-cols-3 gap-4 mt-4">
                    <div class="flex flex-col justify-center items-center">
                        <p class="font-bold">Proteins</p>
                        <p class="font-thin">{proteins}{proteinsUnit}</p>
                    </div>
                    <div class="flex flex-col justify-center items-center">
                        <p class="font-bold">Carbs</p>
                        <p class="font-thin">{carbs}{carbsUnit}</p>
                    </div>
                    <div class="flex flex-col justify-center items-center">
                        <p class="font-bold">Fats</p>
                        <p class="font-thin">{fats}{fatsUnit}</p>
                    </div>
                </div>
                {/* Track Buttons */}
                <div class="flex flex-col gap-4 mt-8 bg-[#000000bf] p-8 mx-4 rounded-2xl">
                    <p class="text-white font-bold uppercase">Track Your Intake</p>
                    <div class="flex flex-row gap-2 items-center">
                        <input
                            type="number"
                            class="border border-gray-400 rounded-full p-2 px-4 text-black"
                            placeholder="Weight in grams"
                            name="foodWeight"
                            hx-get={`/calNutrients?proteins=${(proteins).toFixed(2)}&carbs=${(carbs).toFixed(2)}&fats=${(fats).toFixed(2)}&proteinUnit=${proteinsUnit}&carbsUnit=${carbsUnit}&fatsUnit=${fatsUnit}`}
                            hx-target="#calNutrients"
                            hx-trigger="keyup"
                            hx-swap="innerHTML"
                        />
                        <p class="text-[#F3FF47] text-4xl"><i class="fa-solid fa-circle-plus" /></p>
                    </div>
                    <div class="text-white grid grid-cols-4" id="calNutrients">
                        <div class="flex flex-col justify-center items-center text-2xl">
                            <i class="fa-solid fa-calculator" />
                        </div>
                        <div class="flex flex-col">
                            <p class="text-sm">Proteins</p>
                            <p class="font-thin text-xs">{calProtein}{calProteinUnit}</p>
                        </div>
                        <div class="flex flex-col">
                            <p class="text-sm">Carbs</p>
                            <p class="font-thin text-xs">{calCarbs}{calCarbsUnit}</p>
                        </div>
                        <div class="flex flex-col">
                            <p class="text-sm">Fats</p>
                            <p class="font-thin text-xs">{calFats}{calFatsUnit}</p>
                        </div>
                    </div>
                </div>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js" />
            </body>
        </html>
    )
}
