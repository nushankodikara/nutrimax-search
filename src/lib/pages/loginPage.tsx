import { Head } from "../components/head";
import { LoginForm } from "../components/loginForm";

export const LoginPage = () => {
    return (
        <html lang='en'>
            <Head title="Nutrimax" />
            <body class="min-h-screen text-white bg-fixed bg-[url('https://unsplash.com/photos/42RRIGJMOdw/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTQyfHxjdWN1bWJlcnxlbnwwfHx8fDE3MTkwNDM5OTl8MA&w=640')] bg-cover flex flex-col justify-center items-center">
                <LoginForm success={null} errors={{ email: null, password: null }} />
                <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js" />
            </body>
        </html>
    )
}