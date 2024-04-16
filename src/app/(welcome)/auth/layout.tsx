import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await getServerSession();
  if (session) redirect("/");

  return <div>{children}</div>;
};

export default Layout;
