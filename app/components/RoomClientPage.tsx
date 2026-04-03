"use client";

import { animate } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

import { localizeHref, type SiteLocale } from "@/app/lib/locale";
import {
  HERO_SCROLL_VIEWPORT_MULT_SUBPAGE,
  heroScrollStepPx,
} from "@/app/lib/heroScrollStep";
import { colors } from "@/app/theme/colors";
import { pageShell } from "@/app/theme/pageShell";
import type {
  RoomCardData,
  RoomPageData,
  RoomsPageData,
} from "@/sanity/lib/queries";

const TRIGGER_DOWN_DISTANCE = 1;
const JUMP_DURATION = 1.9;

function useScrollSnapJump() {
  const hasJumped = useRef(false);
  const isAnimating = useRef(false);
  const canTriggerJump = useRef(false);

  useEffect(() => {
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

type Props = {
  lang: SiteLocale;
  room: RoomPageData;
  roomsPage: RoomsPageData;
  prev: RoomCardData;
  next: RoomCardData;
};

export default function RoomClientPage({
  lang,
  room,
  roomsPage,
  prev,
  next,
}: Props) {
  useScrollSnapJump();

  const [first, second, third, fourth, fifth, sixth] = room.galleryImages;

  return (
    <main className="w-full">
      <section data-theme="dark" className="relative h-screen w-full overflow-hidden">
        <Image src={first.url} alt={first.alt} fill priority className="object-cover" />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <span className="mb-4 block text-xs font-medium uppercase tracking-[0.3em]" style={{ color: colors.cta }}>
            {roomsPage.roomLabel}
          </span>
          <h1 className="font-serif text-4xl font-light tracking-wide text-white sm:text-5xl md:text-6xl lg:text-7xl">{room.title}</h1>
          <p className="mt-4 text-lg font-light italic text-white/80 sm:text-xl">{room.tagline}</p>
        </div>
      </section>

      <section data-theme="light" style={{ backgroundColor: colors.primaryBg }}>
        <div className={`${pageShell} py-20 sm:py-28 lg:py-32`}>
          <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">
            <div className="flex-1">
              <h2 className="mb-3 font-serif text-3xl sm:text-4xl lg:text-5xl" style={{ color: colors.accent }}>
                {room.title}
              </h2>
              <p className="mb-6 font-serif text-lg italic sm:text-xl" style={{ color: colors.accent }}>
                {room.tagline}
              </p>
              <p className="text-base leading-relaxed sm:text-lg" style={{ color: colors.textSecondary }}>
                {room.description}
              </p>
            </div>
            <div className="flex-1">
              <div className="relative aspect-[3/4] max-h-[600px] w-full overflow-hidden rounded-lg shadow-xl">
                <Image src={second?.url ?? first.url} alt={second?.alt ?? first.alt} fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section data-theme="light" style={{ backgroundColor: colors.secondaryBg }}>
        <div className={`${pageShell} py-20 sm:py-24`}>
          <div className="mb-12 text-center">
            <span className="mb-4 block text-xs font-medium uppercase tracking-[0.3em]" style={{ color: colors.cta }}>
              {roomsPage.discoverSpaceLabel}
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl" style={{ color: colors.accent }}>
              {roomsPage.galleryTitle}
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-12 lg:gap-6">
            {[third, fourth, fifth, sixth].filter(Boolean).map((image, index) => (
              <div key={`${image?.url}-${index}`} className={index % 2 === 0 ? "md:col-span-7" : "md:col-span-5"}>
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg shadow-lg">
                  <Image src={image!.url} alt={image!.alt} fill className="object-cover" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section data-theme="light" style={{ backgroundColor: colors.primaryBg }}>
        <div className={`${pageShell} py-20 sm:py-24`}>
          <div className="flex flex-col items-center justify-between gap-8 sm:flex-row">
            <Link href={localizeHref(lang, `/rooms/${prev.slug}`)} className="text-sm font-medium uppercase tracking-[0.2em]" style={{ color: colors.cta }}>
              {prev.title}
            </Link>
            <Link href={localizeHref(lang, "/rooms")} className="text-sm font-medium uppercase tracking-[0.2em]" style={{ color: colors.textSecondary }}>
              {roomsPage.backToRoomsLabel}
            </Link>
            <Link href={localizeHref(lang, `/rooms/${next.slug}`)} className="text-sm font-medium uppercase tracking-[0.2em]" style={{ color: colors.cta }}>
              {next.title}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
