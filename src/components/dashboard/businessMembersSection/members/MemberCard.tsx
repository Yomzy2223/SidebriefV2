import { Badge, Button } from "@/components/flowbite";
import { SwatchBook } from "@/assets/icons";
import PopOverWrapper from "@/components/wrappers/popOverWrapper";
import { MouseEvent, useState } from "react";
import { Info } from "lucide-react";
import EllipsisVertical from "@/assets/icons/ellipsis-vertical";

const MemberCard = ({ info }: { info: MemberType }) => {
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
        <div className="h-[40px] w-[40px] rounded-full bg-primary grid place-items-center md:h-[50px] md:w-[50px]">
          <p className="text-white font-semibold text-xs leading-normal">{info.initial}</p>
        </div>
        <div>
          <div className="flex gap-1">
            <span className="sb-text-16 leading-normal text-foreground-9 font-mediumn whitespace-nowrap overflow-hidden text-ellipsis">
              {info.name}
            </span>
            {!info?.hasDocs && (
              <div className="flex items-center gap-1 text-xs text-destructive-foreground bg-destructive rounded-md px-2.5 py-0.5 whitespace-nowrap overflow-hidden text-ellipsis">
                <Info size={10} /> <span>Awaiting Documents</span>
              </div>
            )}
          </div>
          <span className="leading-normal text-gray-500 text-xs whitespace-nowrap overflow-hidden text-ellipsis">
            {info.email}
          </span>
        </div>
      </div>
      {info?.hasDocs ? (
        <Badge icon={SwatchBook} color={"green"} className="px-2.5 py-0.5 rounded-md">
          {info.type}
        </Badge>
      ) : (
        <PopOverWrapper
          open={open}
          setOpen={setOpen}
          onClose={() => console.log("Closed")}
          content={
            <div className="flex flex-col gap-1">
              <Button color="ghost" onClick={onReminderClick} className="text-foreground-7">
                Set reminder
              </Button>
              <Button color="ghost" onClick={onFillClick} className="text-foreground-7">
                Fill by yourself
              </Button>
            </div>
          }
        >
          <Button color="ghost" size="fit" className="text-foreground-5">
            <EllipsisVertical />
          </Button>
        </PopOverWrapper>
      )}
    </div>
  );
};

export default MemberCard;

type MemberType = {
  name: string;
  email: string;
  type: string;
  initial: string;
  hasDocs?: boolean;
};
