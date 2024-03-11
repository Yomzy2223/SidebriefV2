"use client";

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import toastCheck from "@/assets/icons/toastCheck.svg";
import toastError from "@/assets/icons/toastError.svg";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, success, ...props }) {
        return (
          <Toast
            key={id}
            {...props}
            className={cn("justify-start border border-primary py-4", props.className)}
          >
            {success !== null &&
              (success ? (
                <Image src={toastCheck} alt="" className="w-max h-max" />
              ) : (
                <Image src={toastError} alt="" className="w-max h-max" />
              ))}
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && <ToastDescription>{description}</ToastDescription>}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
