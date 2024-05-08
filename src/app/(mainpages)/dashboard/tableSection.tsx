"use client";

import GeneralTable from "@/components/tables/generalTable";
import React, { useState } from "react";
import { useTableActions } from "./tableActions";

const TableSection = () => {
  const [openAssign, setOpenAssign] = useState(false);
  const [openUnAssign, setOpenUnAssign] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [selectedRequests, setSelectedRequests] = useState<string[]>([]);
  const [partnerId, setPartnerId] = useState("");

  const itemsPerPage = 10;

  const {
    tableHeaders,
    tableBody,
    totalRequests,
    handleSearchChange,
    handleSearchSubmit,
    unAssignRequestMutation,
    requestsLoading,
  } = useTableActions({
    setOpenAssign,
    setSelectedRequests,
    setOpenInfo,
    setOpenUnAssign,
    itemsPerPage,
    setPartnerId,
  });

  return (
    <>
      <GeneralTable
        tableHeaders={tableHeaders}
        tableBody={tableBody}
        tableNav={serviceTableNav}
        itemsLength={totalRequests}
        itemsPerPage={itemsPerPage}
        onRowSelect={(selected) => setSelectedRequests(selected)}
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit}
        dataLoading={requestsLoading}
      />
    </>
  );
};

export default TableSection;

const serviceTableNav = [
  {
    name: "status",
    value: "all",
    text: "All",
  },
  {
    name: "status",
    value: "completed",
    text: "Completed",
  },
  {
    name: "status",
    value: "submitted",
    text: "Submitted",
  },
  {
    name: "status",
    value: "in progress",
    text: "In Progress",
  },
  {
    name: "status",
    value: "in draft",
    text: "Draft",
  },
];
