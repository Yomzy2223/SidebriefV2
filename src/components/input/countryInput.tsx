"use client";

import { CountryCard } from "@/components/cards/countrycard";
import { useState } from "react";

export default function CountryInput({
	id,
	question,
	value,
	setValue,
}: {
	id: string;
	question: string;
	value: string;
	setValue: (value: string) => void;
}) {
	// const [selectedCountry, setSelectedCountry] = useState<string>("");

	return (
		<div className="flex flex-col gap-4">
			<p>{question}</p>
			<div className="flex flex-wrap gap-3">
				{mockCountries.map((country, i) => (
					<CountryCard
						name={country.name}
						code={country.code}
						key={i}
						active={value === country.name}
						select={() => setValue(country.name)}
					/>
				))}
			</div>
		</div>
	);
}

const mockCountries = [
	{ name: "Nigeria", code: "ng" },
	{ name: "Ghana", code: "gh" },
	{ name: "Senegal", code: "sn" },
	{ name: "Kenya", code: "ke" },
	{ name: "Uganda", code: "ug" },
	{ name: "Delaware", code: "us" },
];
