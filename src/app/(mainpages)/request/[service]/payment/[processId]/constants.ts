import { FlutterwaveIcon, PaystackIcon, RemitaIcon } from "@/assets/images";

export const options = [
  {
    name: "remita",
    icon: RemitaIcon,
  },
  {
    name: "paystack",
    icon: PaystackIcon,
  },
  {
    name: "flutterwave",
    icon: FlutterwaveIcon,
  },
];

export const cardFormElement = [
  {
    id: "1",
    name: "card-number",
    type: "short answer",
    label: "Card Number",
    selectOptions: [],
  },
  {
    id: "2",
    name: "expiry-month",
    type: "short answer",
    label: "Expiry Month",
    selectOptions: [],
  },
  {
    id: "2",
    name: "expiry-year",
    type: "short answer",
    label: "Expiry Year",
    selectOptions: [],
  },
  {
    id: "3",
    name: "cvv",
    type: "short answer",
    label: "CVV",
    selectOptions: [],
  },
];
