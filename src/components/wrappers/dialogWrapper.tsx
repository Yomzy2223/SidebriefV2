import React, { Reference, RefObject } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";
import { Modal } from "flowbite-react";
import { useGlobalFunctions } from "@/hooks/globalFunctions";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const DialogWrapper = ({
  title,
  children,
  open,
  setOpen,
  fit,
  size,
  classNames,
  dismissible,
}: propsType) => {
  const { isDesktop } = useGlobalFunctions();

  return (
    <div>
      {isDesktop ? (
        <Modal
          size={size || "xl"}
          show={open}
          onClose={() => setOpen(false)}
          dismissible={dismissible}
        >
          <Modal.Header className={cn("items-center py-4", classNames?.header)}>
            <span className="text-lg font-semibold text-foreground">{title}</span>
          </Modal.Header>
          <Modal.Body
            className={cn(
              "flex flex-col p-5 pt-4 pb-0 mb-5",
              {
                "min-h-[70vh]": !fit,
              },
              classNames?.body
            )}
          >
            {children}
          </Modal.Body>
        </Modal>
      ) : (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent
            className={cn("p-5 pt-0 rounded-t-3xl max-h-screen", {
              "h-[90%]": !fit,
            })}
          >
            <DrawerHeader className="flex justify-between px-0">
              <DrawerTitle className="text-lg font-semibold text-foreground">{title}</DrawerTitle>
              <DrawerClose>
                <X color="hsl(var(--foreground-5))" />
              </DrawerClose>
            </DrawerHeader>
            <div className="flex flex-col overflow-auto flex-1 p-0.5">{children}</div>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
};

export default DialogWrapper;

interface propsType {
  title: string;
  children: React.ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
  fit?: boolean;
  size?: string;
  classNames?: {
    header?: string;
    body?: string;
  };
  dismissible?: boolean;
}
