import { ReactNode } from "react";
import { Navbar } from "@/components/navbar";
import { Message } from "@/components/features/messageBar";
import { Back } from "./back";

const Dashboardlayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <div className="hidden md:block">
        <Navbar />
        <Message />
      </div>
      <div className="mx-4 md:mx-8 mt-4 block md:hidden">
        <Back />
      </div>
      {children}
    </div>
  );
};

export default Dashboardlayout;
