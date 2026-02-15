/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#D32F2F', // Darker richer red
                secondary: '#FBC02D', // Gold/Yellow for accents
                dark: '#212121',
                light: '#FAFAFA',
                accent: '#FF5722', // Burnt orange
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                serif: ['Playfair Display', 'serif'],
            }
        },
    },
    plugins: [],
}
