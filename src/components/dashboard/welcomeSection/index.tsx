import React from "react";
import { ArrowRightCircle } from "lucide-react";
import { Oval } from "react-loading-icons";
import { Button } from "flowbite-react";
import { useSession } from "next-auth/react";
import { useGetServices } from "@/services/service";
import { Skeleton, SVGSkeleton } from "@/components/ui/skeleton";
import Link from "next/link";

const WelcomeSection = () => {
  const session = useSession();
  const getServices = useGetServices();
  const services = getServices.data?.data.data;

  const firstName = session.data?.user.fullName.split(" ")[0];

  const priority1 = services?.find((el) => el.priority === 1);

  const isNewUser = !session.data?.message.toLowerCase().includes("login");

  return (
    <div className="flex flex-col justify-between gap-3 md:gap-8 md:flex-row">
      <div className="md:w-4/6">
        <p className="sb-text-24 font-semibold">
          {isNewUser ? "Welcome to Sidebrief" : "Welcome back"}
          {firstName && `, ${firstName}`}
        </p>
        <p className="text-sm text-foreground-3 font-normal lg:sb-text-18">
          We are glad to have you join the 22,000,000 people all over the world who manage their
          businesses using the simplest and easiest business solution.
        </p>
      </div>

      <div>
        {!getServices.isLoading ? (
          <Link href={`/requests/${priority1?.id}`}>
            <Button
              color="secondary"
              processingSpinner={<Oval color="white" strokeWidth={4} className="h-6 w-6" />}
            >
              <span>{priority1?.label}</span>
              <ArrowRightCircle fill="white" stroke="hsl(var(--secondary))" />
            </Button>
          </Link>
        ) : (
          <Skeleton className="w-48 h-12" />
        )}
      </div>
    </div>
  );
};

export default WelcomeSection;

const SkeletonButton = () => {
  return <Skeleton className="w-48 h-12" />;
};
