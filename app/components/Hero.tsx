"use client";


export default function Hero() {
  return (
    <section id="top" className="relative min-h-screen w-full overflow-hidden">
      <VideoBackground />

      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 h-screen flex flex-col items-center justify-center text-center">


        <h1 className="text-6xl sm:text-7xl md:text-9xl tracking-[0.35em] text-white uppercase">
          TIMIAN
        </h1>
        
        <div className="flex items-center justify-center mt-4">
          <div className="w-32 h-0.5" style={{backgroundColor: '#C9A961'}}></div>
          <h2 className="mx-4 text-2xl sm:text-3xl tracking-[0.35em] text-white uppercase">
            CHALET
          </h2>
          <div className="w-32 h-0.5" style={{backgroundColor: '#C9A961'}}></div>
        </div>
        
        <p className="mt-6 text-xl sm:text-2xl text-white italic font-light">
          Transylvanian Mountain Retreat
        </p>
        
        <div className="mt-12 flex flex-col sm:flex-row gap-6">
        <a
    href="#rooms"
    className="inline-flex items-center justify-center text-white px-8 py-4 text-sm font-semibold tracking-wider uppercase transition-colors"
    style={{ backgroundColor: '#C9A961' }}
    onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
      e.currentTarget.style.backgroundColor = '#B89A51';
    }}
    onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
      e.currentTarget.style.backgroundColor = '#C9A961';
    }}
  >
    EXPLORE ROOMS
    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  </a>
          <a href="#contact" className="inline-flex items-center justify-center border-2 border-white text-white px-8 py-4 text-sm font-semibold tracking-wider uppercase hover:bg-white/10 transition-colors">
            BOOK YOUR STAY
          </a>
        </div>
      </div>

      <ScrollCue />
    </section>
  );
}

function VideoBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <video
        className="absolute inset-0 min-h-full min-w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/nature-optimized.jpg"
        style={{ minHeight: "100%", minWidth: "100%" }}
      >
        <source src="/Timian2.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
    </div>
  );
}

function ScrollCue() {
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-white text-xs flex flex-col items-center">
      <span className="tracking-wider uppercase font-semibold">DISCOVER</span>
      <span className="mt-2 inline-flex h-6 w-[2px] overflow-hidden rounded-full bg-white/30">
        <span className="animate-bounceSlow h-3 w-full bg-white" />
      </span>
    </div>
  );
}



