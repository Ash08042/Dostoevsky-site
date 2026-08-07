import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#121211",
        paper: "#e8e5de",
        ash: "#a7a49d",
        line: "#3a3a37",
      },
      fontFamily: {
        display: ["Baskerville", "Iowan Old Style", "Georgia", "serif"],
        body: ["Noto Serif SC", "Songti SC", "SimSun", "Georgia", "serif"],
      },
      letterSpacing: { museum: "0.18em" },
    },
  },
  plugins: [],
};

export default config;
