import { ReactNode } from "react";
import MainNavigation from "@/components/navbar";
import { navRoutes } from "./constants";

const Dashboardlayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <MainNavigation navRoutes={navRoutes} className="hidden py-5 md:flex bg-label/[0.02]" />
      {children}
    </div>
  );
};

export default Dashboardlayout;
