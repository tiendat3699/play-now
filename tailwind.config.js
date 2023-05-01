/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            keyframes: {
                'pulse-scale': {
                    '0%, 100%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.1)' },
                },
            },
            animation: {
                'pulse-scale': 'pulse-scale 0.45s ease 0.1s',
            },
            container: {
                center: true,
                screens: {
                    sm: '640px',
                    md: '768px',
                    lg: '1024px',
                    xl: '1140px',
                },
            },
            backgroundImage: {
                'gradient-overlay': 'linear-gradient(270deg, rgba(11, 11, 11, 0) 0%, #0B0B0B 100%, #0B0B0B 100%)',
            },
            colors: {
                primary: '#121212',
                'secondary-1': '#2a2a2a',
                'secondary-2': '#202020',
                accent: '#0078f2',
            },
            fontSize: {
                '2xs': ['0.66rem', '1rem'],
                '3xs': ['0.55rem', '1rem'],
            },
            padding: {
                2.5: '0.65rem',
            },
            height: {
                13: '3.2rem',
            },
        },
    },
    plugins: [],
};
