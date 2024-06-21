export const Card = ({ title, href, body, key }: { title: string, href: string, body: string, key: string }) => (
    <a href={href} class="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 w-full max-w-xl">
        <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
        <p class="font-normal text-gray-700 dark:text-gray-400">{body}</p>
    </a>

)
