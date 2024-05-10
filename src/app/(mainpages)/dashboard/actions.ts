import { cn } from "@/lib/utils";
import { useGetUserBusinessRequests } from "@/services/business";
import { getRequestQA } from "@/services/productQA/operations";
import { useGetServices } from "@/services/service";
import { useQueries } from "@tanstack/react-query";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import numeral from "numeral";

const cellClassName =
  "[&_span]:bg-yellow-300 [&_span]:px-[10px] [&_span]:py-[2px] [&_span]:rounded-md";

export const useTableInfo = () => {
  const router = useRouter();
  const pathname = usePathname();

  const session = useSession();

  // const getServices = useGetServices();
  // const services = getServices.data?.data.data;

  const userId = session.data?.user.id;

  const getUserBusinessRequests = useGetUserBusinessRequests({ userId });

  const userBusinessRequests = getUserBusinessRequests.data?.data.data;

  const sortedUserBusinessRequests = userBusinessRequests?.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const getProductQAQueries = useQueries({
    queries:
      sortedUserBusinessRequests?.map((request) => {
        return {
          queryKey: ["get product QA", request.productRequest[0]?.id],
          queryFn: () => getRequestQA({ requestId: request.productRequest[0].id }),
        };
      }) || [],
  });

  const productQAQueries = getProductQAQueries.map((QA) => QA.data?.data.data);

  const onClick = () => router.push(pathname + "", { scroll: false });

  // Services table header
  const tableHeaders = ["S/N", "SERVICE NAME", "STATUS", "AMOUNT", "DATE"];

  // Services table body
  const tableBody = sortedUserBusinessRequests?.map((each, index: number) => {
    return {
      rowProps: { onClick },
      rowInfo: [
        { key: "1", text: numeral(index + 1).format("00") },
        {
          key: "2",
          text:
            each.companyName ||
            productQAQueries[index]
              ?.find((qa) => qa.subForm.some((subform) => subform.type === "business name"))
              ?.subForm.find((subform) => subform.type === "business name")?.answer[0] ||
            `No added name ${index + 1}`,
        },
        {
          key: "3",
          text: each.status,
          cellProps: {
            className: cn(
              cellClassName,
              "[&_span]:bg-success [&_span]:text-success-foreground lowercase"
            ),
          },
        },
        // TODO: the amount field is not provided
        { key: "4", text: "$200" },
        { key: "5", text: format(each.createdAt || "", "do MMMM, yyyy") },
      ],
    };
  });

  // const tableBody = [
  //   {
  //     rowProps: { onClick },
  //     rowInfo: [
  //       { text: "01" },
  //       { text: "Sayo oil and gas" },
  //       {
  //         text: "Submitted",
  //         cellProps: {
  //           className: cn(cellClassName, "[&_span]:bg-success [&_span]:text-success-foreground"),
  //         },
  //       },
  //       { text: "$200" },
  //       { text: "April 23, 2021" },
  //     ],
  //   },
  //   {
  //     rowProps: { onClick },
  //     rowInfo: [
  //       { text: "01" },
  //       { text: "Sayo oil and gas" },
  //       {
  //         text: "Submitted",
  //         cellProps: {
  //           className: cn(cellClassName, "[&_span]:bg-success [&_span]:text-success-foreground"),
  //         },
  //       },
  //       { text: "$150" },
  //       { text: "April 23, 2021" },
  //     ],
  //   },
  //   {
  //     rowProps: { onClick },
  //     rowInfo: [
  //       { text: "01" },
  //       { text: "Sayo oil and gas" },
  //       {
  //         text: "Done",
  //         cellProps: {
  //           className: cn(cellClassName, "[&_span]:bg-primary/20 [&_span]:text-primary"),
  //         },
  //       },
  //       { text: "$200" },
  //       { text: "April 23, 2021" },
  //     ],
  //   },
  //   {
  //     rowProps: { onClick },
  //     rowInfo: [
  //       { text: "01" },
  //       { text: "Sayo oil and gas" },
  //       {
  //         text: "In progress",
  //         cellProps: {
  //           className: cn(cellClassName, "[&_span]:bg-secondary/20 [&_span]:text-secondary"),
  //         },
  //       },
  //       { text: "$200" },
  //       { text: "April 23, 2021" },
  //     ],
  //   },
  //   {
  //     rowProps: { onClick },
  //     rowInfo: [
  //       { text: "01" },
  //       { text: "Sayo oil and gas" },
  //       {
  //         text: "Submitted",
  //         cellProps: {
  //           className: cn(cellClassName, "[&_span]:bg-primary/20 [&_span]:text-primary"),
  //         },
  //       },
  //       { text: "$200" },
  //       { text: "April 23, 2021" },
  //     ],
  //   },
  //   {
  //     rowProps: { onClick },
  //     rowInfo: [
  //       { text: "01" },
  //       { text: "Sayo oil and gas" },
  //       {
  //         text: "Submitted",
  //         cellProps: {
  //           className: cn(cellClassName, "[&_span]:bg-primary/20 [&_span]:text-primary"),
  //         },
  //       },
  //       { text: "$200" },
  //       { text: "April 23, 2021" },
  //     ],
  //   },
  // ];

  return {
    tableHeaders,
    tableBody,
  };
};
