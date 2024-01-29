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
      base: "transition transition-all focus:!ring-0 hover:opacity-80 active:opacity-90",
      color: {
        primary:
          "bg-primary text-primary-foreground border border-transparent enabled:hover:bg-primary-dark",
        secondary:
          "bg-magenta text-magenta-foreground border border-transparent enabled:hover:bg-magenta-dark",
        ghost: "bg-transparent text-foreground enabled:hover:bg-foreground/10",
        ghost2: "bg-transparent text-foreground",
        link: "bg-transparent text-primary enabled:hover:underline",
      },
      outline: {
        color: {
          default: "border border-input",
          white: "border border-white enabled:hover:bg-foreground/10",
          primary:
            "border border-primary bg-transparent enabled:hover:bg-primary-dark",
          magenta:
            "border border-magenta bg-transparent enabled:hover:bg-magenta-dark",
        },
        on: "flex justify-center bg-white text-foreground transition-all duration-75 ease-in group-enabled:group-hover:bg-opacity-0 group-enabled:group-hover:text-inherit dark:bg-gray-900 dark:text-white w-full",
      },
      size: {
        fit: "p-0",
        icon: "p-1",
      },
    },
  },
};
