import React from "react";
import { ProfileIcon } from "@/assets/images";
import Image from "next/image";
import { Timer } from "@/assets/svg";

const Activity = () => {
  return (
    <div>
      {NotificationData.map((data, i) => (
        <div key={i} className="flex items-start gap-3 py-4">
          <Image src={data.icon} alt="" quality={100} className="object-contain shrink-0" />
          <div>
            <span className="font-normal text-foreground-5 sb-text-16">
              {data.message.split("{{name}}")[0]} <span className="font-semibold">{data.name}</span>
              {data.message.split("{{name}}")[1]}
            </span>
            <div className="flex items-center mt-1.5">
              <Image src={Timer} alt="" quality={100} width={12} height={12} />
              <p className="text-xs text-foreground-5 leading-none ml-1.5">{data.duration}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Activity;

const NotificationData = [
  {
    icon: ProfileIcon,
    name: "Oluwole Sayo",
    message: "New message from {{name}}: Hey, whats up? All set for the presentation? ",
    duration: "a moment ago",
  },

  {
    icon: ProfileIcon,
    name: "Oluwole Sayo",
    message: "{{name}} registered to become a partner.",
    duration: "a moment ago",
  },

  {
    icon: ProfileIcon,
    name: "Oluwole Sayo",
    message: "{{name}} registered to become a partner.",
    duration: "a moment ago",
  },

  {
    icon: ProfileIcon,
    name: "Oluwole Sayo",
    message: "New message from {{name}}: Hey, whats up? All set for the presentation? ",
    duration: "a moment ago",
  },
];
