import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        geistMono: ['Geist Mono', 'monospace'],
      },
      colors: {
        'custom-purple-text': 'rgba(72, 0, 130, 1)',
        'source-text-color': 'rgba(152, 162, 179, 1)',
        'source-title-color': 'rgba(242, 244, 247, 1)',
        'custom-purple': 'rgba(27, 27, 48, 1)'
      },
      backgroundImage: {
        'purple-gradient': 'linear-gradient(90deg, #A93CFF 0%, #7A3CFF 100%)',
      },
      boxShadow: {
        'custom-inset': 'inset 0px 2.2px 13.2px 0px rgba(255, 255, 255, 0.08)',
      },
      borderColor: {
        'custom-purple-border': 'rgba(72, 0, 130, 1)',
      },
      
    },
  },
  plugins: [],
};
export default config;
