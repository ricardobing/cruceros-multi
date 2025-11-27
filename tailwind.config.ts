import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'ocean-blue': '#0077BE',
        'ocean-dark': '#004B7A',
        'ocean-light': '#4DA8DA',
        'sand': '#F4E4C1',
        'coral': '#FF6B6B',
      },
    },
  },
  plugins: [],
};
export default config;
