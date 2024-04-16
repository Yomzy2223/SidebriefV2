import { ReactNode } from "react";

export interface IProps {
  navRoutes: {
    name: string;
    to: string;
    type?: string;
    options?: { name: string; to: string; icon?: any }[];
    defaultValue?: string;
  }[];
  className?: string;
  inactiveClassName?: string;
  others?: ReactNode;
}
