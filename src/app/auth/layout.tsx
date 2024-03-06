import { AuthLayout } from "@/components/features/auth/authLayout";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await getServerSession();
  if (session) redirect("/");

  return <AuthLayout>{children}</AuthLayout>;
};

export default Layout;
