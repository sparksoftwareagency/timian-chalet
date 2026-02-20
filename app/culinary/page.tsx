"use client";

import Image from "next/image";
import { colors } from "../theme/colors";

export default function CulinaryPage() {
  return (
    <main>
      <CulinaryHero />
    </main>
  );
}

function CulinaryHero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/culinary-1.jpg"
          alt="Timian Chalet culinary experience"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        {/* Decorative element */}
        <div className="mb-8">
          <div
            className="w-4 h-4 border-2 rotate-45"
            style={{ borderColor: colors.cta }}
          />
        </div>

        {/* Title */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[0.3em] text-white uppercase font-light">
          CULINARY
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg sm:text-xl text-white/90 font-light max-w-2xl">
          Authentic Transylvanian flavours crafted with passion
        </p>
      </div>
    </section>
  );
}
