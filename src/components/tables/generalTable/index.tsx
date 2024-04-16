"use client";

import QueryNav2 from "@/components/navbar/queryNav2";
import SearchComp from "@/components/search";
import { cn } from "@/lib/utils";
import { Table } from "flowbite-react";
import React, { HTMLAttributes } from "react";

const GeneralTable = ({ tableHeaders, tableBody, serviceTableNav, title }: IProps) => {
  return (
    <div className="max-w-full overflow-auto">
      <div className="flex justify-between gap-6 sticky left-0">
        <div>
          <p className="sb-text-24 font-semibold mb-3">{title || "Recent services"}</p>
          <div className="flex flex-col gap-3 text-sm font-normal mb-6 md:gap-4 md:flex-row md:items-center">
            <span>Show only:</span>
            <QueryNav2 queryNav={serviceTableNav} />
          </div>
        </div>
        <SearchComp onSubmit={() => console.log("searching...")} />
      </div>

      <Table hoverable striped>
        <Table.Head>
          {tableHeaders.map((el) => (
            <Table.HeadCell key={el}>{el}</Table.HeadCell>
          ))}
        </Table.Head>

        <Table.Body>
          {tableBody.map((row, i) => (
            <Table.Row
              key={i}
              {...row.rowProps}
              className={cn({ "cursor-pointer": row.rowProps?.onClick })}
            >
              {row.rowInfo.map((cell) => (
                <Table.Cell
                  key={cell.text}
                  {...cell.cellProps}
                  className={cn("whitespace-nowrap", cell.cellProps?.className)}
                >
                  <span>{cell.text}</span>
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default GeneralTable;

interface IProps {
  tableHeaders: string[];
  tableBody: {
    rowInfo: { text: string; cellProps?: HTMLAttributes<HTMLSpanElement> }[];
    rowProps?: HTMLAttributes<HTMLSpanElement>;
  }[];
  serviceTableNav: { name: string; value: string }[];
  title?: string;
}
