"use client";

import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload } from "@/assets/icons";
import { cn } from "@/lib/utils";
import { FileIcon, defaultStyles, DefaultExtensionType } from "react-file-icon";
import { Button } from "flowbite-react";
import { DownloadIcon, PenIcon, PenLineIcon } from "lucide-react";
import { saveAs } from "file-saver";
import { on } from "stream";

export const FileInput = ({
  fileName,
  fileLink,
  onFileChange,
  fileType,
  fileSize,
  errorMsg,
  onlyDownload,
}: {
  fileName: string;
  fileLink: string;
  fileType: string;
  fileSize: string;
  onFileChange?: (file: File) => void;
  errorMsg?: string;
  onlyDownload?: boolean;
}) => {
  const [file, setFile] = useState<File>();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFile(acceptedFiles[0]);
      onFileChange && onFileChange(acceptedFiles[0]);
    },
    [onFileChange]
  );

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    noClick: !!file,
    noKeyboard: !!file,
    accept: {
      "application/msword": [],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [],
      "application/pdf": [],
    },
    disabled: onlyDownload || false,
  });

  const fileExtension = file?.name.split(".").pop() || fileType;

  const formatFileSize = (sizeInBytes: number): string => {
    if (sizeInBytes >= 1024 * 1024) {
      return `${(sizeInBytes / (1024 * 1024)).toFixed(2)} MB`;
    } else if (sizeInBytes >= 1024) {
      return `${(sizeInBytes / 1024).toFixed(2)} KB`;
    } else {
      return `${sizeInBytes} B`;
    }
  };

  let size: string = formatFileSize(file?.size || parseInt(fileSize) || 0);

  return (
    <div
      {...getRootProps()}
      className={cn(
        "bg-gray-50 px-8 py-4 cursor-pointer rounded-lg border-2 border-gray-200 border-dashed flex flex-col gap-2 items-center justify-center",
        {
          "border-solid cursor-default p-2": file || fileName,
        }
      )}
    >
      <input {...getInputProps({})} />
      {!file && !fileName && !fileLink ? (
        <>
          <Upload />
          {isDragActive ? (
            <p className="text-gray-500 text-sm leading-normal">Drop the files here ...</p>
          ) : (
            <div className="flex flex-col items-center">
              <p className="text-gray-500 text-sm leading-normal">Drag files here to upload</p>
              <p className="underline text-xs leading-normal text-primary">or browse for files</p>
            </div>
          )}
        </>
      ) : (
        <div className="flex w-full justify-between">
          <div className={"flex items-center space-x-3 w-4/6"}>
            <div className="w-4 h-4">
              <FileIcon
                extension={fileExtension}
                {...defaultStyles[fileExtension as DefaultExtensionType]}
                glyphColor={`${fileExtension === "pdf" && "red"}`}
              />
            </div>
            <div className="max-w-full">
              <p className="text-sm underline text-nowrap text-ellipsis overflow-hidden">
                {file?.name || fileName}
              </p>
              <p className="text-xs min-w-max">{size || 0}</p>
            </div>
          </div>
          <div className="flex gap-3">
            {!onlyDownload && (
              <Button color="link" size="fit" onClick={open}>
                change
              </Button>
            )}
            {(file || fileLink) && (
              <Button
                color="link"
                size="fit"
                onClick={(e) => {
                  e.stopPropagation();
                  saveAs(file || fileLink, file?.name || fileName);
                }}
              >
                <DownloadIcon size={18} />
              </Button>
            )}
          </div>
        </div>
      )}
      <p className="text-xs text-destructive-foreground ">{errorMsg}</p>
    </div>
  );
};
