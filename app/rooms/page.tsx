"use client";

import Image from "next/image";
import ImageRevealSection from "../components/ImageRevealSection";
import { colors } from "../theme/colors";

export default function RoomsPage() {
  return (
    <main>
      <RoomsHero />

      {/* Mini Chalet */}
      <ImageRevealSection
        imageSrc="/Timian-Insta6.jpg%20m%C3%A1solata%20m%C3%A1solata.jpg"
        imageAlt="Mini Chalet room"
        layout="imageLeft"
        scaleX={0.55}
        scaleY={0.55}
        offsetX={50}
        offsetY={50}
        overlayText={
          <div className="text-center px-6">
            <div className="flex items-center justify-center mb-4">
              <div className="w-8 h-[1px]" style={{ backgroundColor: colors.cta }} />
              <div className="w-2 h-2 mx-3 border" style={{ borderColor: colors.cta }} />
              <div className="w-8 h-[1px]" style={{ backgroundColor: colors.cta }} />
            </div>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-serif text-white drop-shadow-lg">
              Mini Chalet
            </h2>
            <div className="w-16 h-[1px] mx-auto mt-5" style={{ backgroundColor: colors.cta }} />
          </div>
        }
        text={
          <div>
            <span
              className="block text-sm uppercase tracking-[0.3em] mb-4"
              style={{ color: colors.cta }}
            >
              Cozy Retreat
            </span>
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl font-serif leading-tight mb-6"
              style={{ color: colors.accent }}
            >
              Mini
              <br />
              Chalet
            </h2>
            <div
              className="w-12 h-[1px] mb-6"
              style={{ backgroundColor: colors.cta }}
            />
            <p
              className="text-lg leading-relaxed"
              style={{ color: colors.textSecondary }}
            >
              A cozy log cabin room with floor-to-ceiling windows framing
              panoramic forest views. Warm wooden interiors, lantern accents, and
              a fur rug create an intimate mountain hideaway.
            </p>
          </div>
        }
      />

      {/* Grove */}
      <ImageRevealSection
        imageSrc="/Crang-10.jpg"
        imageAlt="Grove room"
        layout="imageRight"
        scaleX={0.55}
        scaleY={0.55}
        offsetX={50}
        offsetY={50}
        overlayText={
          <div className="text-center px-6">
            <div className="flex items-center justify-center mb-4">
              <div className="w-8 h-[1px]" style={{ backgroundColor: colors.cta }} />
              <div className="w-2 h-2 mx-3 border" style={{ borderColor: colors.cta }} />
              <div className="w-8 h-[1px]" style={{ backgroundColor: colors.cta }} />
            </div>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-serif text-white drop-shadow-lg">
              Grove
            </h2>
            <div className="w-16 h-[1px] mx-auto mt-5" style={{ backgroundColor: colors.cta }} />
          </div>
        }
        text={
          <div>
            <span
              className="block text-sm uppercase tracking-[0.3em] mb-4"
              style={{ color: colors.cta }}
            >
              Elegant Comfort
            </span>
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl font-serif leading-tight mb-6"
              style={{ color: colors.accent }}
            >
              Grove
            </h2>
            <div
              className="w-12 h-[1px] mb-6"
              style={{ backgroundColor: colors.cta }}
            />
            <p
              className="text-lg leading-relaxed"
              style={{ color: colors.textSecondary }}
            >
              An elegant room adorned with natural textures, rich blue velvet
              accents, and pampas grass arrangements. Warm ambient lighting and
              marble-effect walls create a serene, sophisticated atmosphere.
            </p>
          </div>
        }
      />

      {/* Mineral */}
      <ImageRevealSection
        imageSrc="/DSC_6533_1.jpg%20m%C3%A1solata%20m%C3%A1solata.jpg"
        imageAlt="Mineral room"
        layout="imageLeft"
        scaleX={0.55}
        scaleY={0.55}
        offsetX={50}
        offsetY={50}
        overlayText={
          <div className="text-center px-6">
            <div className="flex items-center justify-center mb-4">
              <div className="w-8 h-[1px]" style={{ backgroundColor: colors.cta }} />
              <div className="w-2 h-2 mx-3 border" style={{ borderColor: colors.cta }} />
              <div className="w-8 h-[1px]" style={{ backgroundColor: colors.cta }} />
            </div>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-serif text-white drop-shadow-lg">
              Mineral
            </h2>
            <div className="w-16 h-[1px] mx-auto mt-5" style={{ backgroundColor: colors.cta }} />
          </div>
        }
        text={
          <div>
            <span
              className="block text-sm uppercase tracking-[0.3em] mb-4"
              style={{ color: colors.cta }}
            >
              Earth &amp; Stone
            </span>
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl font-serif leading-tight mb-6"
              style={{ color: colors.accent }}
            >
              Mineral
            </h2>
            <div
              className="w-12 h-[1px] mb-6"
              style={{ backgroundColor: colors.cta }}
            />
            <p
              className="text-lg leading-relaxed"
              style={{ color: colors.textSecondary }}
            >
              A dramatic room centred around a backlit mineral stone headboard,
              surrounded by warm reclaimed wood walls. Fur throws and golden
              accents complete this earthy, luxurious sanctuary.
            </p>
          </div>
        }
      />

      {/* Timian */}
      <ImageRevealSection
        imageSrc="/DSC_7435_1.jpg%20m%C3%A1solata%20m%C3%A1solata.jpg"
        imageAlt="Timian room"
        layout="imageRight"
        scaleX={0.55}
        scaleY={0.55}
        offsetX={50}
        offsetY={50}
        overlayText={
          <div className="text-center px-6">
            <div className="flex items-center justify-center mb-4">
              <div className="w-8 h-[1px]" style={{ backgroundColor: colors.cta }} />
              <div className="w-2 h-2 mx-3 border" style={{ borderColor: colors.cta }} />
              <div className="w-8 h-[1px]" style={{ backgroundColor: colors.cta }} />
            </div>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-serif text-white drop-shadow-lg">
              Timian
            </h2>
            <div className="w-16 h-[1px] mx-auto mt-5" style={{ backgroundColor: colors.cta }} />
          </div>
        }
        text={
          <div>
            <span
              className="block text-sm uppercase tracking-[0.3em] mb-4"
              style={{ color: colors.cta }}
            >
              Bright &amp; Airy
            </span>
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl font-serif leading-tight mb-6"
              style={{ color: colors.accent }}
            >
              Timian
            </h2>
            <div
              className="w-12 h-[1px] mb-6"
              style={{ backgroundColor: colors.cta }}
            />
            <p
              className="text-lg leading-relaxed"
              style={{ color: colors.textSecondary }}
            >
              A bright attic suite bathed in natural light from skylights above.
              Floral curtains, whitewashed wooden beams, and a classic wardrobe
              give this room an airy, garden-inspired charm.
            </p>
          </div>
        }
      />
    </main>
  );
}

function RoomsHero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/rooms-thumbnail.jpg"
          alt="Luxury room interior"
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
          OUR ROOMS
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg sm:text-xl text-white/90 font-light max-w-2xl">
          Luxury accommodations designed for your comfort
        </p>
      </div>
    </section>
  );
}
