import { InfoGif, PaymentCardGif, ProfileGif, ReviewGif } from "@/assets/gif";

export const steps = [
  {
    step: "Step 1",
    description:
      "Now continue the process of registering your business without the need for any physical paperwork.",
    state: "request-info",
    icon: ProfileGif,
  },
  {
    step: "Step 2",
    description:
      "Now continue the process of registering your business without the need for any physical paperwork.",
    state: "payment",
    icon: PaymentCardGif,
  },
  {
    step: "Step 3",
    description:
      "Now continue the process of registering your business without the need for any physical paperwork.",
    state: "kyc",
    icon: InfoGif,
  },
  {
    step: "Step 4",
    description:
      "Now continue the process of registering your business without the need for any physical paperwork.",
    state: "review",
    icon: ReviewGif,
  },
];
