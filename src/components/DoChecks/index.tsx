import { EmptyContentSvg } from "@/assets/svg";
import { Button } from "flowbite-react";
import Image from "next/image";
import React, { MouseEventHandler, ReactNode } from "react";

const DoChecks = ({
  children,
  items,
  errorText,
  emptyText,
  className,
  btnAction,
  btnText,
  isLoading,
  Skeleton,
}: {
  children: ReactNode;
  items: any[];
  errorText?: string;
  emptyText?: string;
  className?: string;
  btnAction?: MouseEventHandler<HTMLButtonElement>;
  btnText?: string;
  isLoading?: boolean;
  Skeleton?: any;
}) => {
  if (errorText) return <p>{errorText}</p>;

  if (isLoading) return Skeleton || <div></div>;

  if (items?.length === 0)
    return (
      <div className="flex flex-col justify-center gap-4 items-center flex-1 w-max my-10 m-auto">
        <Image src={EmptyContentSvg} alt="empty" />
        <p className="sb-text-20 text-center">{emptyText}</p>
        {btnAction && btnText && (
          <Button outline color="primary" onClick={btnAction}>
            {btnText}
          </Button>
        )}
      </div>
    );

  return <div className={className}>{children}</div>;
};

export default DoChecks;
