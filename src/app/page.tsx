import { Navbar } from "@/components/navbar";
import DashboardFirst from "./dashboard/FirstTimer";

export default function Home() {
	return (
		<div>
			<Navbar />
			<DashboardFirst />
		</div>
	);
}
