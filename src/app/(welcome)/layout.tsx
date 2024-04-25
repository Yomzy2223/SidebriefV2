import { AuthLayout } from "@/components/layouts/authLayout";
import React, { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  return <AuthLayout>{children}</AuthLayout>;
};

export default Layout;
