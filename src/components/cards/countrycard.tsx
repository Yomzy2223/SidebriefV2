import Image from "next/image";
import { cn } from "@/lib/utils";

export const CountryCard = ({
  name,
  code,
  active,
}: {
  name: string;
  code: string;
  active?: boolean;
}) => {
  return (
    // const code_country: { [key: string]: string } = (
    // 	await axios.get("https://flagcdn.com/en/codes.json")
    // ).data;

    // let country_code = Object.entries(code_country).reduce(
    // 	(acc: { [key: string]: string }, [key, value]) => {
    // 		acc[value] = key;
    // 		return acc;
    // 	},
    // 	{}
    // );

    <div
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-xl border-[1.5px]",
        { "bg-sb-blue-light": active }
      )}
    >
      <div className="relative w-11 h-8 rounded-lg overflow-hidden outline-4 outline-black">
        <Image src={`https://flagcdn.com/w160/${code}.png`} alt={name} fill />
      </div>
      <p className="font-medium text-lg leading-snug">{name}</p>
    </div>
  );
};
