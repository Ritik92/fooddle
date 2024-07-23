import { nextui } from "@nextui-org/react";

const config = {
  content: [
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        urbanist: ['Urbanist', 'sans-serif'],
      },
      colors: {
        primary: { 
          50: '#fafcff', 
          100: '#eaf3ff', 
          200: '#d0e4ff', 
          300: '#abcfff', 
          400: '#7cb4ff', 
          500: '#4294ff', 
          600: '#006dfc', 
          700: '#004bad', 
          800: '#002e69', 
          900: '#001c41', 
          950: '#001633', 
        },
        secondary: { 
          50: '#fdfffd', 
          100: '#f6fdf6', 
          200: '#eafbea', 
          300: '#daf8da', 
          400: '#c6f3c5', 
          500: '#aceeab', 
          600: '#8ee88d', 
          700: '#6ce26a', 
          800: '#1f931d', 
          900: '#0e450e', 
          950: '#092b08', 
        },
        error: { 
          50: '#fffcfc', 
          100: '#fef4f4', 
          200: '#fde6e6', 
          300: '#fbd2d2', 
          400: '#f9b9b9', 
          500: '#f69b9b', 
          600: '#f37676', 
          700: '#ef4d4d', 
          800: '#9b0e0e', 
          900: '#4a0606', 
          950: '#2f0404', 
        },
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};

export default config;