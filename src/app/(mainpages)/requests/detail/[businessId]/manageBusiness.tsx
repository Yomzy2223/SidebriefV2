import { EmptyContentSvg } from "@/assets/svg";
import { Button } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";

export const Manage = () => {
  return (
    <div className="flex flex-col justify-center gap-4 items-center flex-1 w-max my-10 m-auto">
      <Image src={EmptyContentSvg} alt="empty" />
      <p className="sb-text-20 text-center">Coming soon</p>
      <Link href={"/dashboard"}>
        <Button outline color="primary">
          Back to dashboard
        </Button>
      </Link>
    </div>
  );
};
