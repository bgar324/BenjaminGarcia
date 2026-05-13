"use client";

import type { ReactNode } from "react";
import { ArrowUpRight, Mail } from "lucide-react";
import { GitHubMarkIcon, LinkedInIcon } from "../../svgs/Icons";

export const profileImage = {
  src: "/static/me.jpg",
  alt: "Benjamin Garcia",
  width: 4284,
  height: 5712,
  blurDataURL:
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAQAA4DASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAMEBf/EACQQAAEDAwMEAwAAAAAAAAAAAAECAwQABREhEjFBBhMiURQyYf/EABUBAQEAAAAAAAAAAAAAAAAAAAME/8QAGhEAAgMBAQAAAAAAAAAAAAAAAAECAxEhIv/aAAwDAQACEQMRAD8A3qKKKyNDBooooA//2Q==",
} as const;

export const mapHref =
  "https://www.google.com/maps/place/Westwood,+Los+Angeles,+CA/@34.0652211,-118.4610312,14z";

export const resumeHref = "/resume.pdf";

export type SidebarSocialLink = {
  href: string;
  icon: ReactNode;
  label: string;
};

function LogitIcon() {
  return (
    <span
      aria-hidden="true"
      className="block h-[18px] w-[18px] bg-current [mask:url('/static/logit/icon-light.png')_center/contain_no-repeat] [-webkit-mask:url('/static/logit/icon-light.png')_center/contain_no-repeat]"
    />
  );
}

export const socialLinks: SidebarSocialLink[] = [
  {
    icon: <Mail size={18} />,
    label: "Email",
    href: "mailto:bentgarcia05@gmail.com",
  },
  {
    icon: <LinkedInIcon />,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/btgarcia05/",
  },
  {
    icon: <GitHubMarkIcon />,
    label: "GitHub",
    href: "https://github.com/bgar324",
  },
  {
    icon: <LogitIcon />,
    label: "logit",
    href: "https://trylogit.me/u/ben",
  },
];

export function ResumeLinkLabel() {
  return (
    <>
      View My Résumé
      <ArrowUpRight
        size={14}
        className="transform transition-transform duration-300 group-hover:translate-x-[0.5px] group-hover:-translate-y-[0.5px]"
      />
    </>
  );
}
