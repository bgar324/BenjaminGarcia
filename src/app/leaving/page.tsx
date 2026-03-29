import type { Metadata } from "next";
import PageReveal from "../components/PageReveal";
import LeavingPageActions from "../components/LeavingPageActions";

export const metadata: Metadata = {
  title: "Leaving Benjamin Garcia",
  description: "External link confirmation for bentgarcia.com.",
  robots: {
    index: false,
    follow: false,
  },
};

type LeavingPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function getSingleValue(value: string | string[] | undefined) {
  if (Array.isArray(value)) {
    return value[0] ?? null;
  }

  return value ?? null;
}

function parseExternalUrl(rawValue: string | null) {
  if (!rawValue) {
    return null;
  }

  try {
    const url = new URL(rawValue);
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return null;
    }
    return url;
  } catch {
    return null;
  }
}

function getSafeReturnPath(rawValue: string | null) {
  if (!rawValue || !rawValue.startsWith("/") || rawValue.startsWith("//")) {
    return "/";
  }

  return rawValue;
}

export default async function LeavingPage({ searchParams }: LeavingPageProps) {
  const params = await searchParams;
  const destination = parseExternalUrl(getSingleValue(params.to));
  const returnPath = getSafeReturnPath(getSingleValue(params.from));

  return (
    <main className="h-dvh overflow-hidden px-5 py-6 sm:px-6 md:px-20 md:py-10 lg:px-8">
      <PageReveal className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-5xl items-center">
        <div className="grid w-full items-stretch gap-12 lg:grid-cols-[0.78fr_1.22fr]">
          <section
            aria-hidden="true"
            className="relative hidden overflow-hidden lg:block"
          >
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center select-none -translate-y-4">
              <span className="text-[20rem] font-bold leading-[0.8] tracking-tighter text-black opacity-[0.04] dark:text-white dark:opacity-[0.06] xl:text-[24rem] pr-4">
                bg
              </span>
            </div>
          </section>

          <section className="p-6 transition-colors duration-300 md:p-8">
            {destination ? (
              <div className="flex h-full flex-col gap-6">
                <div>
                  <h2 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-slate-100 md:text-4xl">
                    Continue to this external website?
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-slate-400">
                    This page is outside bentgarcia.com. Its content, opinions,
                    products, services, privacy practices, security, and
                    availability are controlled by the destination. The views,
                    ideas, and claims presented on the destination site do not
                    necessarily reflect or represent Benjamin Garcia.
                  </p>
                </div>

                <div className="grid gap-3 text-sm leading-relaxed text-gray-600 dark:text-slate-400">
                  <p>
                    Click &ldquo;Continue&rdquo; to acknowledge the above and
                    leave bentgarcia.com. If you don&apos;t want to leave
                    bentgarcia.com, simply click &ldquo;Back.&rdquo;
                  </p>
                </div>

                <div className="mt-auto flex flex-col gap-4">
                  <p className="break-all text-sm leading-relaxed text-gray-900 dark:text-slate-100">
                    <span className="font-bold">Destination: </span>
                    {destination.toString()}
                  </p>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <a
                      href={destination.toString()}
                      data-bypass-external-interstitial
                      rel="noopener noreferrer nofollow"
                      className="inline-flex items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-black/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:bg-slate-100 dark:text-gray-950 dark:hover:bg-white"
                    >
                      Continue
                    </a>
                    <LeavingPageActions fallbackHref={returnPath} />
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-full flex-col justify-between gap-6">
                <div>
                  <h2 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-slate-100 md:text-4xl">
                    This destination link is invalid or unsupported.
                  </h2>
                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-gray-600 dark:text-slate-400 md:text-base">
                    Only standard `http` and `https` links can pass through this
                    confirmation page.
                  </p>
                </div>

                <div className="mt-auto">
                  <LeavingPageActions fallbackHref={returnPath} />
                </div>
              </div>
            )}
          </section>
        </div>
      </PageReveal>
    </main>
  );
}
