import { GreetingsCard } from "../components/greetingsCard";
import { Head } from "../components/head";
import { MobNav } from "../components/mobNav";

export const HomePage = () => {
    return (
        <html lang='en'>
            <Head title="Nutrimax" />
            <body class="min-h-screen bg-gradient-to-t from-[#F3FF47] via-white to-white bg-fixed">
                <MobNav />
                <GreetingsCard />
                <div
                    id='dynamicSector'
                    hx-post="/homeSector"
                    hx-target="#dynamicSector"
                    hx-swap="innerHTML"
                    hx-trigger="load"
                />
                <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js" />
            </body>
        </html>
    )
}
