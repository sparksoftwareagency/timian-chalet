"use client";

import { useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useT } from "../i18n/LanguageContext";
import { tr } from "../i18n/translations";
import { colors } from "../theme/colors";

function useRevealOnScroll() {
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
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

export default function AboutPage() {
  const t = useT();
  const addRef = useRevealOnScroll();

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
        .reveal-delay-2 {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease-out 0.4s, transform 0.8s ease-out 0.4s;
        }
        .reveal-section.revealed .reveal-delay-2 {
          opacity: 1;
          transform: translateY(0);
        }
        .parallax-image {
          transition: transform 0.1s linear;
        }
      `}</style>

      {/* ═══════════════════════════════════════════════════
          HERO — Full-screen winter drone shot
          ═══════════════════════════════════════════════════ */}
      <section data-theme="dark" className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/hotel/winter-drone.jpg"
            alt="Timian Chalet from above"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/45" />
        </div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <div className="mb-6">
            <div
              className="w-4 h-4 border-2 rotate-45 mx-auto"
              style={{ borderColor: colors.cta }}
            />
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[0.2em] text-white uppercase font-serif font-light">
            {t(tr.aboutPage.heroTitle)}
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-white/80 font-light max-w-2xl leading-relaxed">
            {t(tr.aboutPage.heroSubtitle)}
          </p>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
            <svg
              width="20"
              height="30"
              viewBox="0 0 20 30"
              fill="none"
              className="animate-bounceSlow opacity-60"
            >
              <rect x="1" y="1" width="18" height="28" rx="9" stroke="white" strokeWidth="1.5" />
              <circle cx="10" cy="10" r="2" fill="white" />
            </svg>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          ORIGIN — The goat farm story
          ═══════════════════════════════════════════════════ */}
      <section
        data-theme="light"
        className="w-full"
        style={{ backgroundColor: colors.primaryBg }}
      >
        <div
          ref={addRef(0)}
          className="reveal-section max-w-7xl mx-auto px-10 sm:px-12 lg:px-16 py-20 sm:py-28 lg:py-32"
        >
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span
              className="block text-xs uppercase tracking-[0.3em] mb-4 font-medium"
              style={{ color: colors.cta }}
            >
              {t(tr.aboutPage.originLabel)}
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal tracking-tight whitespace-pre-line"
              style={{ color: colors.accent }}
            >
              {t(tr.aboutPage.originTitle)}
            </h2>
            <div className="w-16 h-0.5 mx-auto mt-6" style={{ backgroundColor: colors.cta }} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-5 reveal-section-delay">
              <p
                className="text-base sm:text-lg leading-relaxed mb-6"
                style={{ color: colors.textSecondary }}
              >
                {t(tr.aboutPage.originPara1)}
              </p>
              <p
                className="text-base sm:text-lg leading-relaxed"
                style={{ color: colors.textSecondary }}
              >
                {t(tr.aboutPage.originPara2)}
              </p>
            </div>

            <div className="lg:col-span-7 reveal-delay-2">
              <div className="relative">
                <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
                  <Image
                    src="/hotel/sheep.jpg"
                    alt="Goat farm at the foot of the mountains"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 58vw"
                  />
                </div>
                <div className="absolute -bottom-8 -left-6 w-40 h-28 sm:w-52 sm:h-36 rounded-lg overflow-hidden shadow-lg hidden sm:block border-4"
                  style={{ borderColor: colors.primaryBg }}
                >
                  <Image
                    src="/hotel/sheep-2.jpg"
                    alt="Sheep grazing"
                    fill
                    className="object-cover"
                    sizes="208px"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          FULL-WIDTH IMAGE BREAK — Animals
          ═══════════════════════════════════════════════════ */}
      <section data-theme="light">
        <div className="relative w-full h-[40vh] sm:h-[50vh] md:h-[60vh] overflow-hidden">
          <Image
            src="/hotel/animals.jpg"
            alt="Farm animals at Timian Chalet"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to bottom, ${colors.primaryBg} 0%, transparent 15%, transparent 85%, ${colors.secondaryBg} 100%)`,
            }}
          />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          TRANSFORMATION — From farm to chalet
          ═══════════════════════════════════════════════════ */}
      <section
        data-theme="light"
        style={{ backgroundColor: colors.secondaryBg }}
      >
        <div
          ref={addRef(1)}
          className="reveal-section max-w-7xl mx-auto px-10 sm:px-12 lg:px-16 py-20 sm:py-28 lg:py-32"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-6 order-2 lg:order-1 reveal-section-delay">
              <div className="relative w-full aspect-[3/4] max-h-[550px] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/hotel/the_chalet.jpg"
                  alt="Timian Chalet building"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>

            <div className="lg:col-span-6 order-1 lg:order-2">
              <span
                className="block text-xs uppercase tracking-[0.3em] mb-4 font-medium"
                style={{ color: colors.cta }}
              >
                {t(tr.aboutPage.transformLabel)}
              </span>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal tracking-tight mb-6 whitespace-pre-line"
                style={{ color: colors.accent }}
              >
                {t(tr.aboutPage.transformTitle)}
              </h2>
              <div className="w-12 h-[1px] mb-8" style={{ backgroundColor: colors.cta }} />
              <p
                className="text-base sm:text-lg leading-relaxed mb-6"
                style={{ color: colors.textSecondary }}
              >
                {t(tr.aboutPage.transformPara1)}
              </p>
              <p
                className="text-base sm:text-lg leading-relaxed"
                style={{ color: colors.textSecondary }}
              >
                {t(tr.aboutPage.transformPara2)}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          QUOTE — Emotional centerpiece
          ═══════════════════════════════════════════════════ */}
      <section
        data-theme="dark"
        style={{ backgroundColor: colors.accent }}
      >
        <div
          ref={addRef(2)}
          className="reveal-section max-w-4xl mx-auto px-10 sm:px-12 lg:px-16 py-20 sm:py-28 text-center"
        >
          <div className="mb-8">
            <div
              className="w-4 h-4 border-2 rotate-45 mx-auto"
              style={{ borderColor: colors.cta }}
            />
          </div>
          <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-serif font-light text-white leading-snug italic">
            &ldquo;{t(tr.aboutPage.valuesQuote)}&rdquo;
          </blockquote>
          <div className="w-16 h-0.5 mx-auto mt-10" style={{ backgroundColor: colors.cta }} />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          FARM TO TABLE — Culinary roots
          ═══════════════════════════════════════════════════ */}
      <section
        data-theme="light"
        style={{ backgroundColor: colors.primaryBg }}
      >
        <div
          ref={addRef(3)}
          className="reveal-section max-w-7xl mx-auto px-10 sm:px-12 lg:px-16 py-20 sm:py-28 lg:py-32"
        >
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span
              className="block text-xs uppercase tracking-[0.3em] mb-4 font-medium"
              style={{ color: colors.cta }}
            >
              {t(tr.aboutPage.farmLabel)}
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal tracking-tight whitespace-pre-line"
              style={{ color: colors.accent }}
            >
              {t(tr.aboutPage.farmTitle)}
            </h2>
            <div className="w-16 h-0.5 mx-auto mt-6" style={{ backgroundColor: colors.cta }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-xl reveal-section-delay">
              <Image
                src="/hotel/cheese.jpg"
                alt="Artisanal cheese from our farm"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-xl reveal-delay-2">
              <Image
                src="/hotel/bread.jpg"
                alt="Fresh bread from our kitchen"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          <div className="max-w-3xl mx-auto">
            <p
              className="text-base sm:text-lg leading-relaxed mb-6 text-center"
              style={{ color: colors.textSecondary }}
            >
              {t(tr.aboutPage.farmPara1)}
            </p>
            <p
              className="text-base sm:text-lg leading-relaxed text-center"
              style={{ color: colors.textSecondary }}
            >
              {t(tr.aboutPage.farmPara2)}
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          THE ROOMS — Three floors, three worlds
          ═══════════════════════════════════════════════════ */}
      <section
        data-theme="light"
        style={{ backgroundColor: colors.secondaryBg }}
      >
        <div className="relative w-full h-[35vh] sm:h-[45vh] overflow-hidden">
          <Image
            src="/hotel/summer.jpg"
            alt="Timian Chalet in summer"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to bottom, ${colors.primaryBg} 0%, transparent 20%, transparent 70%, ${colors.secondaryBg} 100%)`,
            }}
          />
        </div>

        <div
          ref={addRef(4)}
          className="reveal-section max-w-7xl mx-auto px-10 sm:px-12 lg:px-16 py-20 sm:py-28 lg:py-32"
        >
          <div className="text-center max-w-3xl mx-auto mb-6">
            <span
              className="block text-xs uppercase tracking-[0.3em] mb-4 font-medium"
              style={{ color: colors.cta }}
            >
              {t(tr.aboutPage.roomsLabel)}
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal tracking-tight whitespace-pre-line"
              style={{ color: colors.accent }}
            >
              {t(tr.aboutPage.roomsTitle)}
            </h2>
            <div className="w-16 h-0.5 mx-auto mt-6 mb-8" style={{ backgroundColor: colors.cta }} />
            <p
              className="text-base sm:text-lg leading-relaxed"
              style={{ color: colors.textSecondary }}
            >
              {t(tr.aboutPage.roomsIntro)}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {[
              {
                title: tr.aboutPage.floorGround,
                desc: tr.aboutPage.floorGroundDesc,
                icon: (
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke={colors.cta} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 28c4-3 8-6 12-6s8 3 12 6" />
                    <path d="M10 22c2-8 6-10 6-10s4 2 6 10" />
                    <circle cx="16" cy="8" r="3" />
                  </svg>
                ),
              },
              {
                title: tr.aboutPage.floorFirst,
                desc: tr.aboutPage.floorFirstDesc,
                icon: (
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke={colors.cta} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 28V12" />
                    <path d="M16 12c-3-2-7-1-9 2" />
                    <path d="M16 16c3-2 7-1 9 2" />
                    <path d="M16 8c-2-1.5-5-1-7 1.5" />
                    <path d="M16 20c-3-2-7-1-9 2" />
                  </svg>
                ),
              },
              {
                title: tr.aboutPage.floorSecond,
                desc: tr.aboutPage.floorSecondDesc,
                icon: (
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke={colors.cta} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 28l12-20 12 20H4z" />
                    <path d="M10 28l6-10 6 10" />
                    <circle cx="16" cy="6" r="2" />
                  </svg>
                ),
              },
            ].map((floor, i) => (
              <div
                key={i}
                className="text-center p-8 rounded-lg reveal-section-delay"
                style={{
                  backgroundColor: colors.primaryBg,
                  transitionDelay: `${0.15 * i}s`,
                }}
              >
                <div className="flex justify-center mb-6">{floor.icon}</div>
                <h3
                  className="text-lg sm:text-xl font-serif mb-4"
                  style={{ color: colors.accent }}
                >
                  {t(floor.title)}
                </h3>
                <p
                  className="text-sm sm:text-base leading-relaxed"
                  style={{ color: colors.textSecondary }}
                >
                  {t(floor.desc)}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/rooms"
              className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] font-medium group transition-opacity hover:opacity-80"
              style={{ color: colors.cta }}
            >
              {t(tr.aboutPage.roomsLink)}
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
          </div>
        </div>
      </section>
    </main>
  );
}
