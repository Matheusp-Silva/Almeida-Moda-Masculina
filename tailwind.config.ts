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
        'almeida-preto': '#000000',
        'almeida-vermelho': '#ED1C24', // Um vermelho vivo
        'almeida-branco': '#FFFFFF',
      },
    },
  },
  plugins: [],
};
export default config;