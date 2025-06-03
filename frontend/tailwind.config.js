import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    heroui({
      layout: {
        dividerWeight: "1px", 
        disabledOpacity: 0.45, 
        fontSize: {
          tiny: "0.75rem",   // 12px
          small: "0.875rem", // 14px
          medium: "0.9375rem", // 15px
          large: "1.125rem", // 18px
        },
        lineHeight: {
          tiny: "1rem", 
          small: "1.25rem", 
          medium: "1.5rem", 
          large: "1.75rem", 
        },
        radius: {
          small: "6px", 
          medium: "8px", 
          large: "12px", 
        },
        borderWidth: {
          small: "1px", 
          medium: "1px", 
          large: "2px", 
        },
      },
      themes: {
        light: {
          colors: {
            "background": {
              "DEFAULT": "#FFFFFF"
            },
            "content1": {
              "DEFAULT": "#FFFFFF",
              "foreground": "#11181C"
            },
            "content2": {
              "DEFAULT": "#f4f4f5",
              "foreground": "#27272a"
            },
            "content3": {
              "DEFAULT": "#e4e4e7",
              "foreground": "#3f3f46"
            },
            "content4": {
              "DEFAULT": "#d4d4d8",
              "foreground": "#52525b"
            },
            "divider": {
              "DEFAULT": "rgba(17, 17, 17, 0.15)"
            },
            "focus": {
              "DEFAULT": "#3b82f6"
            },
            "foreground": {
              "50": "#fafaf9",
              "100": "#f5f5f4",
              "200": "#e7e5e4",
              "300": "#d4d4d8",
              "400": "#a1a1aa",
              "500": "#71717a",
              "600": "#52525b",
              "700": "#3f3f46",
              "800": "#292524",
              "900": "#1c1917",
              "DEFAULT": "#11181C"
            },
            "overlay": {
              "DEFAULT": "#000000"
            },
            "danger": {
              "50": "#fee7ef",
              "100": "#fdd0df",
              "200": "#faa0bf",
              "300": "#f871a0",
              "400": "#f54180",
              "500": "#ef4444",
              "600": "#c20e4d",
              "700": "#920b3a",
              "800": "#610726",
              "900": "#310413",
              "DEFAULT": "#ef4444",
              "foreground": "#ffffff"
            },
            "default": {
              "50": "#fafafa",
              "100": "#f5f5f4",
              "200": "#e7e5e4",
              "300": "#d4d4d8",
              "400": "#a1a1aa",
              "500": "#71717a",
              "600": "#52525b",
              "700": "#3f3f46",
              "800": "#292524",
              "900": "#1c1917",
              "DEFAULT": "#d4d4d8",
              "foreground": "#000"
            },
            "primary": {
              "50": "#f0f9ff",
              "100": "#e0f2fe",
              "200": "#bae6fd",
              "300": "#7dd3fc",
              "400": "#38bdf8",
              "500": "#3b82f6",
              "600": "#2563eb",
              "700": "#1d4ed8",
              "800": "#1e40af",
              "900": "#1e3a8a",
              "DEFAULT": "#3b82f6",
              "foreground": "#fff"
            },
            "secondary": {
              "50": "#f5f3ff",
              "100": "#ede9fe",
              "200": "#ddd6fe",
              "300": "#c4b5fd",
              "400": "#a78bfa",
              "500": "#8b5cf6",
              "600": "#7c3aed",
              "700": "#6d28d9",
              "800": "#5b21b6",
              "900": "#4c1d95",
              "DEFAULT": "#8b5cf6",
              "foreground": "#fff"
            },
            "success": {
              "50": "#ecfdf5",
              "100": "#d1fae5",
              "200": "#a7f3d0",
              "300": "#6ee7b7",
              "400": "#34d399",
              "500": "#10b981",
              "600": "#059669",
              "700": "#047857",
              "800": "#065f46",
              "900": "#064e3b",
              "DEFAULT": "#10b981",
              "foreground": "#000"
            },
            "warning": {
              "50": "#fffbeb",
              "100": "#fef3c7",
              "200": "#fde68a",
              "300": "#fcd34d",
              "400": "#fbbf24",
              "500": "#f59e0b",
              "600": "#d97706",
              "700": "#b45309",
              "800": "#92400e",
              "900": "#78350f",
              "DEFAULT": "#f59e0b",
              "foreground": "#000"
            }
          }
        },
        dark: {
          colors: {
            "background": {
              "DEFAULT": "#000000"
            },
            "content1": {
              "DEFAULT": "#18181b",
              "foreground": "#fafafa"
            },
            "content2": {
              "DEFAULT": "#27272a",
              "foreground": "#f4f4f5"
            },
            "content3": {
              "DEFAULT": "#3f3f46",
              "foreground": "#e4e4e7"
            },
            "content4": {
              "DEFAULT": "#52525b",
              "foreground": "#d4d4d8"
            },
            "divider": {
              "DEFAULT": "rgba(255, 255, 255, 0.15)"
            },
            "focus": {
              "DEFAULT": "#3b82f6"
            },
            "foreground": {
              "50": "#18181b",
              "100": "#27272a",
              "200": "#3f3f46",
              "300": "#52525b",
              "400": "#71717a",
              "500": "#a1a1aa",
              "600": "#d4d4d8",
              "700": "#e4e4e7",
              "800": "#f4f4f5",
              "900": "#fafafa",
              "DEFAULT": "#ECEDEE"
            },
            "overlay": {
              "DEFAULT": "#000000"
            },
            "danger": {
              "50": "#310413",
              "100": "#610726",
              "200": "#920b3a",
              "300": "#c20e4d",
              "400": "#f31260",
              "500": "#ef4444",
              "600": "#f871a0",
              "700": "#faa0bf",
              "800": "#fdd0df",
              "900": "#fee7ef",
              "DEFAULT": "#ef4444",
              "foreground": "#ffffff"
            },
            "default": {
              "50": "#18181b",
              "100": "#27272a",
              "200": "#3f3f46",
              "300": "#52525b",
              "400": "#71717a",
              "500": "#a1a1aa",
              "600": "#d4d4d8",
              "700": "#e4e4e7",
              "800": "#f4f4f5",
              "900": "#fafafa",
              "DEFAULT": "#3f3f46",
              "foreground": "#fff"
            },
            "primary": {
              "50": "#1e3a8a",
              "100": "#1e40af",
              "200": "#1d4ed8",
              "300": "#2563eb",
              "400": "#3b82f6",
              "500": "#60a5fa",
              "600": "#93c5fd",
              "700": "#bfdbfe",
              "800": "#dbeafe",
              "900": "#eff6ff",
              "DEFAULT": "#3b82f6",
              "foreground": "#fff"
            },
            "secondary": {
              "50": "#4c1d95",
              "100": "#5b21b6",
              "200": "#6d28d9",
              "300": "#7c3aed",
              "400": "#8b5cf6",
              "500": "#a78bfa",
              "600": "#c4b5fd",
              "700": "#ddd6fe",
              "800": "#ede9fe",
              "900": "#f5f3ff",
              "DEFAULT": "#8b5cf6",
              "foreground": "#fff"
            },
            "success": {
              "50": "#064e3b",
              "100": "#065f46",
              "200": "#047857",
              "300": "#059669",
              "400": "#10b981",
              "500": "#34d399",
              "600": "#6ee7b7",
              "700": "#a7f3d0",
              "800": "#d1fae5",
              "900": "#ecfdf5",
              "DEFAULT": "#10b981",
              "foreground": "#000"
            },
            "warning": {
              "50": "#78350f",
              "100": "#92400e",
              "200": "#b45309",
              "300": "#d97706",
              "400": "#f59e0b",
              "500": "#fbbf24",
              "600": "#fcd34d",
              "700": "#fde68a",
              "800": "#fef3c7",
              "900": "#fffbeb",
              "DEFAULT": "#f59e0b",
              "foreground": "#000"
            }
          }
        }
      }
    })
  ]
}
