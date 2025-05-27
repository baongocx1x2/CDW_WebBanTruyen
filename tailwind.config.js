/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./src/**/*.{html,js,jsx,ts,tsx,css}",
        "./public/index.html",
    ],
    safelist: [
        'bg-gray-50',
    ],
    darkMode: 'media',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
        },
    },
    plugins: [],
}