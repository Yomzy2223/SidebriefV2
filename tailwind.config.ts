import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./node_modules/flowbite/**/*.js",
		"./node_modules/flowbite-react/**/*.js",
	],
	theme: {
		extend: {
			colors: {
				background: {
					DEFAULT: "hsl(var(--background))",
				},
				foreground: {
					DEFAULT: "hsl(var(--foreground))",
					light: "hsl(var(--foreground-light))",
				},
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
					dark: "hsl(var(--primary-dark))",
				},
				magenta: {
					DEFAULT: "hsl(var(--magenta))",
					foreground: "hsl(var(--magenta-foreground))",
					dark: "hsl(var(--magenta-dark))",
				},
			},
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
		},
	},
	plugins: [require("flowbite/plugin")],
};
export default config;
