/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#b91c1c', // Spicy Red
                secondary: '#fbbf24', // Amber/Gold
                accent: '#065f46', // Deep Emerald
                dark: '#111827', // Rich Black
                light: '#FAFAFA',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                serif: ['Playfair Display', 'serif'],
            }
        },
    },
    plugins: [],
}
