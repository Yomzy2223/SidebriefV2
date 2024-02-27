"use client";

import { GoogleIcon, YahooIcon } from "@/assets/svg";
import { Button } from "flowbite-react";
import { FooterDivider } from "flowbite-react/lib/esm/components/Footer/FooterDivider";
import Image from "next/image";
import React, { ReactNode } from "react";

interface propType {
  children: ReactNode;
  login?: boolean;
  handlers?: { google: () => void; yahoo: () => void };
  title: string;
  description?: string;
  hideSocials?: boolean;
}

const AuthFormWrapper = ({
  children,
  login,
  handlers,
  title,
  description,
  hideSocials,
}: propType) => {
  const google = login ? "Sign in with Google" : "Sign up with Google";
  const yahoo = login ? "Sign in with Yahoo" : "Sign up with Yahoo";
  const other = login ? "Or sign in with" : "Or sign up with";

  return (
    <div className="max-w-[600px]">
      <div className="mb-10">
        <h2 className="sb-text-32 font-semibold mb-2">{title}</h2>
        <p className="sb-text-16 font-normal text-foreground-3">{description}</p>
      </div>
      {!hideSocials && (
        <>
          <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:gap-8">
            <Button className="!sb-text-18 font-semibold w-full" outline onClick={handlers?.google}>
              <Image src={GoogleIcon} alt="Google icon" className="mr-2 w-5 h-5 sm:w-6 sm:h-6" />
              {google}
            </Button>
            {/* <Button className="font-semibold" outline onClick={handlers?.yahoo}>
              <Image src={YahooIcon} alt="Yahoo icon" className="mr-2 w-5 h-5 sm:w-6 sm:h-6" />
              {yahoo}
            </Button> */}
          </div>
          <div className="flex items-center gap-[max(5%,16px)] mb-2">
            <FooterDivider /> <span className="min-w-max text-foreground-3">{other}</span>{" "}
            <FooterDivider />
          </div>
        </>
      )}

      {children}
    </div>
  );
};

export default AuthFormWrapper;
