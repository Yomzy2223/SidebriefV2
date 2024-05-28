import { Button } from "flowbite-react";
import React, { Dispatch, ReactNode, SetStateAction } from "react";
import { Oval } from "react-loading-icons";
import DialogWrapper from "../wrappers/dialogWrapper";

const ConfirmAction = ({
  children,
  title,
  description,
  open,
  setOpen,
  confirmAction,
  cancelAction,
  isLoading,
  isDelete,
  dismissible,
}: IProps) => {
  return (
    <DialogWrapper
      open={open}
      setOpen={(open) => {
        setOpen(open);
      }}
      title={title || ""}
      size="lg"
      classNames={{
        header: "[&_h3]:flex [&_h3]:flex-1 [&_h3]:justify-center",
        body: "min-h-max",
      }}
      dismissible={dismissible}
      fit
    >
      <div className="flex flex-col gap-4">
        <p className="sb-text-16 text-foreground-5 text-center">{description}</p>
        {children}

        <div className="flex justify-center items-center gap-4 mt-1">
          <Button
            onClick={confirmAction}
            color={isDelete ? "failure" : "secondary"}
            isProcessing={isLoading}
            disabled={isLoading}
            processingSpinner={<Oval color="white" strokeWidth={4} className="h-5 w-5" />}
          >
            Yes, I&#39;m sure
          </Button>
          <Button
            outline
            onClick={() => {
              setOpen(false);
              cancelAction && cancelAction();
            }}
          >
            No, cancel
          </Button>
        </div>
      </div>
    </DialogWrapper>
  );
};

export default ConfirmAction;

interface IProps {
  title?: string;
  description?: string;
  children?: ReactNode;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  confirmAction: () => void;
  cancelAction?: () => void;
  isLoading?: boolean;
  isDelete?: boolean;
  dismissible?: boolean;
}
