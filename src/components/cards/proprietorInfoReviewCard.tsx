"use client";

import { Card, Badge, Button, Navbar, NavbarCollapse } from "@/components/flowbite";
import { SwatchBook } from "@/assets/icons";
import { ExternalLink, Minus, Plus, User } from "lucide-react";
import { CheckBullet } from "../reuseables/checkBullet";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useGlobalFunctions } from "@/hooks/globalFunctions";
import { cn } from "@/lib/utils";
import QueryNav3 from "../navbar/querynav3";
import TextWithDetails from "../text/textWithDetails";

function getInitials(name: string): string {
  const words = name.trim().split(/\s+/);

  let initials = "";

  for (let i = 0; i < 2 && i < words.length; i++) {
    const word = words[i];

    const initial = word.charAt(0).toUpperCase();

    initials += initial;
  }

  return initials;
}

// export const MemberInfoReviewCard = ({
//   type,
//   name,
//   email,
// }: {
//   type: string;
//   name: string;
//   email: string;
// }) => {
//   return (
//     <Card className="w-full md:min-w-[480px] md:max-w-[calc(50%-12px)]">
//       <div className="grid grid-cols-[50px,1fr] grid-row-[repeat(2,fit-content)] gap-x-2.5 gap-y-7">
//         <div className="bg-primary text-white w-[50px] h-[50px] rounded-full grid place-items-center">
//           {getInitials(name)}
//         </div>
//         <div className="flex justify-between items-center">
//           <Badge color={"green"} icon={SwatchBook}>
//             {type}
//           </Badge>
//           <Button color="link" size={"fit"}>
//             <div className="flex gap-2 items-center">
//               See details <ExternalLink size={16} />
//             </div>
//           </Button>
//         </div>
//         <div className="col-start-2">
//           <h6 className="text-2xl font-semibold leading-normal">{name}</h6>

//           <p className="text-foreground-5 leading-normal">{email}</p>

//           <div className="mt-3.5 flex-col sm:flex-row flex flex-wrap gap-2">
//             <CheckBullet grey>10% share allocated</CheckBullet>
//             <CheckBullet grey>HT Share Type</CheckBullet>
//           </div>
//         </div>
//       </div>
//     </Card>
//   );
// };

export const MemberInfoReviewCards = ({
  title,
  info,
}: {
  title: string;
  info: { field: string; value: string; type?: string }[][];
}) => {
  const { setQuery, deleteQueryString } = useGlobalFunctions();

  const searchParams = useSearchParams();
  const clicked = searchParams.get(title.toLowerCase());
  const collapseAll = clicked === "all" || !clicked;
  const position = collapseAll ? 0 : parseInt(clicked?.slice(-1) || "1") - 1;

  const queryNav = info?.map((el, i) => ({
    name: title.toLowerCase(),
    value: title.toLowerCase() + " " + (i + 1),
  }));

  const details = collapseAll ? [info[position][0]] : info[position];

  const showDetails = (i: number) => {
    setQuery(title.toLowerCase(), title.toLowerCase() + " " + (i + 1));
  };

  const hideDetails = () => {
    deleteQueryString(title.toLowerCase());
  };

  return (
    <div
      className={cn("flex flex-wrap gap-4 ", {
        "border border-border p-4": collapseAll,
        "border-none": !collapseAll,
      })}
    >
      {info?.map(
        (ind, i) =>
          ((clicked && position === i) || collapseAll) && (
            <div
              key={i}
              className={cn("shadow-none transition-all border border-border rounded-md", {
                "w-[235px]": collapseAll,
                "w-[800px] overflow-auto": !collapseAll,
              })}
            >
              <motion.div className="min-w-max">
                <Navbar
                  className={cn(
                    "flex justify-between gap-6 p-4 bg-background left-0 sticky max-w-full",
                    {
                      "pb-0": collapseAll,
                    }
                  )}
                >
                  <NavbarCollapse>
                    <QueryNav3
                      queryNav={collapseAll ? [queryNav[i]] : queryNav}
                      defaultActive={0}
                    />
                  </NavbarCollapse>
                  <Button className="cursor-pointer" size="fit" color="ghost">
                    {collapseAll ? (
                      <Plus size={16} onClick={() => showDetails(i)} />
                    ) : (
                      <Minus size={16} onClick={hideDetails} />
                    )}
                  </Button>
                </Navbar>

                <div
                  className={cn("flex gap-4 p-4 ", {
                    "bg-[#F9FAFB]": !collapseAll,
                  })}
                >
                  {!collapseAll && <User />}
                  <div
                    className={cn("grid grid-cols-3 gap-4", {
                      flex: collapseAll,
                    })}
                  >
                    {details?.map((el) => (
                      <div key={el?.field}>
                        {el?.type === "doc" ? (
                          <TextWithDetails title={el?.field} text={el?.value} />
                        ) : (
                          <TextWithDetails title={el?.field} text={el?.value} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          )
      )}
    </div>
  );
};

// export default PersonsCard;
