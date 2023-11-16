import Image from "next/image";
import { Button } from "@/components/ui";
import Link from "next/link";

export default function Home() {
	return (
		<div>
			<p>Hello world</p>
			<Button color="primary">Click me</Button>
			<Button color="magenta">Click me</Button>
			<Button color="ghost">Click me</Button>
			<Button outline color="magenta">
				Click me
			</Button>
		</div>
	);
}
