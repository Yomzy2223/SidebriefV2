"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { isValidUUID } from "@/lib/utils";
import RequestLayout from "@/app/layouts/requestLayout";

export default function LaunchLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  let path = pathname.split("/")[pathname.split("/").length - 1];

  if (isValidUUID(path)) {
    path = pathname.split("/")[pathname.split("/").length - 2];
  }

  let progress: number;

  switch (path) {
    case "info":
      progress = 2;
      break;
    case "payment":
      progress = 3;
      break;
    case "kyc":
      progress = 4;
      break;
    case "review":
      progress = 5;
      break;
    default:
      progress = 1;
      break;
  }

  return (
    <RequestLayout path={path} progress={progress}>
      {children}
    </RequestLayout>
  );
}
