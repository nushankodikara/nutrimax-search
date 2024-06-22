export const Head = ({ title }: { title: string; }) => {
    return (
        <head>
            <title>{title}</title>

            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <script src="https://cdn.tailwindcss.com" />
            <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.css" rel="stylesheet" />

            <script src="https://unpkg.com/htmx.org@2.0.0" integrity="sha384-wS5l5IKJBvK6sPTKa2WZ1js3d947pvWXbPJ1OmWfEuxLgeHcEbjUUA5i9V5ZkpCw" crossorigin="anonymous" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" />
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');

                    * {
                        font-family: 'Outfit', sans-serif;
                        transition: all 0.25s ease-in-out;
                        scroll-behavior: smooth;
                    }
                `}
            </style>
        </head>
    )
}
