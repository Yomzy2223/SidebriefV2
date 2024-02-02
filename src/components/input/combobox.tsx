"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/flowbite";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

export function Combobox({
	placeholder,
	id,
	options,
	selectValue,
}: {
	placeholder: string;
	id: string;
	options: string[];
	selectValue: (value: string) => void;
}) {
	const [open, setOpen] = React.useState(false);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					color="input"
					role="combobox"
					aria-expanded={open}
					className=""
				>
					{placeholder || "Select an option..."}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-max p-0 bg-white">
				<Command>
					<CommandInput placeholder="Search options..." />
					<CommandEmpty>No Option found.</CommandEmpty>
					<CommandGroup>
						{options.map((option, i) => (
							<CommandItem
								key={i}
								value={option}
								onSelect={(currentValue) => {
									selectValue(currentValue);
									setOpen(false);
								}}
							>
								{option}
							</CommandItem>
						))}
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
