"use client";

import Image from "next/image";
import ImageRevealSection from "../components/ImageRevealSection";

export default function CulinaryPage() {
  return (
    <main>
      <CulinaryHero />

      {/* The Restaurant */}
      <ImageRevealSection
        imageSrc="/culinary-1.jpg"
        imageAlt="Timian Chalet restaurant dining area"
        layout="imageLeft"
        scaleX={0.55}
        scaleY={0.55}
        offsetX={50}
        offsetY={50}
        overlayText={
          <div className="text-center px-6">
            <div className="flex items-center justify-center mb-4">
              <div className="w-8 h-[1px] bg-[#C9A961]" />
              <div className="w-2 h-2 mx-3 border border-[#C9A961]" />
              <div className="w-8 h-[1px] bg-[#C9A961]" />
            </div>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-serif text-white drop-shadow-lg">
              The Restaurant
            </h2>
            <div className="w-16 h-[1px] mx-auto mt-5 bg-[#C9A961]" />
          </div>
        }
        text={
          <div>
            <span
              className="block text-sm uppercase tracking-[0.3em] mb-4"
              style={{ color: "#C9A961" }}
            >
              Dining Space
            </span>
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl font-serif leading-tight mb-6"
              style={{ color: "#6B4423" }}
            >
              The
              <br />
              Restaurant
            </h2>
            <div
              className="w-12 h-[1px] mb-6"
              style={{ backgroundColor: "#C9A961" }}
            />
            <p
              className="text-lg leading-relaxed"
              style={{ color: "#6B5D53" }}
            >
              A warm, inviting dining space where rustic wooden tables meet the
              glow of a crackling fireplace. Enjoy fine wines and freshly prepared
              dishes in an atmosphere of alpine elegance.
            </p>
          </div>
        }
      />

      {/* Traditional Flavours */}
      <ImageRevealSection
        imageSrc="/culinary-2.jpg"
        imageAlt="Traditional Romanian dish"
        layout="imageRight"
        scaleX={0.55}
        scaleY={0.55}
        offsetX={50}
        offsetY={50}
        overlayText={
          <div className="text-center px-6">
            <div className="flex items-center justify-center mb-4">
              <div className="w-8 h-[1px] bg-[#C9A961]" />
              <div className="w-2 h-2 mx-3 border border-[#C9A961]" />
              <div className="w-8 h-[1px] bg-[#C9A961]" />
            </div>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-serif text-white drop-shadow-lg">
              Traditional Flavours
            </h2>
            <div className="w-16 h-[1px] mx-auto mt-5 bg-[#C9A961]" />
          </div>
        }
        text={
          <div>
            <span
              className="block text-sm uppercase tracking-[0.3em] mb-4"
              style={{ color: "#C9A961" }}
            >
              Authentic Cuisine
            </span>
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl font-serif leading-tight mb-6"
              style={{ color: "#6B4423" }}
            >
              Traditional
              <br />
              Flavours
            </h2>
            <div
              className="w-12 h-[1px] mb-6"
              style={{ backgroundColor: "#C9A961" }}
            />
            <p
              className="text-lg leading-relaxed"
              style={{ color: "#6B5D53" }}
            >
              Authentic Romanian recipes passed down through generations, prepared
              with locally sourced ingredients. Each dish tells a story of
              Transylvanian culinary heritage, paired with carefully selected wines.
            </p>
          </div>
        }
      />

      {/* Artisan Selection */}
      <ImageRevealSection
        imageSrc="/culinary-3.jpg"
        imageAlt="Artisan cheese and charcuterie board"
        layout="imageLeft"
        scaleX={0.55}
        scaleY={0.55}
        offsetX={50}
        offsetY={50}
        overlayText={
          <div className="text-center px-6">
            <div className="flex items-center justify-center mb-4">
              <div className="w-8 h-[1px] bg-[#C9A961]" />
              <div className="w-2 h-2 mx-3 border border-[#C9A961]" />
              <div className="w-8 h-[1px] bg-[#C9A961]" />
            </div>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-serif text-white drop-shadow-lg">
              Artisan Selection
            </h2>
            <div className="w-16 h-[1px] mx-auto mt-5 bg-[#C9A961]" />
          </div>
        }
        text={
          <div>
            <span
              className="block text-sm uppercase tracking-[0.3em] mb-4"
              style={{ color: "#C9A961" }}
            >
              Curated Boards
            </span>
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl font-serif leading-tight mb-6"
              style={{ color: "#6B4423" }}
            >
              Artisan
              <br />
              Selection
            </h2>
            <div
              className="w-12 h-[1px] mb-6"
              style={{ backgroundColor: "#C9A961" }}
            />
            <p
              className="text-lg leading-relaxed"
              style={{ color: "#6B5D53" }}
            >
              Hand-picked local cheeses, fresh grapes, and toasted walnuts
              arranged on artisan boards. A celebration of Romanian dairy
              craftsmanship and the finest seasonal produce from the Carpathian region.
            </p>
          </div>
        }
      />

      {/* Mountain Cuisine */}
      <ImageRevealSection
        imageSrc="/culinary-4.jpg"
        imageAlt="Mountain cuisine main course"
        layout="imageRight"
        scaleX={0.55}
        scaleY={0.55}
        offsetX={50}
        offsetY={50}
        overlayText={
          <div className="text-center px-6">
            <div className="flex items-center justify-center mb-4">
              <div className="w-8 h-[1px] bg-[#C9A961]" />
              <div className="w-2 h-2 mx-3 border border-[#C9A961]" />
              <div className="w-8 h-[1px] bg-[#C9A961]" />
            </div>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-serif text-white drop-shadow-lg">
              Mountain Cuisine
            </h2>
            <div className="w-16 h-[1px] mx-auto mt-5 bg-[#C9A961]" />
          </div>
        }
        text={
          <div>
            <span
              className="block text-sm uppercase tracking-[0.3em] mb-4"
              style={{ color: "#C9A961" }}
            >
              Hearty Dishes
            </span>
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl font-serif leading-tight mb-6"
              style={{ color: "#6B4423" }}
            >
              Mountain
              <br />
              Cuisine
            </h2>
            <div
              className="w-12 h-[1px] mb-6"
              style={{ backgroundColor: "#C9A961" }}
            />
            <p
              className="text-lg leading-relaxed"
              style={{ color: "#6B5D53" }}
            >
              Hearty mountain dishes featuring slow-cooked meats, golden gratins,
              and garden-fresh vegetables. Every plate is a tribute to the rich,
              comforting flavours of Transylvanian highland cooking.
            </p>
          </div>
        }
      />
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
            style={{ borderColor: "#C9A961" }}
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
