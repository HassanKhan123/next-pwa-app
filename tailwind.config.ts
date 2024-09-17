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
        'custom-purple': '#1B1B30', 
      },
      backgroundImage: {
        'purple-gradient': 'linear-gradient(90deg, #A93CFF 0%, #7A3CFF 100%)',
      },
      boxShadow: {
        'custom-inset': 'inset 0px 2.2px 13.2px 0px rgba(255, 255, 255, 0.08)',
      },
    },
  },
  plugins: [],
};
export default config;
