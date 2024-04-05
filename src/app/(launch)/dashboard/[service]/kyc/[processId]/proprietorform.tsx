"use client";

import { TextInput, Label, Button, Select, Checkbox } from "@/components/flowbite";
import { ArrowRight } from "@/assets/icons";
import { useState } from "react";
import { KycUploadModal } from "./upload/kycUploadModal";

export const ProprietorForm = () => {
  const [openModal, setOpenModal] = useState(false);

  const closeModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <form className="flex flex-col gap-12 items-start">
        <div className="flex flex-col gap-6 w-full">
          <div className="flex flex-col gap-2">
            <Label htmlFor="type" value="Proprietor Type" />
            <Select id="type" placeholder="None">
              <option value={"stakeholder"}>Stakeholder</option>
              <option value="director">Director</option>
              <option value="beneficiary">Beneficiary</option>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="name" value="Enter Name (Surname first)" />
            <TextInput id="name" placeholder="Placeholder Text" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email" value="Enter Email Address" />
            <TextInput id="email" placeholder="Placeholder Text" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="share-percentage" value="Enter Share Percentage" />
            <TextInput id="share-percentage" placeholder="Placeholder Text" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="share-type" value="Select share type" />
            <TextInput id="share-type" placeholder="Placeholder Text" />
          </div>
          <div className="flex gap-2 items-center">
            <Checkbox id="is-director" />
            <Label htmlFor="is-director">
              Click here if shareholder is also a <span className="text-primary">Director</span> .
            </Label>
          </div>
          <div className="flex gap-2 items-start">
            <Checkbox id="self-fill" />
            <Label htmlFor="self-fill">
              Click here to ask Omolara to fill the required documents{" "}
              <span className="text-primary">(NIN, passport, statement of account)</span>
            </Label>
          </div>
        </div>
        <div className="flex justify-between w-full">
          <Button color="secondary" size={"lg"} onClick={() => setOpenModal(true)}>
            <div className="space-x-2 flex items-center">
              <p>Continue</p>
              <ArrowRight />
            </div>
          </Button>
          <Button color="ghost">
            <span className="text-primary">Add new proprietor</span>
          </Button>
        </div>
      </form>
      <KycUploadModal open={openModal} closer={closeModal} />
    </>
  );
};
