"use client";

import { Button } from "@/components/flowbite";
import { Minus, Plus, User } from "lucide-react";
import { cn } from "@/lib/utils";
import QueryNav3 from "../navbar/querynav3";
import TextWithDetails from "../text/textWithDetails";
import { FileInput } from "../file/fileInput";
import { useState } from "react";
import { TFieldTypes } from "@/services/service/types";

export const MemberInfoReviewCards = ({
  title,
  info,
  fill,
}: {
  title: string;
  info: IPersonCard[][];
  fill?: boolean;
}) => {
  const [clicked, setClicked] = useState<boolean>(false);
  const [position, setPosition] = useState(0);

  const conditionalInfo = clicked ? [info[0]] : info;

  const showDetails = () => {
    setClicked(true);
  };

  const hideDetails = () => {
    setClicked(false);
    setPosition(0);
  };

  const headers = clicked ? info?.length : 1;

  return (
    <div
      className={cn("flex flex-wrap gap-4 border-none", {
        "border border-border m-4": !clicked,
      })}
    >
      {conditionalInfo?.map((el, ind) => {
        const details = !clicked ? [info[ind][0]] : info[position];

        return (
          <div
            key={ind}
            className={cn("transition-all border border-border rounded", {
              "w-[235px]": !clicked,
              "w-[600px] overflow-auto border-none": !!clicked,
              "w-full": !!clicked && fill,
            })}
          >
            {/* </Navbar> */}
            <div
              className={cn("sticky left-0 flex justify-between gap-6 p-4 pb-0 bg-[#F9FAFB]", {
                "bg-background pb-4": clicked,
              })}
            >
              <div className="flex gap-4">
                {Array(headers)
                  .fill("")
                  ?.map((el, i) => (
                    <Button
                      key={i}
                      color="ghost"
                      size="fit"
                      className={cn("text-foreground-5 px-2.5 py-0.5", {
                        "bg-success text-success-foreground": position === i,
                      })}
                      onClick={() => setPosition(i)}
                    >
                      {title.toLowerCase() + " " + ((clicked ? i : ind) + 1)}
                    </Button>
                  ))}
              </div>

              <Button className="cursor-pointer" size="fit" color="ghost">
                {!clicked ? (
                  <Plus size={16} onClick={showDetails} />
                ) : (
                  <Minus size={16} onClick={hideDetails} />
                )}
              </Button>
            </div>
            <div className="min-w-max bg-[#F9FAFB] p-4">
              <div className="flex gap-4">
                {!!clicked && <User />}
                <div
                  className={cn("grid grid-cols-3 gap-4", {
                    flex: !clicked,
                  })}
                >
                  {details?.map((el) => (
                    <div key={el?.field}>
                      {el?.type === "document template" || el?.type === "document upload" ? (
                        el.fileName && el.fileLink && el.fileSize && el.fileType ? (
                          <FileInput
                            fileName={el.fileName}
                            fileLink={el.fileLink}
                            fileSize={el.fileSize}
                            fileType={el.fileType}
                            onlyDownload
                          />
                        ) : (
                          <div>
                            <p className="text-base font-semibold text-foreground-9">{el.field}</p>
                            <p className="text-foreground-5 text-sm italic">
                              Document not uploaded yet
                            </p>
                          </div>
                        )
                      ) : (
                        <TextWithDetails title={el?.field} text={el?.value} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// export default PersonsCard;
export interface IPersonCard {
  field: string;
  value: string;
  type?: TFieldTypes;
  fileName?: string;
  fileLink?: string;
  fileType?: string;
  fileSize?: string;
}
