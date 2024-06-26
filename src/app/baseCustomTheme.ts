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
          "bg-magenta text-magenta-foreground border border-transparent enabled:hover:bg-magenta-dark",
        ghost: "bg-transparent text-foreground enabled:hover:bg-foreground/10",
        ghost2: "bg-transparent text-foreground",
        link: "bg-transparent text-primary enabled:hover:underline",
        input:
          "block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 h-10 p-1 text-sm rounded-lg",
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
        xl: "text-sm !min-w-[150px] !px-4 !py-3 lg:text-base lg:!min-w-[200px] lg:!px-6 lg:!py-3 ",
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
            pills: {
              base: "px-2.5 py-0.5 text-xs rounded-md font-medium",
              active: {
                on: "rounded-lg bg-tertiary text-tertiary-foreground",
                off: "rounded-lg opacity-70 bg-green-200 text-green-800 hover:opacity-80",
              },
            },
          },
        },
      },
    },
    checkbox: {
      root: {
        base: "h-4 w-4 rounded focus:ring-offset-0 focus:ring-1 appearance-none bg-muted border-none rounded  bg-white ring-1 ring-border checked:bg-primary checked:ring-primary disabled:opacity-70",
        color: {},
      },
    },
    radio: {
      root: {
        base: "h-4 w-4 border border-border focus:ring-0 dark:border-gray-600 dark:bg-gray-700 dark:focus:bg-cyan-600 text-cyan-600",
      },
    },
    textInput: {
      field: {
        input: {
          base: "block w-full border disabled:cursor-not-allowed disabled:opacity-50 outline-primary",
        },
      },
    },
  },
};
