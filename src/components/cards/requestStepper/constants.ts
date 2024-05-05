import { Thumbs, Profilecard, Clipboard, FileCheck } from "@/assets/icons";

export const plansStep = {
  name: "Products",
  description: "Select a product",
  Icon: Profilecard,
  route: "/",
};

export const infoStep = {
  name: "Info",
  description: "Fill and Submit the form",
  Icon: Thumbs,
  route: "/info",
};

export const paymentStep = {
  name: "Payment",
  description: "Make product payment",
  Icon: Clipboard,
  route: "/payment",
};
export const formsStep = {
  name: "Forms",
  description: "Fill and Submit the form",
  Icon: FileCheck,
  route: "/forms",
};
export const reviewStep = {
  name: "Review",
  description: "Review submitted information",
  Icon: FileCheck,
  route: "/review",
};
