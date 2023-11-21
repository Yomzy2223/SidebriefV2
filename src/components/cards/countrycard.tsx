import Image from "next/image";
import axios from "axios";
import { cn } from "@/lib/utiils";

export const CountryCard = async ({
	name,
	active,
}: {
	name: string;
	active?: boolean;
}) => {
	const code_country: { [key: string]: string } = (
		await axios.get("https://flagcdn.com/en/codes.json")
	).data;

	let country_code = Object.entries(code_country).reduce(
		(acc: { [key: string]: string }, [key, value]) => {
			acc[value] = key;
			return acc;
		},
		{}
	);

	return (
		<div
			className={cn(
				"flex items-center gap-2 px-4 py-2 rounded-xl border-[1.5px]",
				{ "bg-sb-blue-light": active }
			)}
		>
			<div className="relative w-11 h-8 rounded-lg overflow-hidden outline-4 outline-black">
				<Image
					src={`https://flagcdn.com/w160/${country_code[name]}.png`}
					alt={name}
					fill
				/>
			</div>
			<p className="font-medium text-lg leading-snug">{name}</p>
		</div>
	);
};
