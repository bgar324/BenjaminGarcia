import Link from "next/link";
import { House } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-x-hidden bg-white px-6 text-center dark:bg-black">
      <div className="relative z-10 flex w-full max-w-screen-md flex-col items-center overflow-visible">
        <div
          aria-hidden="true"
          className="flex max-w-full select-none items-center justify-center overflow-visible"
          style={{ fontSize: "clamp(7rem, min(20vh, 27vw), 18rem)" }}
        >
          <h1 className="block whitespace-nowrap text-[1em] leading-[1.04] font-extrabold text-black dark:text-white">
            404
          </h1>
        </div>

        <p className="max-w-xl text-base text-gray-700 dark:text-gray-300 sm:text-lg">
          The page you are looking for has been moved or doesn&apos;t exist.
        </p>

        <Link
          href="/"
          aria-label="Go back home"
          className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-gray-700 transition-colors duration-300 hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:border-gray-800 dark:text-gray-300 dark:hover:bg-gray-950"
        >
          <House size={16} />
        </Link>
      </div>
    </main>
  );
}
