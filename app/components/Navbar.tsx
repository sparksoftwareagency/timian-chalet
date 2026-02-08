"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "./Logo";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggle = () => setIsOpen((v) => !v);
  const close = () => setIsOpen(false);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        isScrolled || isOpen ? "bg-black/60 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="h-16 grid grid-cols-2 md:grid-cols-3 items-center">
          <div className="justify-self-start">
            <Link href="/" className="flex items-center" onClick={close}>
              <div className="h-6 w-auto">
                <Logo />
              </div>
            </Link>
          </div>

          <div className="hidden md:flex justify-center items-center gap-8">
            <NavLink href="/rooms" onClick={close}>Rooms</NavLink>
            <NavLink href="#culinary" onClick={close}>Culinary</NavLink>
            <NavLink href="#experience" onClick={close}>Experience</NavLink>
            <NavLink href="#contact" onClick={close}>Contact</NavLink>
          </div>

          <div className="justify-self-end flex items-center">
            <div className="hidden md:block">
              <BookStayButton />
            </div>
            <button
              aria-label="Toggle menu"
              className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
              onClick={toggle}
            >
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                ) : (
                  <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col gap-2">
              <MobileLink href="/rooms" onClick={close}>Rooms</MobileLink>
              <MobileLink href="#culinary" onClick={close}>Culinary</MobileLink>
              <MobileLink href="#experience" onClick={close}>Experience</MobileLink>
              <MobileLink href="#contact" onClick={close}>Contact</MobileLink>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

function NavLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="text-white/90 hover:text-white transition-colors text-sm"
    >
      {children}
    </Link>
  );
}

function MobileLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="px-3 py-2 rounded-md text-white/90 hover:text-white hover:bg-white/10"
    >
      {children}
    </Link>
  );
}

function BookStayButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="px-6 py-2.5 font-medium text-white transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/30"
      style={{
        backgroundColor: '#8B4513',
        border: '2px solid #C9A961',
      }}
    >
      Book Stay
    </button>
  );
}



