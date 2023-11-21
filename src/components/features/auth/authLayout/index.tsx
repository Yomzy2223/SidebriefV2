import { ReactNode } from "react";
import { Testimonial } from "../testimonial";
import Image from "next/image";

interface authLayoutProps {
  children: ReactNode;
  login?: boolean;
}

export const AuthLayout = ({ children, login }: authLayoutProps) => {
  return (
    <div className="flex min-h-screen">
      <div className="w-3/5">{children}</div>
      <div className="bg-primary w-2/5">
        <div className="bg-authPattern w-full h-full">
          <div>
            <h1></h1>
          </div>
        </div>
      </div>
    </div>
  );
};
