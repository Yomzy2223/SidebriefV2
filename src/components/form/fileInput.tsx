"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload } from "@/assets/icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/flowbite";
import { FileIcon, defaultStyles, DefaultExtensionType } from "react-file-icon";

export const FileInput = ({ name }: { name: string }) => {
  const [file, setFile] = useState<File>();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log(acceptedFiles[0]);
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    maxFiles: 1,
    noClick: !!file,
    noKeyboard: !!file,
  });

  const fileExtension = file?.name.split(".").pop();

  return (
    <div>
      <p className="text-sm font-medium leading-normal">{name}</p>
      <div
        {...getRootProps({})}
        className={cn(
          "bg-gray-50 px-8 py-4 cursor-pointer rounded-lg border-2 border-gray-200 border-dashed flex flex-col gap-2 items-center justify-center",
          {
            "border-solid cursor-default": !!file,
          }
        )}
      >
        <input {...getInputProps({})} />
        {!file ? (
          <>
            <Upload />
            <div className="flex flex-col items-center">
              <p className="text-gray-500 text-sm leading-normal">
                Drag files here to upload
              </p>
              <p className="underline text-xs leading-normal text-primary">
                or browse for files
              </p>
            </div>
          </>
        ) : (
          <div className="flex w-full justify-between">
            <div className="flex space-x-3">
              <div className="w-5 h-5">
                <FileIcon
                  extension={fileExtension}
                  {...defaultStyles[fileExtension as DefaultExtensionType]}
                  glyphColor={`${fileExtension === "pdf" && "red"}`}
                />
              </div>
              <p className={"underline"}>{file.name}</p>
            </div>
            <Button color="link" size={"fit"} onClick={open}>
              <p>Change</p>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
