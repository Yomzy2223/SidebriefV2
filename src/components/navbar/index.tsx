import { Header } from "./header";
import { Navigation } from "./navigation";

export const Navbar = () => {
	return (
		<div className="mx-4 md:mx-8">
			<Header />
			<Navigation />
		</div>
	);
};
