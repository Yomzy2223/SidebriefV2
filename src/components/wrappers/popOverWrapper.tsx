import { useGlobalFunctions } from "@/hooks/globalFunctions";
import React, { Dispatch, ReactNode, SetStateAction } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { cn } from "@/lib/utils";

const PopOverWrapper = ({
  children,
  content,
  open,
  setOpen,
  disabled,
  onClose,
  big,
  className,
}: IProps) => {
  const { isDesktop } = useGlobalFunctions();

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    if (open === false && onClose) onClose();
  };

  return (
    <div>
      {isDesktop ? (
        <Popover open={open} onOpenChange={handleOpenChange}>
          <PopoverTrigger asChild disabled={disabled}>
            {children}
          </PopoverTrigger>
          <PopoverContent
            className={cn(
              "min-w-[200px] !w-max max-w-[400px] p-0 max-h-[400px] overflow-auto",
              {
                "max-w-[1000px] p-0 max-h-[1000px]": big,
              },
              className
            )}
            align="start"
          >
            {content}
          </PopoverContent>
        </Popover>
      ) : (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild disabled={disabled}>
            {children}
          </DrawerTrigger>
          <DrawerContent className="max-h-screen">
            <div className={cn("overflow-auto mt-4 border-t", cn)}>{content}</div>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
};

export default PopOverWrapper;

interface IProps {
  children: ReactNode;
  content: ReactNode;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  disabled?: boolean;
  onClose?: () => void;
  big?: boolean;
  className?: string;
}
