import type { ThemeProps } from "flowbite-react";

export const customTheme: ThemeProps = {
  theme: {
    badge: {
      root: {
        base: "flex h-fit items-center gap-1 font-semibold !py-0.5 !px-2.5 !rounded-md",
        color: {
          magenta:
            "bg-magenta/10 text-magenta dark:bg-magenta/20 dark:text-magenta group-hover:bg-magenta/20 dark:group-hover:bg-magenta/30",
          pink: "bg-[#d400cc14] text-[#D400CC]",
        },
      },
    },
    button: {
      base: "w-max max-w-full focus:!ring-0 hover:opacity-80 active:opacity-90 transition transition-all text-sm",
      color: {
        primary:
          "bg-primary text-primary-foreground border border-transparent enabled:hover:bg-primary-dark",
        secondary:
          "bg-secondary text-secondary-foreground border border-transparent enabled:hover:bg-magenta-dark",
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
    tabs: {
      tablist: {
        base: "flex gap-2",
        tabitem: {
          base: "flex items-center justify-center p-2 rounded-t-lg text-sm font-medium transition transition-all first:ml-0 disabled:cursor-not-allowed disabled:text-gray-400 disabled:dark:text-gray-500 ",
          styles: {
            default: {
              base: "rounded-t-lg",
              active: {
                on: "bg-gray-100 text-primary dark:bg-gray-800 dark:text-primary",
                off: "text-gray-500 hover:bg-gray-50 hover:text-gray-600 dark:text-gray-400 dark:hover:bg-gray-800  dark:hover:text-gray-300",
              },
            },
            underline: {
              base: "rounded-t-lg",
              active: {
                on: "text-primary rounded-t-lg border-b-2 border-primary active dark:text-primary dark:border-primary",
                off: "border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300",
              },
            },
          },
        },
      },
    },
  },
};
