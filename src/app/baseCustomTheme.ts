import type { ThemeProps } from "flowbite-react";

export const customTheme: ThemeProps = {
  theme: {
    button: {
      base: " w-max focus:!ring-0 hover:opacity-80 active:opacity-90 transition transition-all text-sm",
      color: {
        primary:
          "bg-primary text-primary-foreground border border-transparent enabled:hover:bg-primary-dark",
        secondary:
          "bg-magenta text-magenta-foreground border border-transparent enabled:hover:bg-magenta-dark",
        ghost: "bg-transparent text-foreground",
      },
      outline: {
        color: {
          default: "border border-input",
          white: "border border-white enabled:hover:bg-foreground/10",
          primary:
            "border border-primary !text-primary bg-transparent enabled:hover:bg-primary-dark",
          magenta: "border border-magenta bg-transparent enabled:hover:bg-magenta-dark",
        },
        on: "flex justify-center bg-white text-foreground transition-all duration-75 ease-in group-enabled:group-hover:bg-opacity-0 group-enabled:group-hover:text-inherit dark:bg-gray-900 dark:text-white w-full",
      },
      size: {
        fit: "p-0 h-max w-max !p-0",
      },
      inner: {
        base: "flex justify-center items-center gap-2 !px-4 !py-2",
      },
      spinnerSlot: "h-max",
      disabled: "cursor-not-allowed opacity-50 hover:opacity-50 active:opacity-50",
    },
    textInput: {
      field: {
        input: {
          base: "block w-full border disabled:cursor-not-allowed disabled:opacity-50 outline-primary",
        },
      },
    },
    textarea: {
      base: "block w-full rounded-lg border disabled:cursor-not-allowed disabled:opacity-50 text-sm outline-primary",
    },
    checkbox: {
      root: {
        base: "h-4 w-4 rounded focus:ring-0",
      },
    },
  },
};
