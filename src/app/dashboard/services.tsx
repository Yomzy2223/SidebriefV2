"use client";

import { useGetServices } from "@/services/service";
import { ServiceLoadingSkeleton } from "./serviceSkeletonLoader";
import { Rocket } from "@/assets/images";
import Image from "next/image";
import Link from "next/link";
import slugify from "slugify";

export const Services = () => {
	const { data, isLoading } = useGetServices();

	const services = data?.data.data;

	return (
		<div className="max-w-12xl">
			<ul
				role="list"
				className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 text-sm sm:mt-20 sm:grid-cols-2 md:gap-y-10 lg:max-w-none lg:grid-cols-3"
			>
				{isLoading ? (
					<>
						{[1, 2, 3]?.map((number) => (
							<ServiceLoadingSkeleton key={number} />
						))}
					</>
				) : (
					<>
						{services?.map((service) => (
							<Link
								href={`/dashboard/${slugify(service.name)}`}
								key={service.id}
							>
								<li className="rounded-2xl border border-gray-200 p-8">
									<div className="flex items-center justify-between">
										<Image
											src={Rocket}
											alt=""
											className="h-8 w-8"
										/>
										{/* <h4 className="text-primary">
											See process details
										</h4> */}
									</div>
									<h3 className="mt-6 font-semibold text-gray-900">
										{service.name}
									</h3>
									<p className="mt-2 text-gray-700">
										{service.description}
									</p>
								</li>
							</Link>
						))}
					</>
				)}
			</ul>
		</div>
	);
};
