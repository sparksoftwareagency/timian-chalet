"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef } from "react";

import { localizeHref, type SiteLocale } from "@/app/lib/locale";
import { colors } from "@/app/theme/colors";
import { pageGutterX, pageShell } from "@/app/theme/pageShell";
import type { HomePageData } from "@/sanity/lib/queries";
import SanityImage from "@/app/components/SanityImage";

import Hero from "./Hero";
import LoadingState from "./LoadingState";

function useRevealOnScroll() {
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          } else {
            entry.target.classList.remove("revealed");
          }
        });
      },
      { threshold: 0.15 }
    );

    refs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const addRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      refs.current[index] = el;
    },
    []
  );

  return addRef;
}

function SectionLink({ href, label, color }: { href: string; label: string; color: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] font-medium group mt-6 transition-opacity hover:opacity-80"
      style={{ color }}
    >
      {label}
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-transform group-hover:translate-x-1"
      >
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </Link>
  );
}

function SectionDivider({
  image,
  bgTop,
  bgBottom,
}: {
  image: { url: string; alt: string; image?: unknown };
  bgTop: string;
  bgBottom: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("divider-revealed");
        } else {
          el.classList.remove("divider-revealed");
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="relative h-32 sm:h-40 md:h-48 overflow-visible"
      style={{
        background: `linear-gradient(to bottom, ${bgTop} 50%, ${bgBottom} 50%)`,
      }}
    >
      <div
        ref={containerRef}
        className="absolute top-1/2 -translate-y-1/2 right-6 sm:right-8 lg:right-10"
      >
        <div className="relative mr-16 w-36 h-24 sm:w-48 sm:h-32 md:w-56 md:h-36 rounded-lg overflow-hidden shadow-lg">
          <SanityImage
            data-theme="dark"
            image={image}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 144px, (max-width: 768px) 192px, 224px"
          />
          <div className="divider-veil absolute inset-0 rounded-lg" style={{ backgroundColor: bgTop }} />
        </div>
      </div>
    </div>
  );
}

export default function ClientPage({
  locale,
  data,
  loadingBrand,
  loadingText,
}: {
  locale: SiteLocale;
  data: HomePageData;
  loadingBrand: string;
  loadingText: string;
}) {
  const addRef = useRevealOnScroll();
  const welcomeDividerImages = data.welcomeDividerImages.filter((image) => image?.url);
  const roomsBreakImages = data.roomsBreakImages.filter((image) => image?.url);

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="w-full">
      <style>{`
        .reveal-section {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        .reveal-section.revealed {
          opacity: 1;
          transform: translateY(0);
        }
        .reveal-section-delay {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s;
        }
        .reveal-section.revealed .reveal-section-delay {
          opacity: 1;
          transform: translateY(0);
        }
        .divider-veil {
          transform-origin: top center;
          transition: transform 0.9s cubic-bezier(0.4, 0, 0.2, 1);
          transform: scaleY(1);
        }
        .divider-revealed .divider-veil {
          transform: scaleY(0);
          transform-origin: bottom center;
        }
      `}</style>

      <LoadingState brand={loadingBrand} text={loadingText} />
      <section data-theme="dark">
        <Hero data={data} />
      </section>

      <section
        data-theme="light"
        className="w-full"
        style={{ backgroundColor: colors.primaryBg }}
      >
        <div
          ref={addRef(0)}
          className={`reveal-section ${pageShell} py-20 sm:py-28 lg:py-32`}
        >
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
            <div className="w-full lg:w-[35%] min-w-0 flex flex-col items-center text-center">
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal tracking-tight mb-3"
                style={{ color: colors.accent }}
              >
                {data.welcomeTitle}
              </h2>
              <div className="w-16 h-0.5 mb-8 mx-auto shrink-0" style={{ backgroundColor: colors.cta }} />
              <div className="space-y-5 max-w-2xl">
                {data.welcomeParagraphs.map((paragraph) => (
                  <p key={paragraph} className="text-base sm:text-lg leading-relaxed" style={{ color: colors.textSecondary }}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <div className="w-full lg:w-[65%] min-w-0 flex justify-center">
              <div className="relative w-full aspect-[3/4] max-h-[600px] rounded-lg overflow-hidden shadow-xl">
                <SanityImage
                  data-theme="dark"
                  image={data.welcomeImage}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {welcomeDividerImages.length > 0 ? (
        <section data-theme="light" style={{ backgroundColor: colors.primaryBg }}>
          <div className="w-full pb-8 sm:pb-12">
            <div className="grid grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
              {welcomeDividerImages.map((image, index) => (
                <div key={`${image.url}-${index}`} className="relative aspect-[3/4] w-full overflow-hidden">
                  <SanityImage data-theme="dark" image={image} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section
        data-theme="light"
        className={`py-16 ${pageGutterX}`}
        style={{
          background: `linear-gradient(to bottom, ${colors.primaryBg}, ${colors.secondaryBg})`,
        }}
      >
        <div
          ref={addRef(1)}
          className="reveal-section max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 place-items-center"
        >
          {data.stats.map((stat) => (
            <div key={`${stat.value}-${stat.label}`} className="text-center">
              <div
                className="w-14 h-14 mx-auto mb-4 border-2 flex items-center justify-center"
                style={{ borderColor: colors.cta }}
              >
                <div className="w-10 h-10 border" style={{ borderColor: colors.cta }} />
              </div>
              <div className="text-3xl sm:text-4xl font-light mb-2" style={{ color: colors.accent }}>
                {stat.value}
              </div>
              <div className="text-xs font-medium uppercase tracking-widest" style={{ color: colors.textSecondary }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {data.eventPromo?.enabled ? (
        <section data-theme="dark" style={{ backgroundColor: colors.accent }}>
          <div
            ref={addRef(7)}
            className={`reveal-section ${pageShell} py-20 sm:py-24`}
          >
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
              {data.eventPromo.image?.url ? (
                <div className="w-full lg:w-[40%] min-w-0 flex justify-center">
                  <div className="relative w-full max-w-xs aspect-[1414/2000] rounded-2xl overflow-hidden shadow-2xl">
                    <SanityImage
                      image={data.eventPromo.image}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 80vw, 40vw"
                    />
                  </div>
                </div>
              ) : null}

              <div className="flex-1 min-w-0 reveal-section-delay flex flex-col items-center text-center lg:items-start lg:text-left">
                {data.eventPromo.eyebrow ? (
                  <span
                    className="block text-xs uppercase tracking-[0.3em] mb-4 font-medium"
                    style={{ color: colors.secondaryBg }}
                  >
                    {data.eventPromo.eyebrow}
                  </span>
                ) : null}
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif leading-tight text-white max-w-2xl">
                  {data.eventPromo.title}
                </h3>
                {data.eventPromo.dateLabel ? (
                  <span
                    className="mt-4 font-serif text-2xl sm:text-3xl"
                    style={{ color: colors.secondaryBg }}
                  >
                    {data.eventPromo.dateLabel}
                  </span>
                ) : null}
                <div className="w-12 h-[1px] my-6 shrink-0" style={{ backgroundColor: colors.cta }} />
                {data.eventPromo.description ? (
                  <p className="text-base sm:text-lg leading-relaxed text-white/80 max-w-2xl">
                    {data.eventPromo.description}
                  </p>
                ) : null}
                {data.eventPromo.link?.href ? (
                  <Link
                    href={localizeHref(locale, data.eventPromo.link.href)}
                    className="mt-8 inline-flex rounded-full px-8 py-3 text-sm font-semibold uppercase tracking-[0.15em] transition-opacity hover:opacity-90"
                    style={{ backgroundColor: colors.cta, color: "#FFFFFF" }}
                    {...(data.eventPromo.link.openInNewTab
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {data.eventPromo.link.label}
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section data-theme="light" style={{ backgroundColor: colors.secondaryBg }}>
        <div
          ref={addRef(2)}
          className={`reveal-section ${pageShell} py-14 sm:py-16`}
        >
          <div className="flex flex-col-reverse lg:flex-row gap-12 lg:gap-16 items-center">
            <div className="flex-1 min-w-0 w-full lg:w-auto flex justify-center">
              <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
                <SanityImage
                  data-theme="dark"
                  image={data.hotelSection.image}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>

            <div className="flex-1 min-w-0 reveal-section-delay flex flex-col items-center text-center">
              <span
                className="block text-xs uppercase tracking-[0.3em] mb-4 font-medium"
                style={{ color: colors.cta }}
              >
                {data.hotelSection.eyebrow}
              </span>
              <h3
                className="text-3xl sm:text-4xl lg:text-5xl font-serif leading-tight mb-6 whitespace-pre-line max-w-2xl"
                style={{ color: colors.accent }}
              >
                {data.hotelSection.title}
              </h3>
              <div className="w-12 h-[1px] mb-6 shrink-0 mx-auto" style={{ backgroundColor: colors.cta }} />
              <p className="text-base sm:text-lg leading-relaxed mb-2 max-w-2xl" style={{ color: colors.textSecondary }}>
                {data.hotelSection.description}
              </p>
              <div className="flex w-full justify-center">
                <SectionLink
                  href={localizeHref(locale, data.hotelSection.link.href)}
                  label={data.hotelSection.link.label}
                  color={colors.cta}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section data-theme="light" style={{ backgroundColor: colors.secondaryBg }}>
        <div
          ref={addRef(5)}
          className={`reveal-section ${pageShell} py-20 sm:py-24`}
        >
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-10 xl:gap-14 items-center">
            <div className="w-full lg:w-[33%] lg:max-w-xl shrink-0 reveal-section-delay flex flex-col items-center text-center">
              <span
                className="block text-xs uppercase tracking-[0.3em] mb-4 font-medium"
                style={{ color: colors.cta }}
              >
                {data.experiencesBand.eyebrow}
              </span>
              <h3
                className="text-3xl sm:text-4xl lg:text-5xl font-serif leading-tight mb-6 max-w-2xl"
                style={{ color: colors.accent }}
              >
                {data.experiencesBand.title.replace(/\r?\n+/g, " ").replace(/\s+/g, " ").trim()}
              </h3>
              <div className="w-12 h-[1px] mb-6 shrink-0" style={{ backgroundColor: colors.cta }} />
              <p className="text-base sm:text-lg leading-relaxed max-w-2xl" style={{ color: colors.textSecondary }}>
                {data.experiencesBand.description}
              </p>
            </div>

            <div className="w-full min-w-0 flex-1 grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-5 xl:gap-7">
              {data.experiencesBand.cards.map((card) => (
                <div key={card._key} className="flex flex-col h-full min-w-0 items-center text-center">
                  <div className="relative w-full aspect-[3/4] sm:aspect-[2/3] rounded-lg overflow-hidden shadow-lg">
                    <SanityImage
                      data-theme="dark"
                      image={card.image}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 34vw, 31vw"
                    />
                  </div>
                  <h4
                    className="text-lg sm:text-xl font-serif uppercase tracking-wide mt-5 mb-3"
                    style={{ color: colors.accent }}
                  >
                    {card.title}
                  </h4>
                  <p
                    className="text-sm sm:text-base leading-relaxed flex-1 max-w-sm"
                    style={{ color: colors.textSecondary }}
                  >
                    {card.description}
                  </p>
                  <Link
                    href={localizeHref(locale, card.link.href)}
                    className="mt-5 text-xs uppercase tracking-[0.25em] font-medium transition-opacity hover:opacity-70"
                    style={{ color: colors.accent }}
                    {...(card.link.openInNewTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {card.link.label}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SectionDivider
        image={data.roomsDividerImage}
        bgTop={colors.secondaryBg}
        bgBottom={colors.primaryBg}
      />

      <section data-theme="light" style={{ backgroundColor: colors.primaryBg }}>
        <div
          ref={addRef(3)}
          className={`reveal-section ${pageShell} py-20 sm:py-24`}
        >
          <div className="flex flex-col-reverse lg:flex-row-reverse gap-12 lg:gap-16 items-center">
            <div className="w-full lg:w-[35%] min-w-0 reveal-section-delay flex flex-col items-center text-center">
              <span
                className="block text-xs uppercase tracking-[0.3em] mb-4 font-medium"
                style={{ color: colors.cta }}
              >
                {data.roomsSection.eyebrow}
              </span>
              <h3
                className="text-3xl sm:text-4xl lg:text-5xl font-serif leading-tight mb-6 whitespace-pre-line max-w-2xl"
                style={{ color: colors.accent }}
              >
                {data.roomsSection.title}
              </h3>
              <div className="w-12 h-[1px] mb-6 shrink-0 mx-auto" style={{ backgroundColor: colors.cta }} />
              <p className="text-base sm:text-lg leading-relaxed mb-2 max-w-2xl" style={{ color: colors.textSecondary }}>
                {data.roomsSection.description}
              </p>
              <div className="flex w-full justify-center">
                <SectionLink
                  href={localizeHref(locale, data.roomsSection.link.href)}
                  label={data.roomsSection.link.label}
                  color={colors.cta}
                />
              </div>
            </div>

            <div className="w-full lg:w-[65%] min-w-0 flex justify-center">
              <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
                <SanityImage
                  data-theme="dark"
                  image={data.roomsSection.image}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {roomsBreakImages.length > 0 ? (
        <section data-theme="light" style={{ backgroundColor: colors.primaryBg }}>
          <div className="w-full pb-8 sm:pt-25 sm:pb-12">
            <div className="grid grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
              {roomsBreakImages.map((image, index) => (
                <div key={`${image.url}-${index}`} className="relative aspect-[3/4] w-full overflow-hidden">
                  <SanityImage data-theme="dark" image={image} fill className="object-cover" sizes="20vw" />
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section data-theme="light" style={{ backgroundColor: colors.primaryBg }}>
        <div
          ref={addRef(4)}
          className={`reveal-section ${pageShell} py-20 sm:py-24`}
        >
          <div className="flex flex-col-reverse lg:flex-row-reverse gap-12 lg:gap-16 items-center">
            <div className="flex-1 min-w-0 w-full lg:w-auto flex justify-center">
              <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                <SanityImage
                  data-theme="dark"
                  image={data.culinarySection.image}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>

            <div className="flex-1 min-w-0 reveal-section-delay flex flex-col items-center text-center">
              <span
                className="block text-xs uppercase tracking-[0.3em] mb-4 font-medium"
                style={{ color: colors.cta }}
              >
                {data.culinarySection.eyebrow}
              </span>
              <h3
                className="text-3xl sm:text-4xl lg:text-5xl font-serif leading-tight mb-6 whitespace-pre-line max-w-2xl"
                style={{ color: colors.accent }}
              >
                {data.culinarySection.title}
              </h3>
              <div className="w-12 h-[1px] mb-6 shrink-0 mx-auto" style={{ backgroundColor: colors.cta }} />
              <p
                className="text-base sm:text-lg leading-relaxed mb-2 max-w-2xl"
                style={{ color: colors.textSecondary }}
              >
                {data.culinarySection.description}
              </p>
              <div className="flex w-full justify-center">
                <SectionLink
                  href={localizeHref(locale, data.culinarySection.link.href)}
                  label={data.culinarySection.link.label}
                  color={colors.cta}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {data.wellnessSection ? (
        <section data-theme="light" style={{ backgroundColor: colors.primaryBg }}>
          <div
            ref={addRef(6)}
            className={`reveal-section ${pageShell} py-20 sm:py-24`}
          >
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
              <div className="flex-1 min-w-0 w-full lg:w-auto flex justify-center">
                <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                  <SanityImage
                    data-theme="dark"
                    image={data.wellnessSection.image}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>

              <div className="flex-1 min-w-0 reveal-section-delay flex flex-col items-center text-center">
                <span
                  className="block text-xs uppercase tracking-[0.3em] mb-4 font-medium"
                  style={{ color: colors.cta }}
                >
                  {data.wellnessSection.eyebrow}
                </span>
                <h3
                  className="text-3xl sm:text-4xl lg:text-5xl font-serif leading-tight mb-6 whitespace-pre-line max-w-2xl"
                  style={{ color: colors.accent }}
                >
                  {data.wellnessSection.title}
                </h3>
                <div className="w-12 h-[1px] mb-6 shrink-0 mx-auto" style={{ backgroundColor: colors.cta }} />
                <p
                  className="text-base sm:text-lg leading-relaxed mb-2 max-w-2xl"
                  style={{ color: colors.textSecondary }}
                >
                  {data.wellnessSection.description}
                </p>
                <div className="flex w-full justify-center">
                  <SectionLink
                    href={localizeHref(locale, data.wellnessSection.link.href)}
                    label={data.wellnessSection.link.label}
                    color={colors.cta}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}

    </main>
  );
}
