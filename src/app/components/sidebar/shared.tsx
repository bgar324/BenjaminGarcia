"use client";

import type { ReactNode } from "react";
import { ArrowUpRight, GitGraph, Mail } from "lucide-react";
import { GitHubMarkIcon, LinkedInIcon } from "../../svgs/Icons";

export const profileImage = {
  src: "/static/me.jpg",
  alt: "Benjamin Garcia",
  width: 698,
  height: 800,
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
    icon: <GitGraph size={18} />,
    label: "GitProof",
    href: "https://gitproof.dev/u/bgar324",
  },
];

export function ResumeLinkLabel() {
  return (
    <>
      View My Résumé
      <ArrowUpRight
        size={14}
        className="transform transition-transform duration-300 group-hover:translate-x-[1px]"
      />
    </>
  );
}
