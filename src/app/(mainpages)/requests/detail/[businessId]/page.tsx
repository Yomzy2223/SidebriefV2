"use client";

import React, { useRef } from "react";
import { Header } from "../header";
import { Tabs, TabsRef } from "flowbite-react";
import { useSearchParams } from "next/navigation";
import { useGlobalFunctions } from "@/hooks/globalFunctions";
import { Forms } from "./forms";
import { Documents } from "./documents";
import { Members } from "./members";
import { EmptyPage } from "./empty";

const RequestDetails: React.FC = () => {
  const tabsRef = useRef<TabsRef>(null);

  const searchParams = useSearchParams();
  const { setQueriesWithPath } = useGlobalFunctions();

  const activeTab = parseInt(searchParams.get("activeTab") || "0");
  const setActiveTab = (active: number) => {
    setQueriesWithPath({ queries: [{ name: "activeTab", value: active?.toString() }] });
  };

  return (
    <div>
      <Tabs
        aria-label="Form tabs"
        style="underline"
        ref={tabsRef}
        onActiveTabChange={(tabs) => setActiveTab(tabs)}
      >
        {tabElements.map((el, i) => {
          return (
            <Tabs.Item key={el.id} active={i === activeTab} title={el.title}>
              {el.content}
            </Tabs.Item>
          );
        })}
      </Tabs>
    </div>
  );
};

export default RequestDetails;

const tabElements: { id: number; title: string; content: React.ReactNode }[] = [
  {
    id: 1,
    title: "Forms",
    content: <Forms />,
  },
  {
    id: 2,
    title: "Members",
    content: <Members />,
  },
  {
    id: 3,
    title: "Documents",
    content: <Documents />,
  },
];
