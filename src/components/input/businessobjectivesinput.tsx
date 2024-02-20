"use client";

import { Label, TextInput, Badge } from "@/components/flowbite";
import { SwatchBook } from "@/assets/icons";
import { Combobox } from "./combobox";
import { X } from "lucide-react";

export default function BusinessObjectiveInput({
	id,
	question,
	placeholder,
	options,
	value,
	setValue,
	error,
}: {
	id: string;
	question?: string;
	placeholder?: string;
	options: string[];
	value: string[];
	setValue: (value: string[]) => void;
	error: string | undefined;
}) {
	// const [value, setValue] = useState<string[]>([]);

	const handleSelect = (selectedValue: string) => {
		if (!value.includes(selectedValue)) {
			setValue([...value, selectedValue]);
		}
	};

	const removeValue = (index: number) => {
		setValue(value.filter((_, i) => i !== index));
	};

	return (
		<div className="flex flex-col gap-2">
			{question && (
				<Label
					className="text-sm font-medium leading-normal"
					htmlFor={id}
				>
					{question}
				</Label>
			)}
			<Combobox
				placeholder={placeholder || ""}
				options={options}
				selectValue={handleSelect}
				error={error}
			/>
			{/* <TextInput placeholder={placeholder || ""} id={id} /> */}
			<div className="flex flex-wrap gap-2.5">
				{value.map((value, i) => (
					<Badge color={"green"} icon={SwatchBook} key={i}>
						<div className="flex gap-0.5 items-center">
							{value}
							<X
								className="h-3 cursor-pointer"
								onClick={() => removeValue(i)}
							/>
						</div>
					</Badge>
				))}
			</div>
		</div>
	);
}
