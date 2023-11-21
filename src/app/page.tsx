import { Button } from "@/components/flowbite";
import { Navbar } from "@/components/navbar";
import { StepNavbar } from '@/components/StepNavbar'
export default function Home() {
	return (
		<div>
			<Navbar />
			{/* <p>Hello world</p>
			<Button color="sb-cyan-90">Click me</Button>
			<Button color="magenta">Click me</Button>
			<Button color="ghost">Click me</Button>
			<Button color="magenta">
				Click me
			</Button> */}
			
			<StepNavbar />
		</div>
	);
}
