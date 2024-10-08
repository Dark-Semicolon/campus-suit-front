import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "yellow-color": { primary: "#FFAA00", light: "#FFFAEC" },
                "gray-color": {
                    primary: "#7A869A",
                    light: "#C1C7D0",
                    lighter: "#F9FAFC",
                },
                "red-color": { primary: "#FF0000", light: "#FFF1F1" },
                "background-color": "#F9FAFC",
                "blue-color": { primary: "#172B4D", light: "#4E74F9", dark: "rgb(22 34 85)" },
                "mint-green-color": { primary: "#14ABBD", light: "#ECF8FA" },
                "black-color": "#1F1F20",
                "white-color": "#ffffff",
                "green-color": "#00A24A",
                active: { navLink: "white" },
            },
            height: { screen: "100dvh" },
            backgroundImage: {
                login: "url('/images/login.svg')",
                forgotPassword: "url('/images/ForgotPassword.svg')",
                cheekEmail: "url('/images/cheekEmail.svg')",
                signUp: "url('/images/Signup.png')",
                hero: "url('/images/courses/heroBgw.svg')",
            },
        },
        fontFamily: {
            sans: "Open Sans",
        },
    },
    darkMode: "class",
    plugins: [nextui()],
};
