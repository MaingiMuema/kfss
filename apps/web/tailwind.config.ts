import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "void-black": "#050507",
        "factory-steel": "#2b2f35",
        "ember": "#f59e0b",
        "neon-blue": "#3bd6ff",
        "neon-purple": "#7c3aed",
        "neon-gold": "#f6c453",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 40px rgba(59, 214, 255, 0.25)",
        "glow-strong": "0 0 80px rgba(124, 58, 237, 0.45)",
      },
      backgroundImage: {
        "radial-soft":
          "radial-gradient(circle at top, rgba(59, 214, 255, 0.16), transparent 55%)",
        "radial-core":
          "radial-gradient(circle at center, rgba(124, 58, 237, 0.35), transparent 65%)",
        "factory-grid":
          "linear-gradient(transparent 0%, rgba(255,255,255,0.03) 2%, transparent 6%), linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 2%, transparent 6%)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.04)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
