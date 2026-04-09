"use client";

import Image from "next/image";
import { animate } from "framer-motion";
import {
  useCallback,
  useEffect,
  useRef,
} from "react";

import FullBleedParallaxDivider from "@/app/components/FullBleedParallaxDivider";
import ImageShow from "@/app/components/ImageShow";
import {
  HERO_SCROLL_VIEWPORT_MULT_SUBPAGE,
  heroScrollStepPx,
} from "@/app/lib/heroScrollStep";
import { colors } from "@/app/theme/colors";
import { pageShell } from "@/app/theme/pageShell";
import type { WellnessPageData } from "@/sanity/lib/queries";

const TRIGGER_DOWN_DISTANCE = 1;
const JUMP_DURATION = 1.1;

function useRevealOnScroll() {
  const refs = useRef<(HTMLElement | null)[]>([]);

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
      { threshold: 0.15 },
    );

    refs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const addRef = useCallback(
    (index: number) => (el: HTMLElement | null) => {
      refs.current[index] = el;
    },
    [],
  );

  return addRef;
}

function useScrollSnapJump() {
  const hasJumped = useRef(false);
  const isAnimating = useRef(false);
  const canTriggerJump = useRef(false);

  useEffect(() => {
    // Only enable the jump behavior when the user is at the very top.
    // This prevents auto-jump after refresh/restore in the middle of the page.
    canTriggerJump.current = window.scrollY <= TRIGGER_DOWN_DISTANCE;

    const onScroll = () => {
      if (!canTriggerJump.current) {
        if (window.scrollY <= TRIGGER_DOWN_DISTANCE) {
          canTriggerJump.current = true;
        }
        return;
      }

      if (hasJumped.current || isAnimating.current) {
        return;
      }

      if (window.scrollY <= TRIGGER_DOWN_DISTANCE) {
        return;
      }

      isAnimating.current = true;
      hasJumped.current = true;

      const currentScroll = window.scrollY;
      const targetScroll =
        currentScroll + heroScrollStepPx(HERO_SCROLL_VIEWPORT_MULT_SUBPAGE);

      animate(currentScroll, targetScroll, {
        duration: JUMP_DURATION,
        ease: [0.22, 1, 0.36, 1],
        onUpdate: (value) => window.scrollTo(0, value),
        onComplete: () => {
          isAnimating.current = false;
        },
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
}

export default function WellnessClientPage({ data }: { data: WellnessPageData }) {
  const addRef = useRevealOnScroll();
  useScrollSnapJump();
  const breakImages = data.breakImages.filter((image) => image?.url);
  const hasBreakImageShow = breakImages.length > 1;
  const highlightImage = data.highlightImage?.url ? data.highlightImage : data.breakImages[0];
  const flyerPdfPath = data.flyerPdfUrl || "/massage_flyer.pdf";
  const flyerViewerHref = `/pdf-viewer?pdf=${encodeURIComponent(flyerPdfPath)}`;

  const firstTwoFeatures = data.features.slice(0, 2);
  const remainingFeatures = data.features.slice(2);
  const featuresBreakImages = data.featuresBreakImages.filter((image) => image?.url).slice(0, 5);

  const renderFeature = (feature: WellnessPageData["features"][number], index: number) => (
    <article key={feature._key} className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
      <div className={`lg:col-span-7 ${index % 2 === 0 ? "lg:order-2" : "lg:order-1"}`}>
        {feature.images.length > 1 ? (
          <ImageShow
            images={feature.images}
            aspectRatioClassName="aspect-[4/3]"
            frameClassName="shadow-xl image-lift"
            className="w-full float-soft"
            sizes="(min-width: 1024px) 58vw, 100vw"
          />
        ) : feature.images[0] ? (
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg shadow-xl float-soft">
            <Image
              src={feature.images[0].url}
              alt={feature.images[0].alt}
              fill
              className="image-lift object-cover"
            />
          </div>
        ) : null}
      </div>
      <div className={`mx-auto max-w-2xl text-center lg:col-span-5 ${index % 2 === 0 ? "lg:order-1" : "lg:order-2"}`}>
        <h3 className="mb-4 font-serif text-2xl sm:text-3xl float-soft" style={{ color: colors.accent }}>
          {feature.title}
        </h3>
        <p className="text-base leading-relaxed sm:text-lg" style={{ color: colors.textSecondary }}>
          {feature.description}
        </p>
      </div>
    </article>
  );

  const renderSplitFeature = (
    feature: WellnessPageData["features"][number],
    index: number,
    showImagePaginationDots: boolean,
  ) => {
    const isImageLeft = index % 2 === 0;
    const firstImage = feature.images[0];

    return (
      <article
        key={feature._key}
        className={`flex flex-col overflow-hidden rounded-2xl border border-white/35 bg-white/55 shadow-lg ${
          isImageLeft ? "lg:flex-row" : "lg:flex-row-reverse"
        }`}
      >
        <div className="w-full lg:w-1/2">
          {feature.images.length > 1 ? (
            <ImageShow
              images={feature.images}
              className="h-full w-full"
              aspectRatioClassName="aspect-[3/4] w-full"
              frameClassName="rounded-none"
              sizes="(max-width: 1024px) 100vw, 50vw"
              showPaginationDots={showImagePaginationDots}
            />
          ) : firstImage ? (
            <div className="relative aspect-[3/4] w-full">
              <Image src={firstImage.url} alt={firstImage.alt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>
          ) : null}
        </div>

        <div className="flex min-h-[18rem] w-full items-center justify-center p-8 text-center sm:p-10 lg:w-1/2 lg:p-12">
          <div className="max-w-xl">
            <h3 className="font-serif text-2xl leading-tight sm:text-3xl" style={{ color: colors.accent }}>
              {feature.title}
            </h3>
            <p className="mx-auto mt-4 text-sm leading-relaxed sm:text-base" style={{ color: colors.textSecondary }}>
              {feature.description}
            </p>
          </div>
        </div>
      </article>
    );
  };

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
        .flash-on-reveal {
          filter: brightness(0.9) saturate(0.92);
        }
        .reveal-section.revealed .flash-on-reveal {
          animation: section-flash 0.9s ease-out both;
        }
        .donkey-blur-in {
          filter: blur(14px);
          transform: scale(1.04);
          transition: filter 1s ease, transform 1s ease;
        }
        .reveal-section.revealed .donkey-blur-in {
          filter: blur(0);
          transform: scale(1);
        }
        .hero-image-enter {
          opacity: 0;
          transform: scale(1.05);
          animation: hero-enter 1.1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .image-lift {
          transform: scale(1.05);
          transition: transform 1.2s ease-out;
        }
        .reveal-section.revealed .image-lift {
          transform: scale(1);
        }
        .float-soft {
          animation: soft-float 7.5s ease-in-out infinite;
          animation-delay: 0.25s;
          will-change: transform;
        }
        @keyframes hero-enter {
          0% {
            opacity: 0;
            transform: scale(1.05);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes section-flash {
          0% {
            filter: brightness(0.95) saturate(0.9);
          }
          45% {
            filter: brightness(1.18) saturate(1.1);
          }
          100% {
            filter: brightness(1) saturate(1);
          }
        }
        @keyframes soft-float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-image-enter,
          .float-soft {
            animation: none;
          }
        }
      `}</style>

      <section data-theme="dark" className="relative h-screen w-full overflow-hidden">
        <Image
          src={data.heroImage.url}
          alt={data.heroImage.alt}
          fill
          className="hero-image-enter object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <h1 className="font-serif font-light uppercase tracking-[0.2em] text-white sm:text-4xl md:text-7xl lg:text-7xl float-soft">
            {data.heroTitle}
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-white/80 sm:text-xl float-soft">
            {data.heroSubtitle}
          </p>
        </div>
      </section>

      <section data-theme="light" style={{ backgroundColor: colors.primaryBg }}>
        <div
          ref={addRef(0)}
          className={`reveal-section ${pageShell} py-20 sm:py-28 lg:py-32`}
        >
          <div className="mb-16 text-center flash-on-reveal">
            <span className="mb-4 block text-xs font-medium uppercase tracking-[0.3em]" style={{ color: colors.cta }}>
              {data.introEyebrow}
            </span>
            <h2 className="whitespace-pre-line font-serif text-3xl sm:text-4xl lg:text-5xl" style={{ color: colors.accent }}>
              {data.introTitle}
            </h2>
          </div>
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg shadow-xl">
                <Image src={data.introImage.url} alt={data.introImage.alt} fill className="donkey-blur-in object-cover" />
              </div>
            </div>
            <div className="flash-on-reveal mx-auto max-w-2xl space-y-6 text-center lg:col-span-5">
              {data.introParagraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="mx-auto max-w-md text-base leading-relaxed sm:text-lg"
                  style={{ color: colors.textSecondary }}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {featuresBreakImages.length === 5 ? (
        <section data-theme="light" style={{ backgroundColor: colors.primaryBg }}>
          <div className="w-full pb-8 sm:pb-12">
            <div className="grid grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
              {featuresBreakImages.map((image, index) => (
                <div key={`${image.url}-${index}`} className="relative aspect-[3/4] w-full overflow-hidden">
                  <Image src={image.url} alt={image.alt} fill className="object-cover" sizes="20vw" />
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {highlightImage ? (
        <section data-theme="dark" className="relative h-screen w-full overflow-hidden">
          <div ref={addRef(1)} className="reveal-section absolute inset-0">
            <Image
              src={highlightImage.url}
              alt={highlightImage.alt || data.highlightTitle}
              fill
              className="flash-on-reveal object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/35" />
            <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
              <div className="max-w-2xl">
                <h2 className="font-serif text-4xl font-light leading-tight text-white sm:text-5xl md:text-6xl">
                  {data.highlightTitle}
                </h2>
                <a
                  href={flyerViewerHref}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-flex items-center justify-center border border-white/80 px-7 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/30"
                >
                  {data.flyerButtonLabel}
                </a>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section style={{ backgroundColor: colors.primaryBg }}>
        <div
          ref={addRef(2)}
          className={`reveal-section ${pageShell} py-20 sm:py-28 lg:py-32`}
        >
          <div className="mb-16 text-center">
            <span className="mb-4 block text-xs font-medium uppercase tracking-[0.3em]" style={{ color: colors.cta }}>
              {data.featuresEyebrow}
            </span>
            <h2 className="whitespace-pre-line font-serif text-3xl sm:text-4xl lg:text-5xl" style={{ color: colors.accent }}>
              {data.featuresTitle}
            </h2>
          </div>
          <div className="space-y-16">
            {firstTwoFeatures.map((feature, index) => renderFeature(feature, index))}
          </div>
        </div>
      </section>

      {breakImages.length > 0 ? (
        <section data-theme="light">
          <FullBleedParallaxDivider
            height="h-[55vh]"
            image={hasBreakImageShow ? undefined : breakImages[0]}
          >
            {hasBreakImageShow ? (
              <ImageShow
                images={breakImages}
                className="h-full w-full"
                aspectRatioClassName="h-full"
                frameClassName="rounded-none"
                sizes="100vw"
              />
            ) : null}
          </FullBleedParallaxDivider>
        </section>
      ) : null}

      <section style={{ backgroundColor: colors.primaryBg }}>
        <div
          ref={addRef(3)}
          className={`reveal-section ${pageShell} py-20 sm:py-28 lg:py-32`}
        >
          <div className="space-y-12 sm:space-y-14">
            {remainingFeatures.map((feature, index) =>
              renderSplitFeature(feature, index, index < remainingFeatures.length - 2),
            )}
          </div>
        </div>
      </section>

    </main>
  );
}
