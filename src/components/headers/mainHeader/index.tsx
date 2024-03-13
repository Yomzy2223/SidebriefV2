"use client";

import Image from "next/image";
import { SidebriefLogo } from "@/assets/images";
import { BellRing, ChevronDown, MenuIcon, Search, Settings } from "lucide-react";
import { Avatar, Button } from "flowbite-react";
import { useRouter } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { signOut } from "next-auth/react";

export const Header = () => {
  const { push } = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: true });
  };

  return (
    <div className="sticky top-0 bg-background border-b z-20 px-5 md:px-8 ">
      {/* Desktop header */}
      <div className="hidden items-center w-full h-20 divide-x md:flex">
        <Image
          src={SidebriefLogo}
          alt="sidebrief"
          quality={100}
          className="object-contain py-4 mr-8"
        />

        <div className="flex items-center justify-between py-4 gap-8 w-full pl-10">
          <div className="flex flex-1 items-center gap-8">
            <h2 className="sb-text-24 font-semibold whitespace-nowrap">
              Hello, <span className="text-foreground-4">Joshua</span>👋
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
                  <Avatar placeholderInitials="OG" rounded />
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
          <Button color="ghost" size="fit" className="p-1">
            <Search color={iconColor} />
          </Button>
          <Button color="ghost" size="fit" className="p-1">
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
