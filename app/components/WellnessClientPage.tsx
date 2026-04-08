"use client";

import Image from "next/image";
import { animate } from "framer-motion";
import { FlipbookViewer } from "react-pdf-flipbook-viewer";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
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
const FALLBACK_MASSAGE_FLYER_PATH = "/massage_flyer.pdf";

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
  const [isFlyerOpen, setIsFlyerOpen] = useState(false);
  const breakImages = data.breakImages.filter((image) => image?.url);
  const hasBreakImageShow = breakImages.length > 1;
  const highlightImages = data.highlightImages.filter((image) => image?.url);
  const hasImageShow = highlightImages.length > 1;
  const singleHighlightImage = highlightImages[0];
  const flyerPdfPath = data.flyerPdfUrl || FALLBACK_MASSAGE_FLYER_PATH;

  const firstTwoFeatures = data.features.slice(0, 2);
  const remainingFeatures = data.features.slice(2);
  const featuresBreakImages = data.featuresBreakImages.filter((image) => image?.url).slice(0, 5);

  useEffect(() => {
    if (!isFlyerOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsFlyerOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isFlyerOpen]);

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
        .massage-flyer-viewer {
          width: min(100%, 64rem) !important;
          height: min(82vh, 56rem) !important;
          min-height: 26rem !important;
          background-color: #16110c !important;
        }
        .massage-flyer-viewer > div {
          height: 100% !important;
        }
        .massage-flyer-viewer.bg-gray-800,
        .massage-flyer-viewer .bg-gray-700,
        .massage-flyer-viewer .bg-gray-800 {
          background-color: #16110c !important;
        }
        .massage-flyer-viewer .mb-1 {
          display: none !important;
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
        <section data-theme="light" style={{ backgroundColor: colors.secondaryBg }}>
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

      <section style={{ backgroundColor: colors.secondaryBg }}>
        <div
          ref={addRef(1)}
          className={`reveal-section ${pageShell} grid grid-cols-1 items-center gap-10 py-20 sm:py-28 lg:grid-cols-12 lg:gap-14 lg:py-32`}
        >
          <div className="flash-on-reveal order-1 mx-auto max-w-3xl text-center lg:order-1 lg:col-span-6">
            <span className="mb-4 block text-xs font-medium uppercase tracking-[0.3em]" style={{ color: colors.cta }}>
              {data.highlightEyebrow}
            </span>
            <h2 className="mb-6 whitespace-pre-line font-serif text-3xl sm:text-4xl lg:text-5xl" style={{ color: colors.accent }}>
              {data.highlightTitle}
            </h2>
            {data.highlightParagraphs.map((paragraph) => (
              <p key={paragraph} className="mb-4 text-base leading-relaxed sm:text-lg" style={{ color: colors.textSecondary }}>
                {paragraph}
              </p>
            ))}
            <button
              type="button"
              onClick={() => {
                setIsFlyerOpen(true);
              }}
              className="mt-7 inline-flex items-center justify-center rounded-md border border-[#6B7C6A] bg-[#FAF7F2] px-6 py-3 text-sm font-medium tracking-[0.08em] text-[#6B7C6A] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6B7C6A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#E8E0D5]"
            >
              {data.flyerButtonLabel}
            </button>
          </div>
          <div className="order-2 lg:order-2 lg:col-span-6">
            <div className="w-full">
              {hasImageShow ? (
                <ImageShow
                  images={highlightImages}
                  aspectRatioClassName="aspect-[3/4]"
                  frameClassName="max-h-[550px] shadow-xl"
                  className="w-full"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              ) : singleHighlightImage ? (
                <div className="relative aspect-[3/4] w-full max-h-[550px] overflow-hidden rounded-lg shadow-xl">
                  <Image
                    src={singleHighlightImage.url}
                    alt={singleHighlightImage.alt}
                    fill
                    className="flash-on-reveal object-cover"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: colors.secondaryBg }}>
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
            gradientTop={colors.primaryBg}
            gradientBottom={colors.secondaryBg}
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

      <section style={{ backgroundColor: colors.secondaryBg }}>
        <div
          ref={addRef(3)}
          className={`reveal-section ${pageShell} py-20 sm:py-28 lg:py-32`}
        >
          <div className="space-y-16">
            {remainingFeatures.map((feature, index) => renderFeature(feature, index + firstTwoFeatures.length))}
          </div>
        </div>
      </section>

      {isFlyerOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 sm:p-8">
          <div
            className="absolute inset-0"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(circle at 50% 30%, rgba(253, 230, 186, 0.3) 0%, rgba(0, 0, 0, 0.8) 65%)",
            }}
          />
          <div className="relative z-10 w-full max-w-6xl overflow-hidden rounded-2xl border border-white/15 bg-[#16110c]/90 shadow-[0_25px_80px_rgba(0,0,0,0.55)] backdrop-blur-sm">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f0ddbe]">Massage Flyer Preview</p>
              <div className="flex items-center gap-2">
                <a
                  href={flyerPdfPath}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-[#c7a766]/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#f0ddbe] transition hover:bg-[#c7a766]/15"
                >
                  Open PDF
                </a>
                <button
                  type="button"
                  onClick={() => setIsFlyerOpen(false)}
                  className="rounded-full border border-white/30 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-white/10"
                >
                  Close
                </button>
              </div>
            </div>
            <div className="flex flex-col items-center gap-4 px-3 py-5 sm:px-6 sm:py-8">
              <FlipbookViewer
                pdfUrl={flyerPdfPath}
                disableShare
                className="massage-flyer-viewer w-full overflow-hidden rounded-xl border border-white/10 shadow-[0_18px_60px_rgba(0,0,0,0.45)]"
              />
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
