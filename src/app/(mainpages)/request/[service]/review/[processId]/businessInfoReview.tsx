"use client";

import { Button, TextInput, Label, Badge } from "@/components/flowbite";
import { PencilLine } from "lucide-react";
import { SwatchBook } from "@/assets/icons";

export const BusinessInfoReview = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between w-full">
        <div className="flex flex-col">
          <h4 className="text-sm leading-normal text-foreground-3 mb-1">REVIEW & SUBMISSION</h4>
          <h6 className="text-2xl leading-normal font-semibold">Business Information Review</h6>
        </div>
        <Button color="link" size={"fit"} className="self-end text-sm">
          Edit <PencilLine strokeWidth={1} size={16} />
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(450px,1fr))] gap-8">
        <div className="space-y-2">
          <Label htmlFor="business-name" value="Business Name" />
          <TextInput id="business-name" placeholder="Enter your business name here" disabled />
        </div>
        <div className="space-y-2">
          <Label htmlFor="operation-country" value="Country of Operation" />
          <TextInput id="operation-country" placeholder="Enter your business name here" disabled />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="objectives" value="Business Objectives" />
          <TextInput id="objectives" placeholder="Enter your business name here" disabled />
          <div className="flex flex-wrap gap-2.5 mt-2">
            <Badge color={"green"} icon={SwatchBook}>
              Business certification
            </Badge>
            <Badge color={"magenta"} icon={SwatchBook}>
              Change of director name
            </Badge>
            <Badge color={"green"} icon={SwatchBook}>
              Business certification
            </Badge>
            <Badge color={"yellow"} icon={SwatchBook}>
              Document verification
            </Badge>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="reg-plan" value="Business Registration plan" />
          <TextInput id="reg-plan" placeholder="Enter your business name here" disabled />
        </div>
      </div>
    </div>
  );
};
