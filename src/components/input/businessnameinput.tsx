"use client";

import { Label, TextInput, Badge } from "@/components/flowbite";
import { SwatchBook } from "@/assets/icons";
import { useState } from "react";
import { X } from "lucide-react";

export default function BusinessNameInput({
	id,
	question,
	placeholder,
	value,
	setValue,
}: {
	id: string;
	question: string;
	placeholder?: string;
	value: string[];
	setValue: (value: string[]) => void;
}) {
	const [inputValue, setInputValue] = useState("");

	const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			event.preventDefault();
			if (
				inputValue === "" ||
				value.length >= 4 ||
				value.includes(inputValue)
			)
				return;
			setValue([...value, inputValue]);
			setInputValue("");
		}
	};

	const removeValue = (index: number) => {
		setValue(value.filter((_, i) => i !== index));
	};

	return (
		<div className="flex flex-col gap-2">
			<Label className="text-sm font-medium leading-normal" htmlFor={id}>
				{question}
			</Label>
			<TextInput
				placeholder={placeholder || ""}
				id={id}
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
				onKeyDown={handleKeyPress}
			/>
			<div className="flex flex-wrap gap-2.5">
				{value.map((name, i) => (
					<Badge color={"green"} icon={SwatchBook} key={i}>
						<div className="flex gap-0.5 items-center">
							{name}
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
