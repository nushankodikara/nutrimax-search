export const SearchSector = () => {
    return (
        <>
            <div class="flex flex-row gap-2 justify-center mt-8">
                <a
                    hx-post="/homeSector"
                    hx-trigger="click"
                    hx-swap="innerHTML"
                    hx-target="#dynamicSector"
                    href="/search"
                    class="b-2 border border-black rounded-lg p-2 px-3 bg-black text-white"
                >
                    <i class="fa-solid fa-arrow-left-long" />
                </a>
                <input
                    type="text"
                    placeholder="Search for recipes"
                    class="w-3/4 p-2 rounded-lg border-2 border-gray-300"
                    name="query"
                    hx-post="/search"
                    hx-trigger="keyup changed delay:500ms"
                    hx-target="#search-results"
                    hx-swap="innerHTML"
                />
            </div>
            <div class="grid grid-cols-2 gap-4 mt-4 p-4" id="search-results" />
        </>
    )
}
