import MainNavigation from "@/components/navbar";
import { navRoutes } from "../../dashboard/constants";
import { Header } from "./header";

export default function DetailLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-6 mb-6">
      <MainNavigation navRoutes={navRoutes} className="hidden py-5 md:flex bg-label/[0.02]" />
      <Header />
      {children}
    </div>
  );
}
