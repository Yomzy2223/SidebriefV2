"use client";

import { ReactNode } from "react";
import RequestLayout from "@/app/layouts/requestLayout";

export default function LaunchLayout({ children }: { children: ReactNode }) {
  return <RequestLayout>{children}</RequestLayout>;
}
