import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { isSiteLocale, SITE_LOCALES, type SiteLocale } from "@/app/lib/locale";
import { buildPageMetadata } from "@/app/lib/seo";
import { colors } from "@/app/theme/colors";
import { pageShell } from "@/app/theme/pageShell";
import {
  fetchEvent,
  fetchEventSlugs,
  fetchEventsPage,
  fetchSiteSettings,
} from "@/sanity/lib/queries";

export async function generateStaticParams() {
  const all = await Promise.all(
    SITE_LOCALES.map(async (lang) => {
      const slugs = await fetchEventSlugs(lang);
      return slugs.map((slug) => ({ lang, slug }));
    })
  );

  return all.flat();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isSiteLocale(lang)) return {};

  const [event, settings] = await Promise.all([
    fetchEvent(lang as SiteLocale, slug),
    fetchSiteSettings(lang as SiteLocale),
  ]);
  if (!event) return {};

  const title =
    event.seoTitle ?? `${event.title} — ${event.dateLabel} · Timian Chalet`;
  const description =
    event.seoDescription ?? event.tagline ?? settings?.siteDescription ?? "";

  return buildPageMetadata({
    locale: lang as SiteLocale,
    path: `/events/${slug}`,
    title,
    description,
    imageUrl: event.flyer?.url ?? settings?.ogImage?.url,
    imageAlt: event.flyer?.alt ?? `${event.title} flyer`,
    type: "article",
  });
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;

  if (!isSiteLocale(lang)) {
    notFound();
  }

  const [event, page] = await Promise.all([
    fetchEvent(lang as SiteLocale, slug),
    fetchEventsPage(lang as SiteLocale),
  ]);

  if (!event || !page) {
    notFound();
  }

  const telHref = `tel:${event.phone.replace(/\s+/g, "")}`;
  const mailHref = `mailto:${event.email}`;
  const eventsHref = `/${lang}/events`;

  return (
    <main className="w-full">
      {/* Hero */}
      <section
        data-theme="dark"
        className="relative flex min-h-screen items-center justify-center overflow-hidden pt-32 pb-20 md:pt-36"
        style={{ backgroundColor: colors.accent }}
      >
        <div className={`${pageShell} relative z-10`}>
          <div className="mx-auto max-w-3xl text-center text-white">
            <p
              className="text-xs font-medium uppercase tracking-[0.3em]"
              style={{ color: colors.secondaryBg }}
            >
              {event.eyebrow}
            </p>
            <h1 className="mt-6 font-serif text-5xl uppercase leading-[0.95] tracking-[0.08em] sm:text-7xl md:text-8xl">
              {event.title}
            </h1>

            <p className="mt-8 text-base font-light italic leading-relaxed text-white/85 sm:text-lg">
              {event.tagline}
            </p>

            <div className="mt-10 flex flex-col items-center gap-2">
              <span
                className="font-serif text-3xl sm:text-4xl"
                style={{ color: colors.secondaryBg }}
              >
                {event.dateLabel}
              </span>
              <span className="text-sm uppercase tracking-[0.2em] text-white/75">
                {event.location}
              </span>
            </div>

            <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href={telHref}
                className="w-full max-w-xs rounded-full px-7 py-3 text-sm font-semibold uppercase tracking-[0.15em] transition-opacity hover:opacity-90 sm:w-auto"
                style={{ backgroundColor: colors.cta, color: "#FFFFFF" }}
              >
                {page.callLabel}
              </a>
              <a
                href={mailHref}
                className="w-full max-w-xs rounded-full border px-7 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:bg-white hover:text-black sm:w-auto"
                style={{ borderColor: "rgba(255,255,255,0.7)" }}
              >
                {page.emailLabel}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Details + flyer */}
      <section style={{ backgroundColor: colors.primaryBg }}>
        <div className={`${pageShell} py-20 sm:py-28`}>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              {event.flyer?.url ? (
                <div className="relative mx-auto aspect-[1414/2000] w-full max-w-md overflow-hidden rounded-2xl shadow-2xl">
                  <Image
                    src={event.flyer.url}
                    alt={event.flyer.alt || `${event.title} flyer`}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 40vw, 90vw"
                    priority
                  />
                </div>
              ) : null}
            </div>

            <div className="lg:col-span-6">
              <h2
                className="font-serif text-3xl sm:text-4xl lg:text-5xl"
                style={{ color: colors.accent }}
              >
                {page.detailsTitle}
              </h2>

              <dl className="mt-10 space-y-8">
                <div>
                  <dt
                    className="text-xs font-medium uppercase tracking-[0.25em]"
                    style={{ color: colors.cta }}
                  >
                    {page.whenLabel}
                  </dt>
                  <dd className="mt-2 text-lg" style={{ color: colors.textPrimary }}>
                    {event.dateLabel}
                  </dd>
                </div>

                <div>
                  <dt
                    className="text-xs font-medium uppercase tracking-[0.25em]"
                    style={{ color: colors.cta }}
                  >
                    {page.whereLabel}
                  </dt>
                  <dd className="mt-2 text-lg" style={{ color: colors.textPrimary }}>
                    {event.location}
                  </dd>
                </div>

                <div>
                  <dt
                    className="text-xs font-medium uppercase tracking-[0.25em]"
                    style={{ color: colors.cta }}
                  >
                    {page.hostsLabel}
                  </dt>
                  <dd className="mt-2 space-y-1">
                    {event.hosts.map((host) => (
                      <span
                        key={host}
                        className="block text-lg"
                        style={{ color: colors.textPrimary }}
                      >
                        {host}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>

              <div
                className="mt-10 max-w-xl space-y-4 text-base leading-relaxed"
                style={{ color: colors.textSecondary }}
              >
                {event.descriptionParagraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section data-theme="dark" style={{ backgroundColor: colors.accent }}>
        <div className={`${pageShell} py-20 text-center sm:py-24`}>
          <h2 className="font-serif text-3xl text-white sm:text-4xl lg:text-5xl">
            {page.ctaTitle}
          </h2>
          <p className="mt-4 text-base text-white/80 sm:text-lg">
            {page.ctaSubtitle}
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href={telHref}
              className="w-full max-w-xs rounded-full px-7 py-3 text-sm font-semibold uppercase tracking-[0.15em] transition-opacity hover:opacity-90 sm:w-auto"
              style={{ backgroundColor: colors.cta, color: "#FFFFFF" }}
            >
              {event.phone}
            </a>
            <a
              href={mailHref}
              className="w-full max-w-xs rounded-full border px-7 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:bg-white hover:text-black sm:w-auto"
              style={{ borderColor: "rgba(255,255,255,0.7)" }}
            >
              {event.email}
            </a>
          </div>

          <div className="mt-12">
            <Link
              href={eventsHref}
              className="text-sm uppercase tracking-[0.2em] text-white/70 underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              {page.backToEventsLabel}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
