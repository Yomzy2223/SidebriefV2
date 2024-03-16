import { ReactNode } from "react";
import { Header } from "@/components/headers/mainHeader";

const Dashboardlayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Header />
      <div className="max-w-full overflow-auto">{children}</div>
    </div>
  );
};

export default Dashboardlayout;
