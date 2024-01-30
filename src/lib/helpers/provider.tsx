"use client";

import { customTheme } from "@/app/baseCustomTheme";
import { Flowbite } from "flowbite-react";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
      <Flowbite theme={customTheme}>{children}</Flowbite>
    </SessionProvider>
  );
};

export default Providers;
