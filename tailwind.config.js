/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                background: 'var(--background-color)',
                highlight: 'var(--highlight-color)',
                text: 'var(--text-color)',
                ascent: 'var(--ascent-color)',
            },
        },
    },
    plugins: [],
};
