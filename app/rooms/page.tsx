"use client";

import Image from "next/image";

export default function RoomsPage() {
  return (
    <main>
      <RoomsHero />
      <RoomsContent />
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
            style={{ borderColor: "#C9A961" }}
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

function RoomsContent() {
  const rooms = [
    {
      name: "Mountain Suite",
      description: "Spacious suite with panoramic mountain views, featuring a king-size bed, private balcony, and luxurious bathroom with soaking tub.",
      size: "65 m²",
      capacity: "2 guests",
      image: "/rooms-thumbnail.jpg",
    },
    {
      name: "Forest Retreat",
      description: "Intimate room surrounded by ancient forest, with floor-to-ceiling windows, queen bed, and cozy reading nook.",
      size: "45 m²",
      capacity: "2 guests",
      image: "/nature-optimized.jpg",
    },
    {
      name: "Chalet Master",
      description: "Our flagship accommodation featuring a private living area, fireplace, premium amenities, and unparalleled views of the Transylvanian peaks.",
      size: "85 m²",
      capacity: "4 guests",
      image: "/the_chalet.jpg",
    },
  ];

  return (
    <section className="bg-neutral-950 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-[1px]" style={{ backgroundColor: "#C9A961" }} />
            <div 
              className="w-3 h-3 mx-4 border rotate-45"
              style={{ borderColor: "#C9A961" }}
            />
            <div className="w-16 h-[1px]" style={{ backgroundColor: "#C9A961" }} />
          </div>
          <h2 className="text-3xl sm:text-4xl text-white tracking-wider uppercase font-light">
            Choose Your Sanctuary
          </h2>
          <p className="mt-4 text-white/60 max-w-2xl mx-auto">
            Each room is thoughtfully designed to provide the perfect balance of rustic charm and modern luxury.
          </p>
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {rooms.map((room, index) => (
            <RoomCard key={index} room={room} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface Room {
  name: string;
  description: string;
  size: string;
  capacity: string;
  image: string;
}

function RoomCard({ room }: { room: Room }) {
  return (
    <div className="group relative bg-neutral-900 overflow-hidden">
      {/* Image */}
      <div className="relative h-72 overflow-hidden">
        <Image
          src={room.image}
          alt={room.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 1024px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl text-white tracking-wider uppercase mb-3">
          {room.name}
        </h3>
        <p className="text-white/60 text-sm leading-relaxed mb-4">
          {room.description}
        </p>

        {/* Details */}
        <div className="flex gap-6 text-sm text-white/50 mb-6">
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V6a2 2 0 012-2h12a2 2 0 012 2v2M4 8v10a2 2 0 002 2h12a2 2 0 002-2V8M4 8h16" />
            </svg>
            {room.size}
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            {room.capacity}
          </span>
        </div>

        {/* Button */}
        <button
          className="w-full py-3 text-sm tracking-wider uppercase text-white border transition-all duration-300 hover:bg-white hover:text-neutral-900"
          style={{ borderColor: "#C9A961" }}
        >
          View Details
        </button>
      </div>
    </div>
  );
}
