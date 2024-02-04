import { fontFamily } from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";
import typography from "@tailwindcss/typography";

/* Inter Dynamic Metrics */
const interDynamicMetrics = plugin(({ matchUtilities, theme }) => {

    function calcLetterSpacing(s) {
        let a = -0.05;
        if(s >= 16) a += 0.01;
        if(s >= 32) a += 0.01;
        if(s >= 48) a += 0.02;
        const v = a + 1.75 * Math.pow(Math.E, -0.28 * s)
        return v.toFixed(6) + "em";
    }

    function text(value) {
        const x = typeof value === "object" ? value[0] : value;
        const s = parseFloat(x) * (x.includes("em") ? 16 : 1);
        const spacing = calcLetterSpacing(s);
        const height = Math.round(s * 1.4) + "px";
        if(s) return { fontSize: x, 'line-height': height, 'letter-spacing': spacing };
    }

    matchUtilities({ "text": text }, { values: theme("fontSize") });
});


/* Extra font sizes */
let extraFontSizes = {};
for (let i = 1; i <= 200; i++) extraFontSizes[`${i}px`] = `${i}px`;


/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./src/**/*.{html,js,svelte,ts}"],
    safelist: ["dark"],
    corePlugins: {
        fontSize: true,
    },
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px"
            }
        },
        extend: {
            colors: {
                border: "hsl(var(--border) / <alpha-value>)",
                input: "hsl(var(--input) / <alpha-value>)",
                ring: "hsl(var(--ring) / <alpha-value>)",
                background: "hsl(var(--background) / <alpha-value>)",
                foreground: "hsl(var(--foreground) / <alpha-value>)",
                primary: {
                    DEFAULT: "hsl(var(--primary) / <alpha-value>)",
                    foreground: "hsl(var(--primary-foreground) / <alpha-value>)"
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
                    foreground: "hsl(var(--secondary-foreground) / <alpha-value>)"
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
                    foreground: "hsl(var(--destructive-foreground) / <alpha-value>)"
                },
                muted: {
                    DEFAULT: "hsl(var(--muted) / <alpha-value>)",
                    foreground: "hsl(var(--muted-foreground) / <alpha-value>)"
                },
                accent: {
                    DEFAULT: "hsl(var(--accent) / <alpha-value>)",
                    foreground: "hsl(var(--accent-foreground) / <alpha-value>)"
                },
                popover: {
                    DEFAULT: "hsl(var(--popover) / <alpha-value>)",
                    foreground: "hsl(var(--popover-foreground) / <alpha-value>)"
                },
                card: {
                    DEFAULT: "hsl(var(--card) / <alpha-value>)",
                    foreground: "hsl(var(--card-foreground) / <alpha-value>)"
                }
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)"
            },
            fontFamily: {
                sans: [["InterVariable", "Inter", ...fontFamily.sans], {
                    fontFeatureSettings: `'liga', 'calt', 'ss01', 'ss04', 'tnum', 'cvxx'`
                }],
                mono: ["JetBrains Mono", ...fontFamily.mono]
            },
            fontSize: {
                ...extraFontSizes,
            }
        }
    },
    plugins: [
        typography,
        interDynamicMetrics
    ]
};
