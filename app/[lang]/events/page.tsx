import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { isSiteLocale, SITE_LOCALES, type SiteLocale } from "@/app/lib/locale";
import { buildPageMetadata } from "@/app/lib/seo";
import { colors } from "@/app/theme/colors";
import { pageShell } from "@/app/theme/pageShell";
import { fetchEvents, fetchEventsPage, fetchSiteSettings } from "@/sanity/lib/queries";

export function generateStaticParams() {
  return SITE_LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isSiteLocale(lang)) return {};

  const [page, settings] = await Promise.all([
    fetchEventsPage(lang as SiteLocale),
    fetchSiteSettings(lang as SiteLocale),
  ]);
  if (!page) return {};

  const title = page.seoTitle ?? `${page.heroTitle} — ${settings?.siteTitle ?? "Timian Chalet"}`;
  const description =
    page.seoDescription ?? page.heroSubtitle ?? settings?.siteDescription ?? "";

  return buildPageMetadata({
    locale: lang as SiteLocale,
    path: "/events",
    title,
    description,
    imageUrl: settings?.ogImage?.url,
    imageAlt: settings?.ogImage?.alt,
  });
}

export default async function EventsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!isSiteLocale(lang)) {
    notFound();
  }

  const [page, events] = await Promise.all([
    fetchEventsPage(lang as SiteLocale),
    fetchEvents(lang as SiteLocale),
  ]);

  if (!page) {
    notFound();
  }

  return (
    <main className="w-full">
      {/* Hero */}
      <section
        data-theme="dark"
        className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-24"
        style={{ backgroundColor: colors.accent }}
      >
        <div className={`${pageShell} relative z-10`}>
          <div className="mx-auto max-w-3xl text-center text-white">
            <p
              className="text-xs font-medium uppercase tracking-[0.3em]"
              style={{ color: colors.secondaryBg }}
            >
              {page.heroEyebrow}
            </p>
            <h1 className="mt-6 font-serif text-5xl uppercase leading-[0.95] tracking-[0.08em] sm:text-6xl md:text-7xl">
              {page.heroTitle}
            </h1>
            <p className="mt-8 text-base font-light italic leading-relaxed text-white/85 sm:text-lg">
              {page.heroSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Listing */}
      <section style={{ backgroundColor: colors.primaryBg }}>
        <div className={`${pageShell} py-20 sm:py-28`}>
          {events.length === 0 ? (
            <p
              className="mx-auto max-w-xl text-center text-lg"
              style={{ color: colors.textSecondary }}
            >
              {page.emptyStateText}
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <Link
                  key={event.slug}
                  href={`/${lang}/events/${event.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl shadow-lg transition-shadow hover:shadow-2xl"
                  style={{ backgroundColor: "#FFFFFF" }}
                >
                  {event.flyer?.url ? (
                    <div className="relative aspect-[1414/2000] w-full overflow-hidden">
                      <Image
                        src={event.flyer.url}
                        alt={event.flyer.alt || `${event.title} flyer`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                      />
                    </div>
                  ) : null}

                  <div className="flex flex-1 flex-col p-6">
                    <p
                      className="text-xs font-medium uppercase tracking-[0.25em]"
                      style={{ color: colors.cta }}
                    >
                      {event.eyebrow}
                    </p>
                    <h2
                      className="mt-3 font-serif text-2xl leading-tight"
                      style={{ color: colors.accent }}
                    >
                      {event.title}
                    </h2>
                    <p
                      className="mt-3 text-sm uppercase tracking-[0.15em]"
                      style={{ color: colors.textPrimary }}
                    >
                      {event.dateLabel}
                    </p>
                    <p
                      className="mt-1 text-sm"
                      style={{ color: colors.textSecondary }}
                    >
                      {event.location}
                    </p>

                    <span
                      className="mt-6 inline-flex items-center text-sm font-semibold uppercase tracking-[0.15em]"
                      style={{ color: colors.cta }}
                    >
                      {page.viewDetailsLabel}
                      <span
                        aria-hidden
                        className="ml-2 transition-transform group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
