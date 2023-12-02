"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button, TextInput, Badge } from "@/components/flowbite";
import { ArrowRight, SwatchBook } from "@/assets/icons";
import { CountryCard } from "@/components/cards/countrycard";

const formSchema = z.object({
	name: z.string().min(1),
	objectives: z.array(z.string()).length(4),
	country: z.string().min(1),
});

export const LaunchForm1 = () => {
	return (
		<form className="flex flex-col gap-20 items-start">
			<div className="flex flex-col gap-2">
				<p className="text-sm font-medium leading-normal">
					To register your business, you must give your business a
					unique name, type it in the space here.
				</p>
				<TextInput placeholder="Enter your business name here" />
			</div>
			<div className="flex flex-col gap-2">
				<p className="text-sm font-medium leading-normal">
					We will need your business objectives to successfully
					register your business (4).
				</p>
				<TextInput placeholder="To make business legalities easy" />
				<div className="flex flex-wrap gap-2.5">
					<Badge color={"green"} icon={SwatchBook}>
						Business certification
					</Badge>
					<Badge color={"magenta"} icon={SwatchBook}>
						Change of director name
					</Badge>
					<Badge color={"green"} icon={SwatchBook}>
						Business certification
					</Badge>
					<Badge color={"yellow"} icon={SwatchBook}>
						Document verification
					</Badge>
				</div>
			</div>
			<div className="flex flex-col gap-4">
				<p>Lastly, in which country are you running your business.</p>
				<div className="flex flex-wrap gap-3">
					<CountryCard name="Nigeria" code="ng" active />
					<CountryCard name="Ghana" code="gh" />
					<CountryCard name="Senegal" code="sn" />
					<CountryCard name="Uganda" code="ug" />
					<CountryCard name="Kenya" code="ke" />
					<CountryCard name="Delaware" code="us" />
				</div>
			</div>
			<Button color="magenta" size={"lg"}>
				<div className="space-x-2 flex items-center">
					<p>Continue</p>
					<ArrowRight />
				</div>
			</Button>
		</form>
	);
};
