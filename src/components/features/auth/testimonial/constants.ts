import { TestimonialUser } from "@/assets/icons";
import { StaticImageData } from "next/image";

export interface Itestimonial {
  title: string;
  description: string;
  image: string | StaticImageData;
  name: string;
  position: string;
}

export const mockTestimonial: Itestimonial[] = [
  {
    title: "Sidebrief made my business registration easy.",
    description:
      "Being a foreigner, I was trying to be careful with doing business and I am glad that just in time I found Sidebrief!!!",
    image: TestimonialUser,
    name: "Aderibigbe Adeola",
    position: "CEO, Cakes by me",
  },
  {
    title: "Sidebrief made my business registration easy.",
    description:
      "Being a foreigner, I was trying to be careful with doing business and I am glad that just in time I found Sidebrief!!!",
    image: TestimonialUser,
    name: "Aderibigbe Adeola",
    position: "CEO, Cakes by me",
  },
  {
    title: "Sidebrief made my business registration easy.",
    description:
      "Being a foreigner, I was trying to be careful with doing business and I am glad that just in time I found Sidebrief!!!",
    image: TestimonialUser,
    name: "Aderibigbe Adeola",
    position: "CEO, Cakes by me",
  },
];
