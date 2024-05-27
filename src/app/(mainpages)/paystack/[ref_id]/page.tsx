"use client";

import { useVerifyPaystackPayment } from "@/services/paystack";

export default function CheckPayStack({ params }: { params: { ref_id: string } }) {
  const verifyPaystack = useVerifyPaystackPayment({ reference: params.ref_id });

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <p>Checking paystack payment...</p>
    </div>
  );
}
