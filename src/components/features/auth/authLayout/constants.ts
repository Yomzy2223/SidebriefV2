import { Google, Yahoo } from "@/assets/social";
import { StaticImageData } from "next/image";

interface Isocial {
	name: string;
	text: string;
	loginText: string;
	icon: StaticImageData;
}

export const signUpSocial: Isocial[] = [
	{
		name: "google",
		text: "Sign up with Google",
		loginText: "Sign in with Google",
		icon: Google,
	},
	{
		name: "yahoo",
		text: "Sign up with Yahoo",
		loginText: "Sign in with Yahoo",
		icon: Yahoo,
	},
];
