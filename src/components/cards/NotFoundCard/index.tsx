import { NotFound } from "@/assets/svg";
import Image from "next/image";

export const NotFoundCard = () => {
  return (
    <div className="flex flex-col gap-5 items-center">
      <Image src={NotFound} alt="not found" />
      <div className="flex flex-col items-center">
        <p className="font-semibold leading-normal">This room is empty</p>
      </div>
    </div>
  );
};
