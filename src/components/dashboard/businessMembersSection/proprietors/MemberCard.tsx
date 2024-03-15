import { Badge, Button } from "@/components/flowbite";
import { SwatchBook } from "@/assets/icons";
import PopOverWrapper from "@/components/wrappers/popOverWrapper";
import { MouseEvent, useState } from "react";
import { EllipsisVertical } from "@/assets/svg";
import Image from "next/image";

const MemberCard = ({ info }: { info: ProprietorType }) => {
  const [open, setOpen] = useState(false);

  const onReminderClick = (e: MouseEvent<HTMLButtonElement>) => {
    setOpen(false);
  };
  const onFillClick = (e: MouseEvent<HTMLButtonElement>) => {
    setOpen(false);
  };

  return (
    <div className="flex justify-between gap-6">
      <div className="flex gap-2 items-center">
        <div className="h-[50px] w-[50px] rounded-full bg-primary grid place-items-center">
          <p className="text-white font-semibold text-xs leading-normal">{info.initial}</p>
        </div>
        <div className="">
          <p className="leading-normal text-gray-900 font-medium">{info.name}</p>
          <span className="leading-normal text-gray-500 text-sm">{info.email}</span>
        </div>
      </div>
      {false ? (
        <Badge icon={SwatchBook} color={"green"}>
          {info.type}
        </Badge>
      ) : (
        <PopOverWrapper
          open={open}
          setOpen={setOpen}
          onClose={() => console.log("Closed")}
          content={
            <div className="flex flex-col gap-2">
              <Button color="ghost" onClick={onReminderClick} className="text-foreground-7">
                Set reminder
              </Button>
              <Button color="ghost" onClick={onFillClick} className="text-foreground-7">
                Fill by yourself
              </Button>
            </div>
          }
        >
          <Button color="ghost" size="fit">
            <Image src={EllipsisVertical} alt="" />
          </Button>
        </PopOverWrapper>
      )}
    </div>
  );
};

export default MemberCard;

type ProprietorType = {
  name: string;
  email: string;
  type: string;
  initial: string;
};
