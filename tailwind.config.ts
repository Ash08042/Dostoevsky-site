import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#121211",
        paper: "#e8e5de",
        ash: "#a7a49d",
        line: "#3a3a37",
      },
      fontFamily: {
        display: [
          "Iowan Old Style",
          "Baskerville",
          "Songti SC",
          "STSong",
          "Noto Serif SC",
          "Georgia",
          "serif",
        ],
        body: [
          "Noto Serif SC",
          "Source Han Serif SC",
          "Songti SC",
          "STSong",
          "SimSun",
          "Georgia",
          "serif",
        ],
        sans: [
          "Avenir Next",
          "Helvetica Neue",
          "PingFang SC",
          "Hiragino Sans GB",
          "Microsoft YaHei",
          "Arial",
          "sans-serif",
        ],
        archive: [
          "Avenir Next",
          "Helvetica Neue",
          "PingFang SC",
          "Hiragino Sans GB",
          "Microsoft YaHei",
          "Arial",
          "sans-serif",
        ],
        jinghua: ["Jinghua Laosong", "京華老宋体", "京华老宋体", "Songti SC", "SimSun", "serif"],
      },
      letterSpacing: { museum: "0.18em" },
    },
  },
  plugins: [],
};

export default config;
