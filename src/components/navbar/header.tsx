import Image from "next/image";
import Sidebrief from "@/assets/Sidebrief.png";
import { SearchIcon, BellOutline, CogOutline } from "@/assets/icons";
import { Avatar, Button } from "@/components/flowbite";
import { cn } from "@/lib/utils";
import { Hamburger } from "@/assets/icons";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { signOut } from "next-auth/react";
import { ChevronDown } from "lucide-react";

export const Header = () => {
  return (
    <div className="md:h-[80px] py-6 md:py-0 gap-3 md:gap:0 flex md:items-center w-full flex-col items-start md:flex-row">
      <div className="flex justify-between items-center w-full md:w-auto">
        <Image src={Sidebrief} alt="sidebrief" quality={100} />
        <Button color="ghost">
          <Hamburger className={"block md:hidden"} />
        </Button>
      </div>
      <div className="w-[2px] h-[80px] bg-border ml-8 mr-10 hidden md:block" />
      <div className="flex items-center justify-between w-full">
        <h2 className="text-foreground text-2xl font-semibold leading-normal">
          Hello, <span className="text-foreground-light-grey">Joshua</span>👋
        </h2>
        <IconNav />
      </div>
    </div>
  );
};

const IconNav = () => {
  const handleLogout = async () => {
    await signOut({ redirect: true });
  };

  return (
    <div className={cn("hidden md:flex space-x-6 items-center")}>
      <div className="flex gap-4">
        <Button color="ghost" size="fit" className="w-fit h-fit p-2">
          <SearchIcon />
        </Button>
        <Button color="ghost" size="fit" className="w-fit h-fit p-2">
          <BellOutline />
        </Button>
        <Button color="ghost" size="fit" className="w-fit h-fit p-2">
          <CogOutline />
        </Button>
      </div>
      {/* <Popover>
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
      </Popover> */}
    </div>
  );
};

const iconColor = "hsl(var(--foreground-3))";
