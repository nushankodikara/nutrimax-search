export const HomeSector = () => {
    return (
        <>
            {/* Caloric Intake */}
            <div class="flex flex-col justify-center items-center mt-16">
                <div class="flex flex-row justify-center items-center gap-4">
                    <i class="fa-solid fa-chevron-left" />
                    <p>2024-01-01</p>
                    <i class="fa-solid fa-chevron-right" />
                </div>
                <p class="font-thin">Total Energy Intake</p>
                <p class="text-7xl">2300</p>
                <p class="text-2xl font-thin">KCAL</p>
            </div>
            {/* Macro Nutrients */}
            <div class="grid grid-cols-3 gap-4 mt-8">
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
            <div class="flex flex-row gap-2 justify-center items-center mt-12">
                <p class="b-2 border border-black rounded-full p-2 px-4"><i class="fa-solid fa-circle-plus" /> Track Food</p>
                <a
                    hx-post="/searchSector"
                    hx-trigger="click"
                    hx-swap="innerHTML"
                    hx-target="#dynamicSector"
                    href="/search"
                    class="b-2 border border-black rounded-full p-2 px-3 bg-black text-white"
                >
                    <i class="fa-solid fa-magnifying-glass" />
                </a>
            </div>
        </>
    )
}
