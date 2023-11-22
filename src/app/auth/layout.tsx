import { AuthLayout } from "@/components/features/auth/authLayout";
import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return <AuthLayout>{children}</AuthLayout>;
};

export default Layout;
