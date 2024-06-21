
export const ItemPage = () => {
    return (
        <html lang='en'>
            <head>
                <title>Search Page</title>

                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <script src="https://cdn.tailwindcss.com" />
                <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.css" rel="stylesheet" />

                <script src="https://unpkg.com/htmx.org@2.0.0" integrity="sha384-wS5l5IKJBvK6sPTKa2WZ1js3d947pvWXbPJ1OmWfEuxLgeHcEbjUUA5i9V5ZkpCw" crossorigin="anonymous" />
            </head>
            <body>
                <Navbar />
                <div className="flex flex-col items-center p-4">
                    <h1 className="text-2xl my-4">Search Page</h1>
                    <input
                        type="text"
                        placeholder="Search"
                        className="border border-gray-300 rounded-lg w-full max-w-xl p-2 px-4"
                        name="query"
                        hx-post="/search"
                        hx-target="#searchCards"
                        hx-swap="innerHTML"
                        hx-trigger="keyup delay:500ms changed"
                    />
                    <div id='searchCards' className="flex flex-col w-full py-8 justify-center gap-4 items-center">
                        <Card title="" href="#" body="Search for Food Items" />
                    </div>
                </div>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js" />
            </body>
        </html>
    )
}
