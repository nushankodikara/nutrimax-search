import { Head } from "../components/head";
import { MobNav } from "../components/mobnav";

export const ItemPage = ({ foodName, brandName, servingSize, energy, proteins, carbs, fats, calProtein = 0, calCarbs = 0, calFats = 0 }: {
    foodName: string,
    brandName: string,
    servingSize: string,
    energy: number,
    proteins: number,
    carbs: number,
    fats: number,
    calProtein?: number,
    calCarbs?: number,
    calFats?: number
}) => {
    return (
        <html lang='en'>
            <Head title="Nutrimax" />
            <body class="min-h-screen text-white bg-fixed bg-[url('https://unsplash.com/photos/42RRIGJMOdw/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTQyfHxjdWN1bWJlcnxlbnwwfHx8fDE3MTkwNDM5OTl8MA&w=640')]">
                <MobNav />
                <div class="flex flex-col justify-center p-8 pb-0">
                    <p class="text-2xl">Avocado</p>
                    <p class="font-thin">by Keels</p>
                </div>
                {/* Calorie Overview */}
                <div class="flex flex-col justify-center p-8">
                    <p class="font-thin">Total Energy Per <b>100g</b> Serving</p>
                    <p class="text-7xl">2300</p>
                    <p class="text-2xl font-thin">KCAL</p>
                </div>
                {/* Macro Nutrients */}
                <div class="grid grid-cols-3 gap-4 mt-4">
                    <div class="flex flex-col justify-center items-center">
                        <p class="font-bold">Proteins</p>
                        <p class="font-thin">100g</p>
                    </div>
                    <div class="flex flex-col justify-center items-center">
                        <p class="font-bold">Carbs</p>
                        <p class="font-thin">200g</p>
                    </div>
                    <div class="flex flex-col justify-center items-center">
                        <p class="font-bold">Fats</p>
                        <p class="font-thin">20g</p>
                    </div>
                </div>
                {/* Track Buttons */}
                <div class="flex flex-col gap-4 mt-8 bg-[#000000bf] p-8 mx-4 rounded-2xl">
                    <p class="text-white font-bold uppercase">Track Your Intake</p>
                    <div class="flex flex-row gap-4">
                        <input type="number" class="border border-gray-400 rounded-full p-2 px-4" placeholder="Weight in grams" />
                        <p class=" rounded-full p-2 px-3 bg-[#F3FF47] text-white"><i class="fa-solid fa-magnifying-glass text-black" /></p>
                    </div>
                    <div class="text-white grid grid-cols-4">
                        <div class="flex flex-col justify-center items-center text-2xl">
                            <i class="fa-solid fa-calculator" />
                        </div>
                        <div class="flex flex-col">
                            <p class="text-sm">Proteins</p>
                            <p class="font-thin text-xs">100g</p>
                        </div>
                        <div class="flex flex-col">
                            <p class="text-sm">Carbs</p>
                            <p class="font-thin text-xs">200g</p>
                        </div>
                        <div class="flex flex-col">
                            <p class="text-sm">Fats</p>
                            <p class="font-thin text-xs">20g</p>
                        </div>
                    </div>
                </div>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js" />
            </body>
        </html>
    )
}
