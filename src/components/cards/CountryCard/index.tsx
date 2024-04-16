import Image from "next/image";
import { countries, getCountryCode, getEmojiFlag, TCountryCode } from "countries-list";
import { cn } from "@/lib/utils";

export const CountryCard = ({
  name,
  active,
  onSelect,
}: {
  name: string;
  active?: boolean;
  onSelect: () => void;
}) => {
  const originalCountry =
    Object.keys(countries)
      .map((el: string) => countries[el as TCountryCode].name)
      .find((el) => el.toLowerCase() === name) || "";

  return (
    <div
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-xl border-[1.5px]",
        { "bg-sb-blue-light": active },
        { "cursor-pointer": onSelect }
      )}
      onClick={onSelect}
    >
      <span className="rounded-lg text-3xl leading-5">
        {getEmojiFlag(getCountryCode(originalCountry) as TCountryCode)}
      </span>
      <p className="font-medium text-lg leading-snug">{originalCountry}</p>
    </div>
  );
};
