import Link from "next/link";

export const Message = () => {
	return (
		<div className="w-full bg-red-200 h-12 flex items-center justify-center px-8">
			<p className="text-center font-medium leading-normal">
				There’s an issue on your business registration{" "}
				<b>(Agro Technology Limited)</b>, please{" "}
				<Link href={"/"} className="italic font-semibold text-red-700">
					click here
				</Link>{" "}
				to fix so that we can continue with your registration
			</p>
		</div>
	);
};
