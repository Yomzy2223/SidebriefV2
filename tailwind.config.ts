import type { Config } from "tailwindcss";
const colors = require('tailwindcss/colors')

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
					grey: "hsl(var(--foreground-grey))",
					"light-grey": "hsl(var(--foreground-light-grey))",
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
					light: "hsla(var(--magenta-light))",
				},
				yellow: {
					DEFAULT: "hsl(var(--yellow))",
					dark: "hsl(var(--sb-yellow-dark))",

				},
				
				border: {
					DEFAULT: "hsl(var(--border))",
				},
				"sb-blue": {
					light: "hsl(var(--sb-blue-light))",
				},

				// sb: {
				// 	cyan: "hsl(var(--sb-cyan)",
				// 	yellow:  "hsl(var(--sb-cyan)",
				// 	yellowdark:  "hsl(var(--sb-yellow-dark)",
				// },
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
