import { Header } from "@/components/headers/mainHeader";
import { ReactNode } from "react";

const Successlayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <div className="mx-4 md:mx-8">
        <Header />
      </div>
      {children}
    </div>
  );
};

export default Successlayout;
