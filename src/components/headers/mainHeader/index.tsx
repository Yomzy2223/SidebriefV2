"use client";

import Image from "next/image";
import { SidebriefLogo } from "@/assets/images";
import { BellRing, ChevronDown, MenuIcon, Search, Settings } from "lucide-react";
import { Avatar, Button } from "flowbite-react";
import { useRouter } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export const Header = () => {
  const session = useSession();
  const { push } = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: true });
  };

  const fullName = session.data?.user?.fullName || "";
  const firstName = fullName.split(" ")[0];

  function getInitials(fullName: string): string {
    const names = fullName.trim().split(" ");
    if (names.length === 1) {
      return names[0].substring(0, 2).toUpperCase();
    }
    const initials = names[0].charAt(0) + names[names.length - 1].charAt(0);
    return initials.toUpperCase();
  }

  const initials = fullName ? getInitials(fullName) : "0";

  return (
    <div className="sticky top-0 left-0 bg-background border-b z-20 px-5 md:px-8 ">
      {/* Desktop header */}
      <div className="hidden items-center w-full h-20 divide-x md:flex">
        <Link href={"/dashboard"}>
          <Image
            src={SidebriefLogo}
            alt="sidebrief"
            quality={100}
            className="object-contain py-4 mr-8"
          />
        </Link>

        <div className="flex items-center justify-between py-4 gap-8 w-full pl-10">
          <div className="flex flex-1 items-center gap-8">
            <h2 className="sb-text-24 font-semibold whitespace-nowrap">
              Hello, <span className="text-foreground-4">{firstName && `${firstName}`}</span>👋
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <Button color="ghost" size="fit" className="p-1" onClick={() => push("/notifications")}>
              <BellRing color={iconColor} />
            </Button>
            <Button color="ghost" size="fit" className="p-1">
              <Settings color={iconColor} />
            </Button>
            <Popover>
              <PopoverTrigger asChild>
                <Button color="ghost" size="fit" className="flex items-center">
                  <Avatar placeholderInitials={initials} rounded />
                  <ChevronDown color={iconColor} />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-28">
                <Button
                  size="fit"
                  color="ghost"
                  className="text-destructive-foreground"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>

      {/* Mobile header */}
      <div className="flex justify-between py-4 md:hidden">
        <div className="flex items-center gap-4">
          <Button color="ghost" size="fit" className="flex items-center">
            <MenuIcon color={iconColor} />
          </Button>
          <Image
            src={SidebriefLogo}
            alt="sidebrief"
            quality={100}
            className="object-contain w-20"
          />
        </div>
        <div className="flex items-center gap-3">
          <Button color="ghost" size="fit" className="p-1 hidden min-[300px]:block">
            <BellRing color={iconColor} />
          </Button>
          <Button color="ghost" size="fit" className="flex items-center">
            <Avatar placeholderInitials="OG" rounded />
            <ChevronDown color={iconColor} />
          </Button>
        </div>
      </div>
    </div>
  );
};

const iconColor = "hsl(var(--foreground-3))";
