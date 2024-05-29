import axios from "axios";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { saveAs } from "file-saver";
import { useMediaQuery } from "./useMediaQuery";
import { pdf, png, jpg } from "@/assets/images";
import { useSession } from "next-auth/react";

export const useGlobalFunctions = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const session = useSession();
  const userCloudFolder = session.data?.user?.fullName + "-" + session.data?.user?.id;

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair(s)
  const createQueryString = useCallback(
    (queries?: { name: string; value: string | string[] }[]) => {
      const params = new URLSearchParams(searchParams.toString());
      if (!queries) return params;
      queries.forEach((query) => {
        params.set(query.name, query.value.toString());
      });

      return params.toString();
    },
    [searchParams]
  );

  const deleteQueryStrings = useCallback(
    (names: string[], newQueries?: string | URLSearchParams, dontPush?: boolean) => {
      const params = new URLSearchParams(newQueries || searchParams.toString());
      names.forEach((name) => params.delete(name));
      if (!dontPush) router.push(pathname + "?" + params.toString(), { scroll: false });

      return params.toString();
    },
    [searchParams]
  );

  const setQuery = (name: string, value: string | number) => {
    router.push(pathname + "?" + createQueryString([{ name, value: value.toString() }]), {
      scroll: false,
    });
  };

  const getRandColor = (i: number) => {
    return tagColors[i % 5];
  };

  // Use this to set a pathname (uses current pathname, if not provided)
  // alongside queries (uses current queries, if not provided)
  const setQueriesWithPath = ({
    path,
    addPath,
    queries,
    rmQueries,
    returnUrl,
  }: {
    path?: string;
    addPath?: string;
    queries?: { name: string; value: string | string[] }[];
    rmQueries?: string[];
    returnUrl?: boolean;
  }) => {
    let realPath = path || pathname;
    let newQueries = createQueryString(queries);
    if (rmQueries) newQueries = deleteQueryStrings(rmQueries, newQueries, true);
    if (addPath) realPath = realPath + "/" + addPath;
    realPath = realPath + "?" + newQueries;

    if (returnUrl) return realPath;
    router.push(realPath, {
      scroll: false,
    });
  };

  const getReqStatusColor = (status: string) => {
    if (status === "PENDING") return "[&_span]:bg-primary-8 [&_span]:text-primary";
    if (status === "SUBMITTED") return "[&_span]:bg-success [&_span]:text-success-foreground";
    if (status === "ASSIGNED") return "[&_span]:bg-success [&_span]:text-success-foreground";
    if (status === "ACCEPTED") return "[&_span]:bg-tertiary [&_span]:text-tertiary-foreground";
    if (status === "REJECTED")
      return "[&_span]:bg-destructive [&_span]:text-destructive-foreground";
    if (status === "COMPLETED") return "[&_span]:bg-success [&_span]:text-success-foreground";
  };

  return {
    createQueryString,
    deleteQueryStrings,
    setQuery,
    setQueriesWithPath,
    isDesktop,
    getRandColor,
    userCloudFolder,
    getReqStatusColor,
  };
};

export const uploadFileToCloudinary = async ({
  getProgress,
  file,
  folderName,
}: {
  file: File;
  getProgress?: (e: number) => void;
  folderName?: string;
}) => {
  const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/raw/upload`;
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", `${process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}`);
  formData.append("folder", folderName ? `App V2/${folderName}` : "App V2");

  return await axios.post(url, formData, {
    onUploadProgress: (progressEvent) => {
      if (progressEvent.total) {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        getProgress && getProgress(percentCompleted);
      }
    },
  });
};

export const downloadFileFromCloudinary = (cloudinaryLink: string, fileName: string) => {
  const result = axios
    .get(cloudinaryLink, {
      responseType: "blob",
    })
    .then((res) => {
      console.log(res);
      saveAs(res.data, fileName);
    })
    .catch((err) => {
      console.log(err.message);
      throw new Error(err);
    });

  return result;
};

export const getFileImage = (type: string) => {
  if (type.includes("pdf")) return pdf;
  if (type.includes("png")) return png;
  if (type.includes("jpg")) return jpg;
  else return pdf;
};

export const tagColors = [
  {
    text: "hsl(300,100%,41%)",
    bg: "bg-[hsl(300,100%,91%)]",
  },
  {
    text: "hsl(250, 100%, 41%)",
    bg: "bg-[hsl(250,100%,91%)]",
  },
  {
    text: "hsl(200, 100%, 41%)",
    bg: "bg-[hsl(200,100%,91%)]",
  },
  {
    text: "hsl(150, 100%, 41%)",
    bg: "bg-[hsl(150,100%,91%)]",
  },
  {
    text: "hsl(100, 100%, 41%)",
    bg: "bg-[hsl(100,100%,91%)]",
  },
  {
    text: "hsl(50, 100%, 41%)",
    bg: "bg-[hsl(50,100%,91%)]",
  },
];

export const getStatusBadgeColor = (status: string) => {
  if (status === "PENDING") return "pink";
  if (status === "SUBMITTED") return "blue";
  if (
    status === "INPROGRESS" ||
    status === "ASSIGNED" ||
    status === "ACCEPTED" ||
    status === "REJECTED"
  )
    return "yellow";
  if (status === "COMPLETED") return "green";
};
