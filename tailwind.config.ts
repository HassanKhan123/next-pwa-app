import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-purple': '#140926', 
      },
      backgroundImage: {
        'purple-gradient': 'linear-gradient(90deg, #A93CFF 0%, #7A3CFF 100%)',
      },
    },
  },
  plugins: [],
};
export default config;
