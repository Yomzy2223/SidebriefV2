"use client";

import { Modal, Button, Badge } from "@/components/flowbite";
import { SwatchBook } from "@/assets/icons";
import { ExternalLink } from "lucide-react";
import { FileInput } from "@/components/form/fileInput";

export const KycUploadModal = ({
  open,
  closer,
}: {
  open: boolean;
  closer: () => void;
}) => {
  return (
    <Modal show={open} onClose={closer} size={"4xl"} className="">
      <Modal.Header>Add Stakeholders’ Documents</Modal.Header>
      <form className="overflow-y-auto">
        <Modal.Body className="py-11 px-5 space-y-8">
          <div className="flex gap-4">
            <Badge color={"green"} icon={SwatchBook}>
              shareholder
            </Badge>
            <Badge color={"green"} icon={SwatchBook} className="opacity-50">
              shareholder
            </Badge>
            <Badge color={"green"} icon={SwatchBook} className="opacity-50">
              shareholder
            </Badge>
          </div>
          <div className="space-y-6">
            <div className="flex justify-between">
              <h4 className="text-2xl font-semibold text-gray-900 leading-normal">
                Upload Oluwole Sayo’s Document
              </h4>
              <Button color="link" size={"fit"}>
                <div className="flex gap-2 items-center">
                  See details <ExternalLink size={16} />
                </div>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <FileInput name={"Document 1"} />
              <FileInput name={"Document 2"} />
              <FileInput name={"Document 3"} />
              <FileInput name={"Document 4"} />
              <FileInput name={"Document 5"} />
              <FileInput name={"Document 6"} />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="flex justify-between">
          <Button onClick={closer} color="secondary">
            Done
          </Button>
          <Button color="gray" onClick={closer}>
            Go to next proprietor
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};
