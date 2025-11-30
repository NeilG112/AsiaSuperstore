/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#2E8B57',
                    light: '#8FD3A3',
                },
                secondary: {
                    cream: '#FFF8F0',
                    beige: '#E9DCC9',
                },
                dark: '#222222',
                accent: '#FFB64D',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                heading: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
            },
            lineHeight: {
                relaxed: '1.6',
            }
        },
    },
    plugins: [],
}
