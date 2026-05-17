import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#111111",
        charcoal: "#2D2B28",
        paper: "#F8F6F1",
        bone: "#EFEAE1",
        line: "#DDD7CC",
        muted: "#78716B",
        orange: {
          700: "#A9541F",
          600: "#B86128",
          500: "#C56A2D",
        },
      },
      fontFamily: {
        sans: ["Inter", "IBM Plex Sans", "system-ui", "sans-serif"],
        mono: ["IBM Plex Mono", "Space Mono", "monospace"],
      },
      boxShadow: {
        studio: "0 18px 60px rgba(17, 17, 17, 0.08)",
        card: "0 16px 36px rgba(17, 17, 17, 0.07)",
      },
    },
  },
  plugins: [],
} satisfies Config;
