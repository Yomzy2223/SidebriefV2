import type { ThemeProps } from "flowbite-react";

export const customTheme: ThemeProps = {
	theme: {
		badge: {
			root: {
				color: {
					magenta:
						"bg-magenta/10 text-magenta dark:bg-magenta/20 dark:text-magenta group-hover:bg-magenta/20 dark:group-hover:bg-magenta/30",
				},
			},
		},
		button: {
			base: "transition transition-all active:scale-95",
			color: {
				primary:
					"bg-primary text-primary-foreground border border-transparent enabled:hover:bg-primary-dark",
				magenta:
					"bg-magenta text-magenta-foreground border border-transparent enabled:hover:bg-magenta-dark",
				ghost: "bg-transparent text-foreground enabled:hover:bg-foreground/10",
			},
			outline: {
				on: "flex justify-center bg-transparent text-inherit transition-all duration-75 ease-in group-enabled:group-hover:bg-opacity-0 group-enabled:group-hover:text-inherit dark:bg-gray-900 dark:text-white w-full",
				color: {
					white: "border border-white enabled:hover:bg-foreground/10",
					primary:
						"border border-primary bg-transparent enabled:hover:bg-primary-dark",
					magenta:
						"border border-magenta bg-transparent enabled:hover:bg-magenta-dark",
				},
			},
			size: {
				fit: "p-0",
				icon: "p-1",
			},
		},
	},
};
