import { Card } from "flowbite-react";
import { CheckCheck, ExternalLink } from "lucide-react";
import Link from "next/link";
import React from "react";

const SuggestionCard = ({
  title,
  description,
  guideLink,
}: {
  title: string;
  description: string;
  guideLink: string;
}) => {
  return (
    <Card className="shrink-0 [&_div]:p-4 [&_div]:gap-2 min-w-[200px] max-w-[240px]">
      <p className="sb-text-18 font-bold text-foreground-9 mb-1 whitespace-nowrap">{title}</p>
      <p className="text-xs font-normal text-foreground-5">{description}</p>
      {/* {guideLink ? (
        <Link href={guideLink} className="text-xs font-normal text-[#1C64F2] inline-flex gap-1">
          See our guidelines <ExternalLink size={14} />
        </Link>
      ) : (
        <p className="text-xs font-normal text-success-foreground inline-flex gap-1">
          Completed <CheckCheck size={14} />
        </p>
      )} */}
    </Card>
  );
};

export default SuggestionCard;
