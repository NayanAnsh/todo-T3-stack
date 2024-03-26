import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        backgroundcustom: {
          "50": "#4A5262",
          "100": "#404853",
          "200": "#363F44",
          "300": "#2C3636",
          "400": "#222D27",
          "500": "#242933", // Original color
          "600": "#20252E",
          "700": "#1C2129",
          "800": "#181D24",
          "900": "#14191F",
        },
        secodarybackground: {
          "50": "#555D6E",
          "100": "#4B5364",
          "200": "#41495A",
          "300": "#373F50",
          "400": "#2D3546",
          "500": "#2E3440", // Original color
          "600": "#282E3A",
          "700": "#222834",
          "800": "#1C222E",
          "900": "#161C28",
        },
        textmain: {
          "50": "#E3E7EB",
          "100": "#CED4D9",
          "200": "#B9C1C9",
          "300": "#A5ADB4",
          "400": "#909AA0",
          "500": "#D8DEE", // Original color
          "600": "#C3C9D4",
          "700": "#AEB5C0",
          "800": "#9AA2AC",
          "900": "#858F98",
        },
        testhighLight: {
          "50": "#A5AEB8",
          "100": "#9BA6B0",
          "200": "#919DA7",
          "300": "#87959F",
          "400": "#7D8D97",
          "500": "#929AAA", // Original color
          "600": "#85819F",
          "700": "#797994",
          "800": "#6F718C",
          "900": "#656983",
        },
        buttonColour: {
          "50": "#AEDCF2",
          "100": "#9BD0E8",
          "200": "#88C4DE",
          "300": "#75B8D4",
          "400": "#62ACC9",
          "500": "#88C0D0", // Original color
          "600": "#6EADB9",
          "700": "#5B9CA9",
          "800": "#488B99",
          "900": "#357A89",
        },

        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
