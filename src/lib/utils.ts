import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { pdf, png, jpg } from "@/assets/images";
import { StaticImageData } from "next/image";

interface FileTypeImage {
  id: string;
  name: string;
  type: string;
  image: StaticImageData;
}

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
  }

export const imageTypeImage: FileTypeImage[] = [
  {
    id: "1",
    name: "pdf",
    type: "application/pdf",
    image: pdf,
  },
  {
    id: "2",
    name: "png",
    type: "image/png",
    image: png,
  },
  {
    id: "3",
    name: "jpg",
    type: "image/jpeg",
    image: jpg,
  },
];