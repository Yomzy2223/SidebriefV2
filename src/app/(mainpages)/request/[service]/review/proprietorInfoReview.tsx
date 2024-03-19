import { Button, Card, Badge } from "@/components/flowbite";
import { PencilLine } from "lucide-react";
import { SwatchBook } from "@/assets/icons";
import { MemberInfoReviewCard } from "@/components/cards/proprietorInfoReviewCard";

export const MemberInfoReview = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between w-full">
        <div className="flex flex-col">
          <h4 className="text-sm leading-normal text-foreground-3 mb-1">REVIEW & SUBMISSION</h4>
          <h6 className="text-2xl leading-normal font-semibold">Member Information Review</h6>
        </div>
        <Button color="link" size={"fit"} className="self-end text-sm">
          Edit <PencilLine strokeWidth={1} size={16} />
        </Button>
      </div>
      <div className="flex flex-wrap gap-6">
        <MemberInfoReviewCard />
        <MemberInfoReviewCard />
        <MemberInfoReviewCard />
      </div>
    </div>
  );
};
