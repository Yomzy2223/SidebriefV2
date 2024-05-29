import { EmptyContentSvg } from "@/assets/svg";
import Image from "next/image";
import React from "react";

const Settings = () => {
  return (
    <div className="flex flex-col justify-center gap-4 items-center flex-1 w-max my-10 m-auto min-h-full">
      <Image src={EmptyContentSvg} alt="empty" />
      <p className="sb-text-20 text-center lowercase first-letter:uppercase">Coming soon!!!</p>
    </div>
  );
};

export default Settings;
