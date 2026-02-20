"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Phone, Mail } from "lucide-react";
import Image from "next/image";
import Logo from "./Logo";
import { useLanguage, useT } from "../i18n/LanguageContext";
import { tr } from "../i18n/translations";
import type { Language } from "../i18n/translations";
import { colors, rgba } from "../theme/colors";

const LANGUAGES: { code: Language; label: string }[] = [
  { code: "en", label: "english" },
  { code: "ro", label: "română" },
  { code: "hu", label: "magyar" },
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const HAMBURGER_LINE_WIDTH = 50;
const HAMBURGER_LINE_HEIGHT = 1;
const HAMBURGER_LINE_GAP = 5;
const HAMBURGER_LINE_DELAYS = [0, 0.08, 0.16];

const THEMES = {
  dark: {
    fg: "#FFFFFF",
    fgMuted: "rgba(255,255,255,0.7)",
    fgDim: "rgba(255,255,255,0.3)",
    border: "rgba(255,255,255,0.4)",
    hoverBg: "rgba(255,255,255,0.1)",
    hamburgerHoverFg: colors.textPrimary,
    hoverCircle: "#FFFFFF",
    bookBg: colors.primaryBg,
    bookText: colors.textPrimary,
    bookBorder: rgba(colors.border, 0.5),
    accent: colors.cta,
  },
  light: {
    fg: colors.textPrimary,
    fgMuted: rgba(colors.textPrimary, 0.7),
    fgDim: rgba(colors.textPrimary, 0.3),
    border: rgba(colors.textPrimary, 0.4),
    hoverBg: rgba(colors.textPrimary, 0.1),
    hamburgerHoverFg: colors.primaryBg,
    hoverCircle: colors.textPrimary,
    bookBg: colors.textPrimary,
    bookText: colors.primaryBg,
    bookBorder: rgba(colors.textPrimary, 0.5),
    accent: colors.cta,
  },
};

const MENU_SECTIONS = [
  {
    headline: tr.menu.aboutHotel,
    links: [
      { label: tr.menu.story, href: "#story" },
      { label: tr.menu.location, href: "#location" },
      { label: tr.menu.shop, href: "#shop" },
    ],
  },
  {
    headline: tr.menu.rooms,
    links: [
      { label: tr.menu.grove, href: "#grove" },
      { label: tr.menu.leafage, href: "#leafage" },
      { label: tr.menu.thyme, href: "#thyme" },
      { label: tr.menu.cone, href: "#cone" },
      { label: tr.menu.lichen, href: "#lichen" },
      { label: tr.menu.mineral, href: "#mineral" },
      { label: tr.menu.dawn, href: "#dawn" },
      { label: tr.menu.treasure, href: "#treasure" },
      { label: tr.menu.miniChalet, href: "#mini-chalet" },
    ],
  },
  {
    headline: tr.menu.culinary,
    links: [
      { label: tr.menu.restaurant, href: "#restaurant" },
      { label: tr.menu.localCheese, href: "#local-cheese" },
    ],
  },
  {
    headline: tr.menu.experiences,
    links: [
      { label: tr.menu.wellness, href: "#wellness" },
      { label: tr.menu.sports, href: "#sports" },
      { label: tr.menu.buggyTour, href: "#buggy-tour" },
      { label: tr.menu.attractions, href: "#attractions" },
    ],
  },
];

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
};

export default function FloatingMenu() {
  const { lang, setLang } = useLanguage();
  const t = useT();
  const [hidden, setHidden] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [menuHover, setMenuHover] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const bookRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Scroll direction tracking
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (y > window.innerHeight * 2) {
        const delta = y - lastY;
        if (delta > 5) setHidden(true);
        else if (delta < -5) setHidden(false);
      } else {
        setHidden(false);
      }
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Theme detection
  const detectTheme = useCallback(() => {
    const btn = bookRef.current;
    if (!btn) return;
    const r = btn.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const sections = document.querySelectorAll<HTMLElement>("[data-theme]");
    let found: "light" | "dark" | null = null;
    sections.forEach((s) => {
      const t = s.getAttribute("data-theme");
      if (t !== "light" && t !== "dark") return;
      const sr = s.getBoundingClientRect();
      if (cx >= sr.left && cx <= sr.right && cy >= sr.top && cy <= sr.bottom)
        found = t;
    });
    if (found) setTheme(found);
  }, []);

  useEffect(() => {
    detectTheme();
    window.addEventListener("scroll", detectTheme, { passive: true });
    window.addEventListener("resize", detectTheme);
    const obs = new IntersectionObserver(() => detectTheme(), { threshold: 0 });
    document.querySelectorAll("[data-theme]").forEach((s) => obs.observe(s));
    return () => {
      obs.disconnect();
      window.removeEventListener("scroll", detectTheme);
      window.removeEventListener("resize", detectTheme);
    };
  }, [detectTheme]);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Close menu on Escape
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  // When menu is open, force dark theme for nav elements (overlay is always dark)
  const effectiveTheme = menuOpen ? "dark" : theme;
  const tc = THEMES[effectiveTheme];

  const showLogo = !menuOpen && (isMobile || !hidden);
  const showExtras = !hidden;

  return (
    <>
      {/* Top navigation bar */}
      <nav className="fixed top-0 left-0 right-0 z-[100] pointer-events-none">
        <div className="flex items-center justify-between px-5 py-3 md:px-8 md:py-5">
          {/* ── Left group ── */}
          <div className="flex items-center pointer-events-auto">
            {/* Hamburger / Close */}
            <button
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((v) => !v)}
              onMouseEnter={() => setMenuHover(true)}
              onMouseLeave={() => setMenuHover(false)}
              className="relative flex items-center justify-center cursor-pointer shrink-0"
              style={{
                width: 55,
                height: 55,
                background: "none",
                border: "none",
                outline: "none",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              <motion.span
                className="absolute rounded-full pointer-events-none hidden md:block"
                style={{ width: 70, height: 70 }}
                initial={false}
                animate={{
                  scale: menuHover ? 1 : 0,
                  opacity: menuHover ? 1 : 0,
                  backgroundColor: tc.hoverCircle,
                }}
                transition={{ duration: 0.3, ease: EASE }}
              />
              <span
                className="relative flex flex-col items-center justify-center"
                style={{ gap: HAMBURGER_LINE_GAP }}
              >
                {HAMBURGER_LINE_DELAYS.map((delay, i) => (
                  <motion.span
                    key={i}
                    initial={{ width: 0 }}
                    animate={{
                      width: HAMBURGER_LINE_WIDTH,
                      rotate: menuOpen ? (i === 0 ? 45 : i === 2 ? -45 : 0) : 0,
                      y: menuOpen ? (i === 0 ? HAMBURGER_LINE_GAP + HAMBURGER_LINE_HEIGHT : i === 2 ? -(HAMBURGER_LINE_GAP + HAMBURGER_LINE_HEIGHT) : 0) : 0,
                      opacity: menuOpen && i === 1 ? 0 : 1,
                    }}
                    transition={{
                      width: { duration: 0.5, delay: 4.3 + delay, ease: EASE },
                      rotate: { duration: 0.35, ease: EASE },
                      y: { duration: 0.35, ease: EASE },
                      opacity: { duration: 0.2 },
                    }}
                    style={{
                      height: HAMBURGER_LINE_HEIGHT,
                      borderRadius: 2,
                      backgroundColor: menuHover ? tc.hamburgerHoverFg : tc.fg,
                      display: "block",
                      transformOrigin: "center",
                      transition: "background-color 0.25s ease",
                    }}
                  />
                ))}
              </span>
            </button>

            {/* Logo */}
            <motion.div
              className="h-4 md:h-5 ml-2 md:ml-3"
              animate={{
                opacity: showLogo ? 1 : 0,
                y: showLogo ? 0 : -40,
              }}
              transition={{ duration: 0.4, ease: EASE }}
              style={{ pointerEvents: showLogo ? "auto" : "none" }}
            >
              <Logo color={tc.fg} />
            </motion.div>

            {/* Language selector — desktop only */}
            <motion.div
              className="hidden md:flex items-center ml-5 text-[11px] tracking-[0.15em]"
              animate={{
                opacity: showExtras ? 1 : 0,
                y: showExtras ? 0 : -40,
              }}
              transition={{ duration: 0.4, ease: EASE }}
              style={{ pointerEvents: showExtras ? "auto" : "none" }}
            >
              {LANGUAGES.map((l, i) => (
                <React.Fragment key={l.code}>
                  {i > 0 && (
                    <span style={{ color: tc.fgDim, transition: "color 0.15s ease" }} className="select-none px-4">|</span>
                  )}
                  <button
                    onClick={() => setLang(l.code)}
                    className="px-1.5 py-1"
                    style={{
                      color: lang === l.code ? tc.fg : tc.fgMuted,
                      backgroundImage: "linear-gradient(currentColor, currentColor)",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "left bottom",
                      backgroundSize: lang === l.code ? "100% 1px" : "0% 1px",
                      transition: "color 0.15s ease, background-size 0.25s ease-in-out",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = tc.fg;
                      e.currentTarget.style.backgroundSize = "100% 1px";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = lang === l.code ? tc.fg : tc.fgMuted;
                      e.currentTarget.style.backgroundSize = lang === l.code ? "100% 1px" : "0% 1px";
                    }}
                  >
                    {l.label}
                  </button>
                </React.Fragment>
              ))}
            </motion.div>
          </div>

          {/* ── Right group ── */}
          <div className="flex items-center gap-2 md:gap-3 pointer-events-auto">
            {/* Social icons — desktop only */}
            <motion.div
              className="hidden md:flex items-center gap-2"
              animate={{
                opacity: showExtras ? 1 : 0,
                y: showExtras ? 0 : -40,
              }}
              transition={{ duration: 0.4, ease: EASE }}
              style={{ pointerEvents: showExtras ? "auto" : "none" }}
            >
              <CircleLink href="https://www.facebook.com/timianchalet/" label="Facebook" color={tc.fg} borderColor={tc.border} hoverBg={tc.hoverBg}>
                <FacebookIcon />
              </CircleLink>
              <CircleLink href="https://www.instagram.com/timian.chalet/" label="Instagram" color={tc.fg} borderColor={tc.border} hoverBg={tc.hoverBg}>
                <InstagramIcon />
              </CircleLink>
              <CircleLink href="mailto:contact@timian.ro" label="Email" color={tc.fg} borderColor={tc.border} hoverBg={tc.hoverBg}>
                <Mail size={14} strokeWidth={1.5} />
              </CircleLink>
            </motion.div>

            {/* Phone — mobile only */}
            <CircleLink
              href="tel:+40740207200"
              label="Call us"
              color={tc.fg}
              borderColor={tc.border}
              hoverBg={tc.hoverBg}
              className="md:hidden"
              size={36}
              external={false}
            >
              <Phone size={14} strokeWidth={1.5} />
            </CircleLink>

            {/* Book Now */}
            <motion.a
              ref={bookRef}
              href="#book"
              className="relative flex items-center justify-center overflow-hidden rounded-full px-2 py-2 text-sm font-medium tracking-[0.15em] shadow-lg"
              animate={{
                backgroundColor: tc.bookBg,
                color: tc.bookText,
              }}
              transition={{ duration: 0.01, ease: "easeInOut" }}
              style={{
                textDecoration: "none",
                WebkitTapHighlightColor: "transparent",
              }}
              initial="rest"
              whileHover="hover"
            >
              <motion.div
                variants={{
                  rest: { x: -20, opacity: 0 },
                  hover: { x: 0, opacity: 1 },
                }}
                transition={{ duration: 0.4, ease: EASE }}
                className="mr-2"
              >
                <ArrowRight size={16} color={tc.accent} strokeWidth={2} />
              </motion.div>
              <motion.span
                variants={{
                  rest: { x: -10 },
                  hover: { x: 0 },
                }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                {t(tr.nav.bookNow)}
              </motion.span>
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ border: `1px solid ${tc.bookBorder}`, transition: "border-color 0.15s ease" }}
                variants={{
                  rest: { opacity: 0.5 },
                  hover: { opacity: 1, scale: 1.02 },
                }}
              />
            </motion.a>
          </div>
        </div>
      </nav>

      {/* Mobile side social — left side, under hamburger */}
      <motion.div
        className="md:hidden fixed z-[100] flex flex-col gap-2"
        style={{ left: 30, top: 75 }}
        animate={{
          opacity: showExtras ? 1 : 0,
          x: showExtras ? 0 : -50,
        }}
        transition={{ duration: 0.4, ease: EASE }}
      >
        <CircleLink href="https://www.facebook.com/timianchalet/" label="Facebook" size={34} color={tc.fg} borderColor={tc.border} hoverBg={tc.hoverBg}>
          <FacebookIcon size={12} />
        </CircleLink>
        <CircleLink href="https://www.instagram.com/timian.chalet/" label="Instagram" size={34} color={tc.fg} borderColor={tc.border} hoverBg={tc.hoverBg}>
          <InstagramIcon size={12} />
        </CircleLink>
      </motion.div>

      {/* ── Fullscreen Menu Overlay ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed z-[99] overflow-hidden"
            style={{
              inset: 8,
              borderRadius: 20,
              backgroundColor: rgba(colors.textPrimary, 0.85),
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
            }}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <div className="h-full overflow-y-auto">
              {/* Desktop layout: two columns */}
              <div className="hidden md:flex h-full min-h-full">
                {/* Left column — logo centered, utility links below */}
                <div className="w-[32%] max-w-sm relative flex items-center justify-center h-full border-r border-white/[0.07] px-12">
                  <Image
                    src="/timian_chalet_logo_w.png"
                    alt="Timian Chalet"
                    width={200}
                    height={40}
                    className="w-44 h-auto opacity-80"
                  />
                  <nav className="absolute bottom-[22%] left-0 right-0 flex flex-col items-center gap-3">
                    {[tr.menu.press, tr.menu.contact, tr.menu.privacyPolicy].map((item) => (
                      <a
                        key={t(item)}
                        href="#"
                        onClick={closeMenu}
                        className="text-sm text-white/40 hover:text-white transition-colors"
                      >
                        {t(item)}
                      </a>
                    ))}
                  </nav>
                </div>

                {/* Right column — single-column section lists */}
                <motion.div
                  className="flex-1 px-10 lg:px-14 xl:px-20 pt-28 pb-12 overflow-y-auto"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                >
                  {MENU_SECTIONS.map((section, si) => (
                    <motion.div key={si} variants={fadeUp} className={si > 0 ? "mt-8" : ""}>
                      <h3
                        className="text-[10px] uppercase tracking-[0.3em] font-medium pb-3 mb-1 border-b border-white/10"
                        style={{ color: colors.cta }}
                      >
                        {t(section.headline)}
                      </h3>
                      <ul>
                        {section.links.map((link) => (
                          <li key={link.href}>
                            <a
                              href={link.href}
                              onClick={closeMenu}
                              className="group flex items-center justify-between py-2.5 px-4 -mx-4 rounded-lg border border-transparent hover:border-white/[0.12] transition-all duration-300"
                            >
                              <span className="text-lg lg:text-xl font-serif text-white/70 group-hover:text-white transition-colors duration-300">
                                {t(link.label)}
                              </span>
                              <ArrowRight
                                size={16}
                                strokeWidth={1.5}
                                className="text-white/0 group-hover:text-white/50 translate-x-0 group-hover:translate-x-1.5 transition-all duration-300"
                              />
                            </a>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Mobile layout: single column with sections */}
              <motion.div
                className="md:hidden px-6 pt-24 pb-12"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {MENU_SECTIONS.map((section, si) => (
                  <motion.div key={si} variants={fadeUp} className={si > 0 ? "mt-8" : ""}>
                    <h3
                      className="text-[10px] uppercase tracking-[0.3em] font-medium pb-3 mb-1 border-b border-white/10"
                      style={{ color: colors.cta }}
                    >
                      {t(section.headline)}
                    </h3>
                    <ul>
                      {section.links.map((link) => (
                        <li key={link.href}>
                          <a
                            href={link.href}
                            onClick={closeMenu}
                            className="group flex items-center justify-between py-2.5 px-3 -mx-3 rounded-lg border border-transparent hover:border-white/[0.12] transition-all duration-300"
                          >
                            <span className="text-xl font-serif text-white/70 group-hover:text-white transition-colors duration-300">
                              {t(link.label)}
                            </span>
                            <ArrowRight
                              size={16}
                              strokeWidth={1.5}
                              className="text-white/0 group-hover:text-white/50 translate-x-0 group-hover:translate-x-1.5 transition-all duration-300"
                            />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ── Sub-components ────────────────────────────────── */

function CircleLink({
  href,
  label,
  size = 36,
  children,
  color,
  borderColor,
  hoverBg,
  className = "",
  external = true,
}: {
  href: string;
  label: string;
  size?: number;
  children: React.ReactNode;
  color: string;
  borderColor: string;
  hoverBg: string;
  className?: string;
  external?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      aria-label={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`flex items-center justify-center rounded-full transition-colors ${className}`}
      style={{
        width: size,
        height: size,
        border: `1px solid ${borderColor}`,
        color,
        backgroundColor: hovered ? hoverBg : "transparent",
        transition: "background-color 0.2s ease, border-color 0.15s ease, color 0.15s ease",
      }}
    >
      {children}
    </a>
  );
}

function FacebookIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}
