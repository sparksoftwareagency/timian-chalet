import dynamic from "next/dynamic";
import Image from "next/image";

const Hero = dynamic(() => import("./components/Hero"), { ssr: true });

export default function Home() {
  return (
    <main className="w-full">
      <Hero />

      <section id="about" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24" style={{backgroundColor: '#FFF8F0'}}>
        {/* Welcome Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight" style={{color: '#6B4423'}}>Welcome to Timian Chalet</h2>
          <div className="w-16 h-0.5 mx-auto mt-4" style={{backgroundColor: '#D2B48C'}}></div>
          <p className="mt-6 text-lg sm:text-xl max-w-4xl mx-auto" style={{color: '#6B5D53'}}>
            Nestled in the heart of the Carpathian Mountains, Timian Chalet offers an authentic Transylvanian escape where traditional Romanian craftsmanship meets rustic luxury.
          </p>
        </div>

        {/* Feature Sections with TIMIAN Watermark */}
        <div className="relative">
          {/* TIMIAN Watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-8xl sm:text-9xl font-bold opacity-5" style={{color: '#D2B48C'}}>TIMIAN</span>
          </div>
          
          <div className="relative z-10 space-y-16">
            {/* Section 01 */}
            <div className="flex items-start space-x-8">
              <div className="text-6xl sm:text-7xl font-bold opacity-20" style={{color: '#D2B48C'}}>01</div>
              <div className="flex-1">
                <h3 className="text-2xl sm:text-3xl font-bold mb-4" style={{color: '#6B4423'}}>Carpathian retreat</h3>
                <p className="text-lg" style={{color: '#6B5D53'}}>
                  Surrounded by the majestic Carpathian peaks in Miercurea Ciuc, where ancient forests and pristine nature create the perfect backdrop for your mountain escape.
                </p>
              </div>
            </div>

            {/* Section 02 */}
            <div className="flex items-start space-x-8">
              <div className="text-6xl sm:text-7xl font-bold opacity-20" style={{color: '#D2B48C'}}>02</div>
              <div className="flex-1">
                <h3 className="text-2xl sm:text-3xl font-bold mb-4" style={{color: '#6B4423'}}>Authentic hospitality</h3>
                <p className="text-lg" style={{color: '#6B5D53'}}>
                  Experience genuine Romanian warmth and traditional mountain hospitality, where every guest is treated like family in our hand-crafted chalet.
                </p>
              </div>
            </div>

            {/* Section 03 */}
            <div className="flex items-start space-x-8">
              <div className="text-6xl sm:text-7xl font-bold opacity-20" style={{color: '#D2B48C'}}>03</div>
              <div className="flex-1">
                <h3 className="text-2xl sm:text-3xl font-bold mb-4" style={{color: '#6B4423'}}>Rustic luxury</h3>
                <p className="text-lg" style={{color: '#6B5D53'}}>
                  Hand-carved wooden interiors, natural stone fireplaces, and artisanal craftsmanship blend with modern comforts for an unforgettable mountain experience.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8 p-8 rounded-lg" style={{background: 'linear-gradient(to bottom, #FFF8F0, #E8DCC8)'}}>
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 border-2" style={{borderColor: '#D2B48C'}}></div>
            <div className="text-3xl sm:text-4xl font-bold mb-2" style={{color: '#6B4423'}}>2018</div>
            <div className="text-sm font-semibold uppercase tracking-wide" style={{color: '#6B5D53'}}>ESTABLISHED</div>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 border-2" style={{borderColor: '#D2B48C'}}></div>
            <div className="text-3xl sm:text-4xl font-bold mb-2" style={{color: '#6B4423'}}>12</div>
            <div className="text-sm font-semibold uppercase tracking-wide" style={{color: '#6B5D53'}}>LUXURY ROOMS</div>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 border-2" style={{borderColor: '#D2B48C'}}></div>
            <div className="text-3xl sm:text-4xl font-bold mb-2" style={{color: '#6B4423'}}>100%</div>
            <div className="text-sm font-semibold uppercase tracking-wide" style={{color: '#6B5D53'}}>GUEST SATISFACTION</div>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 border-2" style={{borderColor: '#D2B48C'}}></div>
            <div className="text-3xl sm:text-4xl font-bold mb-2" style={{color: '#6B4423'}}>24/7</div>
            <div className="text-sm font-semibold uppercase tracking-wide" style={{color: '#6B5D53'}}>CONCIERGE SERVICE</div>
          </div>
        </div>

        {/* Decorative Divider */}
        <div className="mt-16 flex items-center justify-center">
          <div className="flex items-center space-x-1">
            <div className="w-8 h-0.5" style={{backgroundColor: '#C9A961'}}></div>
            <div className="w-2 h-2" style={{backgroundColor: '#8B4513'}}></div>
            <div className="w-4 h-0.5" style={{backgroundColor: '#C9A961'}}></div>
            <div className="w-3 h-3" style={{backgroundColor: '#C9A961'}}></div>
            <div className="w-4 h-0.5" style={{backgroundColor: '#C9A961'}}></div>
            <div className="w-2 h-2" style={{backgroundColor: '#8B4513'}}></div>
            <div className="w-8 h-0.5" style={{backgroundColor: '#C9A961'}}></div>
          </div>
        </div>
      </section>

      {/* Full Screen Nature Image Section */}
      <section className="relative h-screen w-full overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/nature.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            filter: "brightness(0.6)"
          }}
        ></div>
        {/* Content */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center px-4 sm:px-6 lg:px-8 max-w-4xl">
            {/* Top decorative line */}
            <div className="flex items-center justify-center mb-6">
              <div className="w-8 h-0.5" style={{backgroundColor: '#C9A961'}}></div>
              <div className="w-2 h-2 mx-2 border" style={{borderColor: '#C9A961'}}></div>
              <div className="w-8 h-0.5" style={{backgroundColor: '#C9A961'}}></div>
            </div>
            
            {/* Main heading */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              SURROUNDING NATURE
            </h2>
            
            {/* Bottom decorative line */}
            <div className="w-16 h-0.5 mx-auto mb-8" style={{backgroundColor: '#C9A961'}}></div>
            
            {/* Description text */}
            <p className="text-lg sm:text-xl text-white leading-relaxed max-w-3xl mx-auto drop-shadow-md">
              Immerse yourself in the breathtaking alpine landscape where pristine peaks meet endless skies. Our chalet is nestled in the heart of untouched wilderness, offering you a sanctuary of natural beauty.
            </p>
            
            {/* Bottom decorative square */}
            <div className="mt-8">
              <div className="w-2 h-2 mx-auto" style={{backgroundColor: '#C9A961'}}></div>
            </div>
          </div>
        </div>
      </section>


      <section className="flex items-center justify-center py-4">
      {/* Decorative Divider */}
        <div className="flex items-center justify-center">
            <div className="flex items-center space-x-1">
              <div className="w-8 h-0.5" style={{backgroundColor: '#C9A961'}}></div>
              <div className="w-2 h-2" style={{backgroundColor: '#8B4513'}}></div>
              <div className="w-4 h-0.5" style={{backgroundColor: '#C9A961'}}></div>
              <div className="w-3 h-3" style={{backgroundColor: '#C9A961'}}></div>
              <div className="w-4 h-0.5" style={{backgroundColor: '#C9A961'}}></div>
              <div className="w-2 h-2" style={{backgroundColor: '#8B4513'}}></div>
              <div className="w-8 h-0.5" style={{backgroundColor: '#C9A961'}}></div>
            </div>
          </div>
        </section>

      {/* Full Screen Chalet Building Image Section */}
      <section className="relative h-screen w-full overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/the_chalet.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            filter: "brightness(0.6)"
          }}
        ></div>
        {/* Content */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center px-4 sm:px-6 lg:px-8 max-w-4xl">
            {/* Top decorative line */}
            <div className="flex items-center justify-center mb-6">
              <div className="w-8 h-0.5" style={{backgroundColor: '#C9A961'}}></div>
              <div className="w-2 h-2 mx-2 border" style={{borderColor: '#C9A961'}}></div>
              <div className="w-8 h-0.5" style={{backgroundColor: '#C9A961'}}></div>
            </div>
            
            {/* Main heading */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg">
                CHALET BUILDING 
            </h2>
            
            {/* Bottom decorative line */}
            <div className="w-16 h-0.5 mx-auto mb-8" style={{backgroundColor: '#C9A961'}}></div>
            
            {/* Description text */}
            <p className="text-lg sm:text-xl text-white leading-relaxed max-w-3xl mx-auto drop-shadow-md">
            Traditional alpine architecture meets contemporary luxury. Our meticulously restored chalet combines authentic wooden craftsmanship with modern amenities, creating an atmosphere of timeless elegance.
            </p>
            
            {/* Bottom decorative square */}
            <div className="mt-8">
              <div className="w-2 h-2 mx-auto" style={{backgroundColor: '#C9A961'}}></div>
            </div>
          </div>
        </div>
      </section>


      
    </main>
  );
}

function RoomCard({ title, description, price }: { title: string; description: string; price: string }) {
  return (
    <div className="rounded-xl border border-gray-200 p-5" style={{backgroundColor: '#F5F0E8'}}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
        <span className="text-sm text-gray-900">{price}</span>
      </div>
      <a href="#contact" className="mt-4 inline-block text-sm text-gray-600 hover:text-gray-900">Book</a>
    </div>
  );
}

function GalleryBox() {
  return <div className="aspect-square rounded-lg bg-gray-200" />;
}
