import { Rocket } from "@/assets/images";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import slugify from "slugify";

const HandpickedSection = () => {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="sb-text-24 font-semibold">Handpicked for you</p>
        <p className="text-sm text-foreground-3 font-normal lg:sb-text-18">
          Here are suggested services you can start with
        </p>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-x-0.5 gap-y-6 p-1 rounded-2xl md:grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
        {services?.map((service, i) => (
          <li
            key={service.id}
            className="rounded-2xl bg-white p-3 list-none max-w-[400px] shadow-lg shadow-[rgba(42,42,42,0.04)] md:p-8"
          >
            <Link href={`/request/${slugify(service.name?.toLowerCase())}`}>
              <div
                className={cn(
                  "flex items-center justify-center h-8 w-8 rounded-full",
                  colors[i % 3]
                )}
              >
                <Image src={Rocket} alt="" className="object-contain" />
              </div>
              <h3 className="mt-6 font-semibold text-gray-900">{service.name}</h3>
              <p className="mt-2 text-gray-700">{service.description}</p>
            </Link>
          </li>
        ))}
      </div>
    </div>
  );
};

export default HandpickedSection;

const services = [
  {
    id: "dksj",
    name: "Launch",
    description:
      "dskaf dklsfj lfkad flkdf jasldkfj sdalkf dsl;kf as;lf alkf lkdf adlkfdf l;kf dlskf lkf dflk fkdsf salkdfa jf;lksdafj",
  },
  {
    id: "dksj",
    name: "Manage",
    description:
      "dskaf dklsfj lfkad flkdf jasldkfj sdalkf dsl;kf as;lf alkf lkdf adlkfdf l;kf dlskf lkf dflk fkdsf salkdfa jf;lksdafj",
  },
  {
    id: "dksj",
    name: "Tax",
    description:
      "dskaf dklsfj lfkad flkdf jasldkfj sdalkf dsl;kf as;lf alkf lkdf adlkfdf l;kf dlskf lkf dflk fkdsf salkdfa jf;lksdafj",
  },
  {
    id: "dksj",
    name: "Tax",
    description:
      "dskaf dklsfj lfkad flkdf jasldkfj sdalkf dsl;kf as;lf alkf lkdf adlkfdf l;kf dlskf lkf dflk fkdsf salkdfa jf;lksdafj",
  },
  {
    id: "dksj",
    name: "Tax",
    description:
      "dskaf dklsfj lfkad flkdf jasldkfj sdalkf dsl;kf as;lf alkf lkdf adlkfdf l;kf dlskf lkf dflk fkdsf salkdfa jf;lksdafj",
  },
];

const colors = ["bg-[#fbffd1a3]", "bg-[#37343414]", "bg-[#21fbfc14]"];
