"use client";

import { useRouter } from "next/navigation";

interface LeavingPageActionsProps {
  fallbackHref: string;
}

export default function LeavingPageActions({
  fallbackHref,
}: LeavingPageActionsProps) {
  const router = useRouter();

  const handleStay = () => {
    if (window.history.length > 1) {
      router.back();
      return;
    }

    if (window.opener) {
      window.close();
      return;
    }

    router.push(fallbackHref);
  };

  return (
    <button
      type="button"
      onClick={handleStay}
      className="rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors duration-200 hover:bg-gray-100 hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:border-gray-700 dark:text-slate-200 dark:hover:bg-gray-900 dark:hover:text-white cursor-pointer"
    >
      Back
    </button>
  );
}
