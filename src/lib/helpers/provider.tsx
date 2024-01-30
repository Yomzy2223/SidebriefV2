"use client";

import { customTheme } from "@/app/baseCustomTheme";
import { Flowbite } from "flowbite-react";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Create a client
const queryClient = new QueryClient();

const Providers = ({ children }: { children: ReactNode }) => {
	return (
		<SessionProvider>
			<QueryClientProvider client={queryClient}>
				<Flowbite theme={customTheme}>{children}</Flowbite>
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</SessionProvider>
	);
};

export default Providers;
