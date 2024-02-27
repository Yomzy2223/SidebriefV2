import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { pdf, png, jpg } from "@/assets/images";
import { StaticImageData } from "next/image";
import * as confetti from "canvas-confetti";

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

export const ConfettiDesign = (): void => {
  const duration: number = 5 * 1000;
  const animationEnd: number = Date.now() + duration;
  const defaults: {
    startVelocity: number;
    spread: number;
    ticks: number;
    zIndex: number;
  } = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  function randomInRange(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  const interval: NodeJS.Timeout = setInterval((): void => {
    const timeLeft: number = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount: number = 50 * (timeLeft / duration);
    // confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
    // confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
  }, 250);
};

export function isValidUUID(uuid: string): boolean {
  const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidPattern.test(uuid);
}
