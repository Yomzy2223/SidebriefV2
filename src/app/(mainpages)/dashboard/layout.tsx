import { ReactNode } from "react";
import MainNavigation from "@/components/navbar";

const Dashboardlayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <MainNavigation navRoutes={navRoutes} className="hidden py-5 md:flex bg-label/[0.02]" />
      {children}
    </div>
  );
};

export default Dashboardlayout;

// Dashboard navigation routes
const navRoutes = [
  {
    name: "Home",
    to: "/dashboard",
  },
  {
    name: "Bank Accounts",
    to: "/dashboard/bank-accounts",
  },
  {
    name: "Rewards",
    to: "/dashboard/rewards",
  },
  {
    name: "Resources",
    to: "/dashboard/resources",
  },
  {
    name: "Settings",
    to: "/dashboard/settings",
  },
];
