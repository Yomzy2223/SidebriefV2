"use client";

import { useGetBusinessRequest } from "@/services/business";
import MemberCard from "./MemberCard";
import { useGetRequestFormQA, useGetRequestQA } from "@/services/productQA";
import { MemberCardSkeleton } from "./memberSkeleton";
import { Tabs } from "flowbite-react";
import { NotFoundCard } from "@/components/cards/NotFoundCard";

export const Member = ({ businessId }: { businessId: string }) => {
  const getBusinessRequest = useGetBusinessRequest({ id: businessId });

  const businessRequest = getBusinessRequest.data?.data.data;

  const productRequestId = businessRequest?.productRequest[0]?.id;

  const getProductRequestQA = useGetRequestQA(productRequestId || "");

  const productRequestQA = getProductRequestQA.data?.data.data;
  ("");
  const persons = productRequestQA?.filter((el) => el.type === "person");

  const loading = getBusinessRequest.isLoading || getProductRequestQA.isLoading || !businessId;

  const proprietors: MemberType[] | undefined = persons?.map((el, i) => ({
    email: el.subForm[1].answer[0],
    name: el.subForm[0].answer[0],
    type: el.title,
    hasDocs: el.subForm.some((el) => el.fileName),
    initial: getInitials(el.subForm[0].answer[0]),
  }));

  return (
    <div className="flex flex-col gap-5 max-w-full">
      <p className="text-sm">{proprietors && `you have ${proprietors.length} proprietors`}</p>
      <div
        className="space-y-4 max-h-[400px] overflow-auto"
        // whileHover={{ overflow: "auto" }}
      >
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => <MemberCardSkeleton key={i} />)
        ) : (
          <RenderMembers members={proprietors || []} />
        )}
      </div>
    </div>
  );
};

const RenderMembers = ({ members }: { members: MemberType[] }) => {
  function getUniqueTypes(persons: MemberType[]): string[] {
    const typeSet = new Set<string>();
    for (const person of persons) {
      typeSet.add(person.type);
    }
    return Array.from(typeSet);
  }

  const memberTypes = getUniqueTypes(members);

  if (memberTypes.length > 1) {
    return (
      <Tabs style="underline">
        {memberTypes.map((type, i) => (
          <Tabs.Item active title={type} className="p-1" key={i}>
            {members?.filter((el) => el.type === type).length > 0 ? (
              members
                ?.filter((el) => el.type === type)
                .map((el, i) => <MemberCard key={i} info={el} />)
            ) : (
              <div className="grid place-items-center h-[400px] w-full">
                <NotFoundCard />
              </div>
            )}
          </Tabs.Item>
        ))}
      </Tabs>
    );
  } else {
    return (
      <>
        {members.length > 0 ? (
          members?.map((el, i) => <MemberCard key={i} info={el} />)
        ) : (
          <div className="grid place-items-center h-[400px] w-full">
            <NotFoundCard />
          </div>
        )}
      </>
    );
  }
};

type MemberType = {
  name: string;
  email: string;
  type: string;
  initial: string;
  hasDocs?: boolean;
};

function getInitials(name: string): string {
  if (!name) {
    return "";
  }

  const words = name.trim().split(/\s+/);

  let initials = "";

  for (let i = 0; i < 2 && i < words.length; i++) {
    const word = words[i];

    const initial = word.charAt(0).toUpperCase();

    initials += initial;
  }

  return initials;
}
