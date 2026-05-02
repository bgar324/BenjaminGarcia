"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Expand, MapPin } from "lucide-react";
import {
  profileImage,
  mapHref,
  ResumeLinkLabel,
  resumeHref,
  socialLinks,
  type SidebarSocialLink,
} from "./shared";
import { useTactilePress } from "../useTactilePress";

type SidebarDesktopProps = {
  onOpenImageModal: (triggerEl: HTMLButtonElement) => void;
};

function SocialLinkButton({ link }: { link: SidebarSocialLink }) {
  const press = useTactilePress();

  return (
    <motion.div
      initial={false}
      animate={
        press.shouldReduceMotion
          ? undefined
          : { scale: press.pressScale, y: press.pressY }
      }
      transition={press.pressTransition}
      style={{ transformOrigin: "center center" }}
    >
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        title={link.label}
        onPointerDown={press.onPressPointerDown}
        onPointerUp={press.onPressPointerUp}
        onPointerLeave={press.onPressPointerLeave}
        onPointerCancel={press.onPressPointerCancel}
        onKeyDown={press.onPressKeyDown}
        onKeyUp={press.onPressKeyUp}
        onBlur={press.onPressBlur}
        className="
          group/social
          flex items-center justify-center aspect-square rounded-md
          bg-gray-50 dark:bg-gray-950
          text-gray-600 dark:text-slate-400
          hover:bg-gray-100 dark:hover:bg-gray-900
          hover:text-black dark:hover:text-white
          transition-all duration-300 ease-in-out
          focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500
        "
      >
        {link.icon}
      </a>
    </motion.div>
  );
}

export default function SidebarDesktop({
  onOpenImageModal,
}: SidebarDesktopProps) {
  const resumePress = useTactilePress();

  return (
    <aside className="hidden lg:flex flex-col lg:w-[204px] lg:shrink-0 lg:gap-y-3 lg:sticky lg:top-10 h-fit">
      <div className="bg-white dark:bg-black rounded-xl shadow-md dark:shadow-lg p-2 transition-colors duration-300">
        <div className="relative group/img">
          <Image
            src={profileImage.src}
            alt={profileImage.alt}
            width={profileImage.width}
            height={profileImage.height}
            priority
            quality={85}
            placeholder="blur"
            blurDataURL={profileImage.blurDataURL}
            sizes="192px"
            className="h-auto w-full rounded-xl mb-2"
            style={{ height: "auto" }}
          />

          <button
            onClick={(event) => onOpenImageModal(event.currentTarget)}
            className="
              absolute top-2 right-2 p-1.5 rounded-md
              bg-black/40 backdrop-blur-sm
              text-white/80 hover:text-white hover:bg-black/60
              opacity-0 group-hover/img:opacity-100
              transition-all duration-300 ease-in-out
              cursor-pointer
              focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500
            "
            aria-label="Expand photo"
            title="Expand photo"
            type="button"
          >
            <Expand size={14} strokeWidth={2.5} />
          </button>
        </div>

        <div className="p-1">
          <p className="text-gray-900 dark:text-slate-100 text-2xl font-semibold tracking-tight leading-none">
            Hello, I&apos;m
          </p>

          <p className="text-gray-900 dark:text-slate-100 text-2xl font-semibold tracking-tight">
            Benjamin Garcia
          </p>

          <p className="text-gray-700 dark:text-slate-300 text-base leading-tight mt-2 font-normal">
            I turn code into meaningful creations.
          </p>

          <div className="flex flex-row gap-1 items-center mt-2">
            <MapPin size={16} className="text-gray-500 dark:text-slate-400" />

            <a
              className="text-sm text-gray-500 dark:text-slate-400 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 focus-visible:rounded-sm"
              href={mapHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              Los Angeles, California
            </a>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-black rounded-xl shadow-md dark:shadow-lg p-2 transition-colors duration-300">
        <div className="grid grid-cols-4 gap-2 mb-2">
          {socialLinks.map((link) => (
            <SocialLinkButton key={link.label} link={link} />
          ))}
        </div>

        <motion.div
          initial={false}
          animate={
            resumePress.shouldReduceMotion
              ? undefined
              : {
                  scale: resumePress.pressScale,
                  y: resumePress.pressY,
                }
          }
          transition={resumePress.pressTransition}
          style={{ transformOrigin: "center center" }}
        >
          <a
            className="
              group flex items-center justify-center gap-1
              bg-gray-50 dark:bg-gray-950
              text-gray-600 dark:text-slate-400
              hover:bg-gray-100 dark:hover:bg-gray-900
              hover:text-black dark:hover:text-white
              rounded-md px-4 py-2 text-sm font-semibold
              w-full text-center
              transition duration-300
              focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500
            "
            href={resumeHref}
            target="_blank"
            rel="noopener noreferrer"
            title="Resume"
            onPointerDown={resumePress.onPressPointerDown}
            onPointerUp={resumePress.onPressPointerUp}
            onPointerLeave={resumePress.onPressPointerLeave}
            onPointerCancel={resumePress.onPressPointerCancel}
            onKeyDown={resumePress.onPressKeyDown}
            onKeyUp={resumePress.onPressKeyUp}
            onBlur={resumePress.onPressBlur}
          >
            <ResumeLinkLabel />
          </a>
        </motion.div>
      </div>
    </aside>
  );
}