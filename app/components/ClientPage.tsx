"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import ImageRevealSection from "./ImageRevealSection";

const Hero = dynamic(() => import("./Hero"), { ssr: true });
const LoadingState = dynamic(() => import("./LoadingState"), { ssr: false });

export default function ClientPage() {
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="w-full">
      <LoadingState />
      <Hero />

      {/* Landing Section - visible after hero animation */}
      <section className="relative min-h-screen w-full px-6 sm:px-10 lg:px-16 pt-20 pb-12 flex flex-col" style={{backgroundColor: '#FFF8F0'}}>
        {/* Top section with branding
        <div className="max-w-xl">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-light tracking-[0.25em] uppercase" style={{color: '#8B6914'}}>
            TIMIAN
          </h1>
          <div className="flex items-center mt-4">
            <div className="w-12 h-[1px]" style={{backgroundColor: '#C9A961'}}></div>
            <span className="mx-4 text-sm sm:text-base lg:text-lg tracking-[0.35em] uppercase" style={{color: '#A08050'}}>
              CHALET
            </span>
            <div className="w-12 h-[1px]" style={{backgroundColor: '#C9A961'}}></div>
          </div>
          <p className="mt-5 text-lg sm:text-xl lg:text-2xl italic font-light" style={{color: '#C9A961'}}>
            Transylvanian Mountain Retreat
          </p>
        </div> */}

        {/* Staggered text - positioned in middle/lower area */}
        <div className="flex-1 flex flex-col justify-center mt-8">
          <div className="leading-[0.85] space-y-1">
            <div 
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-[0.12em] uppercase"
              style={{color: '#A67C52'}}
            >
              BECAUSE
            </div>
            <div 
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-[0.12em] uppercase"
              style={{color: '#D4C4A0', paddingLeft: '12%'}}
            >
              YOU
            </div>
            <div 
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-[0.12em] uppercase"
              style={{color: '#A67C52', paddingLeft: '28%'}}
            >
              DESERVE
            </div>
            <div 
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-[0.12em] uppercase"
              style={{color: '#D4C4A0', paddingLeft: '38%'}}
            >
              IT
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="w-full" style={{backgroundColor: '#FFF8F0'}}>
        {/* Welcome Title */}
        <div className="text-center py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal tracking-tight" style={{color: '#6B4423'}}>
            Welcome to Timian Chalet
          </h2>
          <div className="w-16 h-0.5 mx-auto mt-6" style={{backgroundColor: '#A67C52'}}></div>
          <p className="mt-6 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed" style={{color: '#6B5D53'}}>
            Nestled in the heart of the Carpathian Mountains, Timian Chalet offers an authentic Transylvanian escape where traditional Romanian craftsmanship meets rustic luxury.
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
              <div className="absolute inset-0" style={{background: 'linear-gradient(to right, rgba(107, 68, 35, 0.85) 0%, rgba(107, 68, 35, 0.4) 50%, transparent 100%)'}}></div>
            </div>
            <div className="relative z-10 h-full flex items-center">
              <div className="px-8 sm:px-16 lg:px-24 max-w-2xl">
                <div className="overflow-hidden">
                  <span 
                    className="block text-sm uppercase tracking-[0.3em] mb-4 opacity-80"
                    style={{color: '#C9A961'}}
                  >
                    The Location
                  </span>
                </div>
                <h3 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white mb-6 leading-tight">
                  Carpathian<br />Retreat
                </h3>
                <div className="w-12 h-[1px] mb-6" style={{backgroundColor: '#C9A961'}}></div>
                <p className="text-white/90 text-lg leading-relaxed max-w-md">
                  Surrounded by majestic peaks where ancient forests meet pristine wilderness.
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
                <div className="absolute inset-0" style={{background: 'linear-gradient(to top, rgba(107, 68, 35, 0.9) 0%, rgba(107, 68, 35, 0.3) 60%, transparent 100%)'}}></div>
              </div>
              <div className="relative z-10 h-full flex items-end p-8 sm:p-12">
                <div>
                  <span 
                    className="block text-xs uppercase tracking-[0.3em] mb-3 opacity-80"
                    style={{color: '#C9A961'}}
                  >
                    The Experience
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-serif text-white mb-4 leading-tight">
                    Authentic<br />Hospitality
                  </h3>
                  <div className="w-8 h-[1px] mb-4" style={{backgroundColor: '#C9A961'}}></div>
                  <p className="text-white/85 text-base leading-relaxed max-w-sm">
                    Genuine Romanian warmth where every guest becomes family.
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
                <div className="absolute inset-0" style={{background: 'linear-gradient(to top, rgba(107, 68, 35, 0.9) 0%, rgba(107, 68, 35, 0.3) 60%, transparent 100%)'}}></div>
              </div>
              <div className="relative z-10 h-full flex items-end p-8 sm:p-12">
                <div>
                  <span 
                    className="block text-xs uppercase tracking-[0.3em] mb-3 opacity-80"
                    style={{color: '#C9A961'}}
                  >
                    The Craftsmanship
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-serif text-white mb-4 leading-tight">
                    Rustic<br />Luxury
                  </h3>
                  <div className="w-8 h-[1px] mb-4" style={{backgroundColor: '#C9A961'}}></div>
                  <p className="text-white/85 text-base leading-relaxed max-w-sm">
                    Hand-carved interiors blending artisanal heritage with modern comfort.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="mt-20 py-12 px-4 sm:px-6 lg:px-8" style={{background: 'linear-gradient(to bottom, #FFF8F0, #EDE5D8)'}}>
          <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            <div className="text-center">
              <div className="w-14 h-14 mx-auto mb-4 border-2 flex items-center justify-center" style={{borderColor: '#C9A961'}}>
                <div className="w-10 h-10 border" style={{borderColor: '#C9A961'}}></div>
              </div>
              <div className="text-3xl sm:text-4xl font-light mb-2" style={{color: '#6B4423'}}>2018</div>
              <div className="text-xs font-medium uppercase tracking-widest" style={{color: '#8B7355'}}>ESTABLISHED</div>
            </div>
            
            <div className="text-center">
              <div className="w-14 h-14 mx-auto mb-4 border-2 flex items-center justify-center" style={{borderColor: '#C9A961'}}>
                <div className="w-10 h-10 border" style={{borderColor: '#C9A961'}}></div>
              </div>
              <div className="text-3xl sm:text-4xl font-light mb-2" style={{color: '#6B4423'}}>12</div>
              <div className="text-xs font-medium uppercase tracking-widest" style={{color: '#8B7355'}}>LUXURY ROOMS</div>
            </div>
            
            <div className="text-center">
              <div className="w-14 h-14 mx-auto mb-4 border-2 flex items-center justify-center" style={{borderColor: '#C9A961'}}>
                <div className="w-10 h-10 border" style={{borderColor: '#C9A961'}}></div>
              </div>
              <div className="text-3xl sm:text-4xl font-light mb-2" style={{color: '#6B4423'}}>100%</div>
              <div className="text-xs font-medium uppercase tracking-widest" style={{color: '#8B7355'}}>GUEST SATISFACTION</div>
            </div>
            
            <div className="text-center">
              <div className="w-14 h-14 mx-auto mb-4 border-2 flex items-center justify-center" style={{borderColor: '#C9A961'}}>
                <div className="w-10 h-10 border" style={{borderColor: '#C9A961'}}></div>
              </div>
              <div className="text-3xl sm:text-4xl font-light mb-2" style={{color: '#6B4423'}}>24/7</div>
              <div className="text-xs font-medium uppercase tracking-widest" style={{color: '#8B7355'}}>CONCIERGE SERVICE</div>
            </div>
          </div>
        </div>

      </section>

      {/* Scroll-reveal image sections */}
      <ImageRevealSection
        imageSrc="/nature.jpg"
        imageAlt="Surrounding nature at Timian Chalet"
        layout="imageLeft"
        scaleX={0.55}
        scaleY={0.55}
        offsetX={50}
        offsetY={40}
        overlayText={
          <div className="text-center px-6">
            <div className="flex items-center justify-center mb-4">
              <div className="w-8 h-[1px] bg-[#C9A961]" />
              <div className="w-2 h-2 mx-3 border border-[#C9A961]" />
              <div className="w-8 h-[1px] bg-[#C9A961]" />
            </div>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-serif text-white drop-shadow-lg">
              Surrounding Nature
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
              The Location
            </span>
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl font-serif leading-tight mb-6"
              style={{ color: "#6B4423" }}
            >
              Surrounding
              <br />
              Nature
            </h2>
            <div
              className="w-12 h-[1px] mb-6"
              style={{ backgroundColor: "#C9A961" }}
            />
            <p
              className="text-lg leading-relaxed"
              style={{ color: "#6B5D53" }}
            >
              Immerse yourself in the breathtaking alpine landscape where
              pristine peaks meet endless skies. Our chalet is nestled in the
              heart of untouched wilderness, offering you a sanctuary of natural
              beauty.
            </p>
          </div>
        }
      />

      <ImageRevealSection
        imageSrc="/the_chalet.jpg"
        imageAlt="Timian Chalet building exterior"
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
              Chalet Building
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
              The Architecture
            </span>
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl font-serif leading-tight mb-6"
              style={{ color: "#6B4423" }}
            >
              Chalet
              <br />
              Building
            </h2>
            <div
              className="w-12 h-[1px] mb-6"
              style={{ backgroundColor: "#C9A961" }}
            />
            <p
              className="text-lg leading-relaxed"
              style={{ color: "#6B5D53" }}
            >
              Traditional alpine architecture meets contemporary luxury. Our
              meticulously restored chalet combines authentic wooden
              craftsmanship with modern amenities, creating an atmosphere of
              timeless elegance.
            </p>
          </div>
        }
      />
    </main>
  );
}
