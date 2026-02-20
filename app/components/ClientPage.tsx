"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useLanguage, useT, TLines } from "../i18n/LanguageContext";
import { tr } from "../i18n/translations";
import { colors, rgba } from "../theme/colors";

const Hero = dynamic(() => import("./Hero"), { ssr: true });
const LoadingState = dynamic(() => import("./LoadingState"), { ssr: false });

const TAGLINE_STYLES: React.CSSProperties[] = [
  { color: colors.cta },
  { color: colors.secondaryBg, paddingLeft: "12%" },
  { color: colors.cta, paddingLeft: "28%" },
  { color: colors.secondaryBg, paddingLeft: "38%" },
];

export default function ClientPage() {
  const { lang } = useLanguage();
  const t = useT();

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  const taglines = tr.landing.taglines[lang];

  return (
    <main className="w-full">
      <LoadingState />
      <section data-theme="dark">
        <Hero />
      </section>

      {/* Landing Section - visible after hero animation */}
      <section data-theme="light" className="relative min-h-screen w-full px-6 sm:px-10 lg:px-16 pt-20 pb-12 flex flex-col" style={{ backgroundColor: colors.primaryBg }}>
        <div className="flex-1 flex flex-col justify-center mt-8">
          <div className="leading-[0.85] space-y-1">
            {taglines.map((line, i) =>
              line ? (
                <div
                  key={i}
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-[0.12em] uppercase"
                  style={TAGLINE_STYLES[i]}
                >
                  {line}
                </div>
              ) : null,
            )}
          </div>
        </div>
      </section>

      <section data-theme="dark" id="about" className="w-full" style={{ backgroundColor: colors.primaryBg }}>
        {/* Welcome Title */}
        <div className="text-center py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal tracking-tight" style={{ color: colors.accent }}>
            {t(tr.about.welcomeTitle)}
          </h2>
          <div className="w-16 h-0.5 mx-auto mt-6" style={{ backgroundColor: colors.cta }}></div>
          <p className="mt-6 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed" style={{ color: colors.textSecondary }}>
            {t(tr.about.welcomeDesc)}
          </p>
        </div>

        {/* Luxury Feature Cards */}
        <div className="relative">
          {/* Feature 01 - Full Width Immersive */}
          <div className="group relative h-[70vh] min-h-[500px] w-full overflow-hidden">
            <div className="absolute inset-0 transition-transform duration-[1.5s] ease-out group-hover:scale-105">
              <Image
                src="/nature.jpg"
                alt="Carpathian mountain retreat"
                fill
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${rgba(colors.accent, 0.85)} 0%, ${rgba(colors.accent, 0.4)} 50%, transparent 100%)` }}></div>
            </div>
            <div className="relative z-10 h-full flex items-center">
              <div className="px-8 sm:px-16 lg:px-24 max-w-2xl">
                <div className="overflow-hidden">
                  <span className="block text-sm uppercase tracking-[0.3em] mb-4 opacity-80" style={{ color: colors.cta }}>
                    {t(tr.about.locationLabel)}
                  </span>
                </div>
                <h3 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white mb-6 leading-tight">
                  <TLines text={t(tr.about.locationTitle)} />
                </h3>
                <div className="w-12 h-[1px] mb-6" style={{ backgroundColor: colors.cta }}></div>
                <p className="text-white/90 text-lg leading-relaxed max-w-md">
                  {t(tr.about.locationDesc)}
                </p>
              </div>
            </div>
          </div>

          {/* Feature 02 & 03 - Split Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Feature 02 */}
            <div className="group relative h-[60vh] min-h-[450px] overflow-hidden">
              <div className="absolute inset-0 transition-transform duration-[1.5s] ease-out group-hover:scale-105">
                <Image
                  src="/the_chalet.jpg"
                  alt="Authentic hospitality"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${rgba(colors.accent, 0.9)} 0%, ${rgba(colors.accent, 0.3)} 60%, transparent 100%)` }}></div>
              </div>
              <div className="relative z-10 h-full flex items-end p-8 sm:p-12">
                <div>
                  <span className="block text-xs uppercase tracking-[0.3em] mb-3 opacity-80" style={{ color: colors.cta }}>
                    {t(tr.about.experienceLabel)}
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-serif text-white mb-4 leading-tight">
                    <TLines text={t(tr.about.experienceTitle)} />
                  </h3>
                  <div className="w-8 h-[1px] mb-4" style={{ backgroundColor: colors.cta }}></div>
                  <p className="text-white/85 text-base leading-relaxed max-w-sm">
                    {t(tr.about.experienceDesc)}
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 03 */}
            <div className="group relative h-[60vh] min-h-[450px] overflow-hidden">
              <div className="absolute inset-0 transition-transform duration-[1.5s] ease-out group-hover:scale-105">
                <Image
                  src="/rooms-thumbnail.jpg"
                  alt="Rustic luxury interior"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${rgba(colors.accent, 0.9)} 0%, ${rgba(colors.accent, 0.3)} 60%, transparent 100%)` }}></div>
              </div>
              <div className="relative z-10 h-full flex items-end p-8 sm:p-12">
                <div>
                  <span className="block text-xs uppercase tracking-[0.3em] mb-3 opacity-80" style={{ color: colors.cta }}>
                    {t(tr.about.craftsmanshipLabel)}
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-serif text-white mb-4 leading-tight">
                    <TLines text={t(tr.about.craftsmanshipTitle)} />
                  </h3>
                  <div className="w-8 h-[1px] mb-4" style={{ backgroundColor: colors.cta }}></div>
                  <p className="text-white/85 text-base leading-relaxed max-w-sm">
                    {t(tr.about.craftsmanshipDesc)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="mt-20 py-12 px-4 sm:px-6 lg:px-8" style={{ background: `linear-gradient(to bottom, ${colors.primaryBg}, ${colors.secondaryBg})` }}>
          <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {[
              { value: "2018", label: tr.about.statEstablished },
              { value: "12", label: tr.about.statRooms },
              { value: "100%", label: tr.about.statSatisfaction },
              { value: "24/7", label: tr.about.statConcierge },
            ].map((stat) => (
              <div key={stat.value} className="text-center">
                <div className="w-14 h-14 mx-auto mb-4 border-2 flex items-center justify-center" style={{ borderColor: colors.cta }}>
                  <div className="w-10 h-10 border" style={{ borderColor: colors.cta }}></div>
                </div>
                <div className="text-3xl sm:text-4xl font-light mb-2" style={{ color: colors.accent }}>{stat.value}</div>
                <div className="text-xs font-medium uppercase tracking-widest" style={{ color: colors.textSecondary }}>{t(stat.label)}</div>
              </div>
            ))}
          </div>
        </div>

      </section>

    </main>
  );
}
