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
            keyframes: {
                notificationSlideDown: {
                    '0%': { transform: 'translate(-50%, -100%)' },
                    '100%': { transform: 'translate(-50%, 0)' },
                },
                borderTimer: {
                    '0%': { width: '100%' },
                    '100%': { width: '0%' },
                },
            },
            animation: {
                'notification-slide-down': 'notificationSlideDown 0.5s ease-in-out',
                'border-timer': 'borderTimer 5s linear',
            },
        },
    },
    plugins: [],
};
