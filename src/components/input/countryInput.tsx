"use client";

import { CountryCard } from "@/components/cards/countrycard";
import { countryType } from "@/services/service/types";
import { SVGSkeleton, Skeleton } from "../ui/skeleton";

export default function CountryInput({
	id,
	question,
	value,
	setValue,
	loading,
	countries,
}: {
	id: string;
	question: string;
	value: string;
	setValue: (value: string) => void;
	loading: boolean;
	countries: countryType[];
}) {
	return (
		<div className="flex flex-col gap-4">
			<p>{question}</p>
			<div className="flex flex-wrap gap-3">
				{loading
					? Array(3)
							.fill("")
							.map((_, i) => <LoadingSkeleton key={i} />)
					: countries.map((country, i) => (
							<CountryCard
								name={country.name}
								code={country.iso}
								key={i}
								active={value === country.name}
								select={() => setValue(country.name)}
							/>
					  ))}
			</div>
		</div>
	);
}

const LoadingSkeleton = () => (
	<>
		<div className="flex items-center gap-2 px-4 py-2 border-[1.5px]">
			{/* <div className="relative w-8 h-8 grid place-items-center"> */}
			<SVGSkeleton className="w-5 h-5" />
			{/* </div> */}
			<p className="leading-snug">
				<Skeleton className="w-[56px] max-w-full" />
			</p>
		</div>
	</>
);
