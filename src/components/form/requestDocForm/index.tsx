import DialogWrapper from "@/components/wrappers/dialogWrapper";
import React, { useState } from "react";

const RequestDocForm = () => {
  const [open, setOpen] = useState(false);

  const resetDialog = () => {
    setOpen(false);
  };

  return (
    <DialogWrapper
      open={open}
      setOpen={(open) => {
        open ? setOpen(open) : resetDialog();
      }}
      title=""
      size="3xl"
      dismissible={false}
    >
      RequestDocForm
    </DialogWrapper>
  );
};

export default RequestDocForm;
