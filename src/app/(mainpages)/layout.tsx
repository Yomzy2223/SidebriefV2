import { ReactNode } from "react";
import { Header } from "@/components/headers/mainHeader";

const Dashboardlayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default Dashboardlayout;
