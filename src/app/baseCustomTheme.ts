import type { ThemeProps } from "flowbite-react";

export const customTheme: ThemeProps = {
  theme: {
    button: {
      base: "transition transition-all active:scale-95",
      color: {
        primary:
          "bg-primary text-primary-foreground border border-transparent enabled:hover:bg-primary-dark",
        magenta:
          "bg-magenta text-magenta-foreground border border-transparent enabled:hover:bg-magenta-dark",
        ghost: "bg-transparent text-foreground enabled:hover:bg-foreground/10",
        outline:
          "bg-transparent text-foreground border border-input hover:bg-accent",
      },
      size: {
        fit: "p-0",
      },
    },
  },
};
