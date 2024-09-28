interface GreetingsCardProps {
    name: string;
}

export const GreetingsCard = ({ name }: GreetingsCardProps) => {
    return (
        <div class="grid grid-cols-2 mt-8">
            <img src="https://unsplash.com/photos/kcA-c3f_3FE/download?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzE5MDM0NjE2fA&force=true&w=640" alt="food" class="w-32 h-32 object-fit mx-auto rounded-2xl" />
            <div class="flex flex-col justify-center">
                <p class="text-gray-400">Good Morning</p>
                <h1 class="text-4xl">{name}</h1>
                <p class="font-thin"><i class="fa-solid fa-bolt" /> Fitness Basics</p>
            </div>
        </div>
    )
}
