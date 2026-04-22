"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import Logo from "@/app/components/Logo";
import { localizeHref, switchLocaleInPathname, type SiteLocale } from "@/app/lib/locale";
import { colors, rgba } from "@/app/theme/colors";
import type { NavigationData, SiteSettingsData } from "@/sanity/lib/queries";

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
} as const;

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
};

function isExternalHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://") || href.startsWith("mailto:") || href.startsWith("tel:");
}

function resolveHref(locale: SiteLocale, href: string) {
  return isExternalHref(href) ? href : localizeHref(locale, href);
}

function resolveBookNowHref(locale: SiteLocale, bookNowLink: string) {
  const normalizedLink = bookNowLink.trim();

  if (!normalizedLink) {
    return `/${locale}/book-now`;
  }

  if (isExternalHref(normalizedLink)) {
    return normalizedLink;
  }

  const pathWithoutHash = normalizedLink.split("#")[0];
  if (pathWithoutHash === "/book-now" || pathWithoutHash === `/${locale}/book-now` || pathWithoutHash === "book-now") {
    return localizeHref(locale, "/book-now");
  }

  return `/${locale}/book-now`;
}

export default function FloatingMenu({
  locale,
  navigation,
  settings,
}: {
  locale: SiteLocale;
  navigation: NavigationData;
  settings: SiteSettingsData;
}) {
  const navRef = useRef<HTMLElement>(null);
  const [hidden, setHidden] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [menuHover, setMenuHover] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const bookRef = useRef<HTMLAnchorElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const pathname = usePathname();

  const languageOptions = useMemo(
    () => [
      { code: "en" as const, label: navigation.languageSwitcherLabelEnglish },
      { code: "ro" as const, label: navigation.languageSwitcherLabelRomanian },
      { code: "hu" as const, label: navigation.languageSwitcherLabelHungarian },
    ],
    [navigation]
  );

  const menuSections = useMemo(() => {
    return navigation.menuGroups.map((group) => ({
      headline: group.headline,
      links: group.links.map((link) => ({
        label: link.label,
        href: resolveHref(locale, link.href),
        openInNewTab: link.openInNewTab,
      })),
    }));
  }, [locale, navigation.menuGroups]);

  const bookNowHref = useMemo(() => resolveBookNowHref(locale, settings.bookNowLink), [locale, settings.bookNowLink]);
  const isBookNowPage = useMemo(() => (pathname ?? "").split("#")[0].endsWith("/book-now"), [pathname]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

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

  const detectTheme = useCallback(() => {
    const sampleTargets: HTMLElement[] = [];
    if (logoRef.current) sampleTargets.push(logoRef.current);
    if (sampleTargets.length === 0 && menuButtonRef.current) sampleTargets.push(menuButtonRef.current);
    if (sampleTargets.length === 0 && bookRef.current) sampleTargets.push(bookRef.current);
    if (sampleTargets.length === 0) return;

    const samplePoints = sampleTargets.map((target) => {
      const rect = target.getBoundingClientRect();
      return {
        cx: rect.left + rect.width / 2,
        cy: rect.top + rect.height / 2,
      };
    });

    const parseColor = (value: string) => {
      const normalized = value.trim().toLowerCase();
      if (!normalized || normalized === "transparent") return null;

      const rgbMatch = normalized.match(
        /^rgba?\(\s*([0-9.]+)\s*,\s*([0-9.]+)\s*,\s*([0-9.]+)(?:\s*,\s*([0-9.]+))?\s*\)$/,
      );
      if (rgbMatch) {
        return {
          r: Number(rgbMatch[1]),
          g: Number(rgbMatch[2]),
          b: Number(rgbMatch[3]),
          a: rgbMatch[4] === undefined ? 1 : Number(rgbMatch[4]),
        };
      }

      const hexMatch = normalized.match(/^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/);
      if (!hexMatch) return null;

      const hex = hexMatch[1];
      if (hex.length === 3) {
        return {
          r: Number.parseInt(hex[0] + hex[0], 16),
          g: Number.parseInt(hex[1] + hex[1], 16),
          b: Number.parseInt(hex[2] + hex[2], 16),
          a: 1,
        };
      }

      if (hex.length === 6 || hex.length === 8) {
        return {
          r: Number.parseInt(hex.slice(0, 2), 16),
          g: Number.parseInt(hex.slice(2, 4), 16),
          b: Number.parseInt(hex.slice(4, 6), 16),
          a: hex.length === 8 ? Number.parseInt(hex.slice(6, 8), 16) / 255 : 1,
        };
      }

      return null;
    };

    const readBackgroundColor = (element: HTMLElement) => {
      let current: HTMLElement | null = element;
      while (current && current !== document.body) {
        const style = window.getComputedStyle(current);
        const parsed = parseColor(style.backgroundColor);
        if (parsed && parsed.a > 0.08) {
          return parsed;
        }
        current = current.parentElement;
      }
      return null;
    };

    const brightness = (r: number, g: number, b: number) => {
      const channel = (value: number) => {
        const normalized = value / 255;
        return normalized <= 0.03928 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
      };
      const luminance = 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
      return luminance;
    };

    const isImageSurface = (element: HTMLElement) => {
      const tag = element.tagName;
      if (tag === "IMG" || tag === "VIDEO" || tag === "CANVAS" || tag === "PICTURE") {
        return true;
      }
      const style = window.getComputedStyle(element);
      return style.backgroundImage && style.backgroundImage !== "none";
    };

    const readDataTheme = (element: HTMLElement) => {
      const value = element.getAttribute("data-theme");
      return value === "light" || value === "dark" ? value : null;
    };

    const rootNav = navRef.current;
    for (const point of samplePoints) {
      const stack = document.elementsFromPoint(point.cx, point.cy);
      const themedCandidates: HTMLElement[] = [];

      for (const candidate of stack) {
        if (!(candidate instanceof HTMLElement)) continue;
        if (rootNav?.contains(candidate)) continue;
        themedCandidates.push(candidate);
      }

      // Image-level themes win over wrapper/section themes.
      const imageThemedCandidate = themedCandidates.find((candidate) => {
        if (!isImageSurface(candidate)) return false;
        return readDataTheme(candidate) !== null;
      });
      if (imageThemedCandidate) {
        const themeValue = readDataTheme(imageThemedCandidate);
        if (themeValue) {
          setTheme(themeValue);
          return;
        }
      }

      const firstThemedCandidate = themedCandidates.find((candidate) => readDataTheme(candidate) !== null);
      if (firstThemedCandidate) {
        const themeValue = readDataTheme(firstThemedCandidate);
        if (themeValue) {
          setTheme(themeValue);
          return;
        }
      }

      for (const candidate of themedCandidates) {
        if (isImageSurface(candidate)) {
          setTheme("dark");
          return;
        }

        const bg = readBackgroundColor(candidate);
        if (!bg) continue;

        setTheme(brightness(bg.r, bg.g, bg.b) > 0.6 ? "light" : "dark");
        return;
      }
    }
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

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const effectiveTheme = menuOpen ? "dark" : theme;
  const tc = THEMES[effectiveTheme];
  const showLogo = !menuOpen && (isMobile || !hidden);
  const showExtras = !hidden;
  const showMobileSocial = showExtras && !menuOpen;
  const shouldShowMenuHover = !isMobile && !menuOpen && menuHover;

  return (
    <>
      <nav ref={navRef} className="pointer-events-none fixed left-0 right-0 top-0 z-[100]">
        <div className="flex items-center justify-between px-5 py-3 md:px-8 md:py-5">
          <div className="pointer-events-auto flex items-center">
            <button
              ref={menuButtonRef}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((v) => !v)}
              onMouseEnter={() => setMenuHover(true)}
              onMouseLeave={() => setMenuHover(false)}
              onBlur={() => setMenuHover(false)}
              onTouchStart={() => setMenuHover(false)}
              className="relative flex shrink-0 cursor-pointer touch-manipulation select-none items-center justify-center appearance-none border-0 bg-transparent p-2 md:p-0"
              style={{
                borderColor: effectiveTheme === "dark" ? tc.border : colors.border,
                background: "transparent",
                color: effectiveTheme === "dark" ? tc.fg : colors.textPrimary,
                WebkitTapHighlightColor: "transparent",
              }}
            >
              <motion.span
                className="pointer-events-none absolute hidden rounded-full md:block"
                style={{ width: 70, height: 70 }}
                initial={false}
                animate={{
                  scale: shouldShowMenuHover ? 1 : 0,
                  opacity: shouldShowMenuHover ? 1 : 0,
                  backgroundColor: tc.hoverCircle,
                }}
                transition={{ duration: 0.3, ease: EASE }}
              />
              <span className="relative flex flex-col items-center justify-center" style={{ gap: HAMBURGER_LINE_GAP }}>
                {HAMBURGER_LINE_DELAYS.map((delay, i) => (
                  <motion.span
                    key={i}
                    initial={{ width: 0 }}
                    animate={{
                      width: HAMBURGER_LINE_WIDTH,
                      rotate: menuOpen ? (i === 0 ? 45 : i === 2 ? -45 : 0) : 0,
                      y: menuOpen
                        ? i === 0
                          ? HAMBURGER_LINE_GAP + HAMBURGER_LINE_HEIGHT
                          : i === 2
                            ? -(HAMBURGER_LINE_GAP + HAMBURGER_LINE_HEIGHT)
                            : 0
                        : 0,
                      opacity: menuOpen && i === 1 ? 0 : 1,
                    }}
                    transition={{
                      width: { duration: 0.5, delay, ease: EASE },
                      rotate: { duration: 0.35, ease: EASE },
                      y: { duration: 0.35, ease: EASE },
                      opacity: { duration: 0.2 },
                    }}
                    style={{
                      height: HAMBURGER_LINE_HEIGHT,
                      borderRadius: 2,
                      backgroundColor: shouldShowMenuHover ? tc.hamburgerHoverFg : tc.fg,
                      display: "block",
                      transformOrigin: "center",
                      transition: "background-color 0.25s ease",
                    }}
                  />
                ))}
              </span>
            </button>

            <motion.a
              ref={logoRef}
              href={`/${locale}`}
              className="ml-2 h-4 md:ml-3 md:h-5"
              animate={{ opacity: showLogo ? 1 : 0, y: showLogo ? 0 : -40 }}
              transition={{ duration: 0.4, ease: EASE }}
              style={{ pointerEvents: showLogo ? "auto" : "none" }}
            >
              <Logo color={tc.fg} />
            </motion.a>

            <motion.div
              className="ml-5 hidden items-center text-[11px] tracking-[0.15em] md:flex"
              animate={{ opacity: showExtras ? 1 : 0, y: showExtras ? 0 : -40 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              {languageOptions.map((entry, idx) => {
                const href = switchLocaleInPathname(pathname || `/${locale}`, entry.code);
                const active = entry.code === locale;
                return (
                  <span key={entry.code} className="inline-flex items-center">
                    <a
                      href={href}
                      className="transition-colors"
                      style={{
                        color: active ? tc.fg : tc.fgMuted,
                        textDecoration: active ? "underline" : "none",
                        textUnderlineOffset: "2px",
                      }}
                    >
                      {entry.label}
                    </a>
                    {idx < languageOptions.length - 1 && <span className="mx-2" style={{ color: tc.fgDim }}>/</span>}
                  </span>
                );
              })}
            </motion.div>
          </div>

          {!isBookNowPage && (
            <motion.a
              ref={bookRef}
              href={bookNowHref}
              className="pointer-events-auto relative flex items-center justify-center overflow-hidden rounded-full px-3 py-2 text-sm font-medium uppercase tracking-[0.15em] shadow-lg md:px-4"
              animate={{
                opacity: showExtras ? 1 : 0,
                y: showExtras ? 0 : -40,
                backgroundColor: tc.bookBg,
                color: tc.bookText,
              }}
              transition={{ duration: 0.35, ease: EASE }}
              initial="rest"
              whileHover="hover"
            >
              <motion.div
                variants={{ rest: { x: -20, opacity: 0 }, hover: { x: 0, opacity: 1 } }}
                transition={{ duration: 0.4, ease: EASE }}
                className="mr-2"
              >
                <ArrowRight size={16} color={tc.accent} strokeWidth={2} />
              </motion.div>
              <motion.span variants={{ rest: { x: -10 }, hover: { x: 0 } }} transition={{ duration: 0.4, ease: EASE }}>
                {navigation.bookNowLabel}
              </motion.span>
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ border: `1px solid ${tc.bookBorder}` }}
                variants={{ rest: { opacity: 0.5 }, hover: { opacity: 1, scale: 1.02 } }}
              />
            </motion.a>
          )}
        </div>
      </nav>

      <motion.div
        className="fixed z-[100] flex flex-col gap-2 md:hidden"
        style={{ left: 30, top: 75, pointerEvents: showMobileSocial ? "auto" : "none" }}
        animate={{ opacity: showMobileSocial ? 1 : 0, x: showMobileSocial ? 0 : -50 }}
        transition={{ duration: 0.4, ease: EASE }}
        aria-hidden={!showMobileSocial}
      >
        {settings.socialLinks.slice(0, 2).map((social) => (
          <CircleLink
            key={`${social.href}-${social.label}`}
            href={social.href}
            label={social.label}
            size={34}
            color={tc.fg}
            borderColor={tc.border}
            hoverBg={tc.hoverBg}
            external={social.openInNewTab ?? true}
          >
            {social.label.toLowerCase().includes("facebook") ? <FacebookIcon size={12} /> : <InstagramIcon size={12} />}
          </CircleLink>
        ))}
      </motion.div>

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
              <div className="hidden h-full min-h-full md:flex">
                <div className="relative flex h-full w-[32%] max-w-sm items-center justify-center border-r border-white/[0.07] px-12">
                  <Image
                    data-theme="dark"
                    src={settings.logoLightUrl}
                    alt={settings.siteTitle}
                    width={200}
                    height={40}
                    className="h-auto w-44 opacity-80"
                  />
                  <nav className="absolute bottom-[22%] left-0 right-0 flex flex-col items-center gap-3">
                    {navigation.utilityLinks.map((item) => (
                      <a
                        key={`${item.href}-${item.label}`}
                        href={resolveHref(locale, item.href)}
                        onClick={closeMenu}
                        target={item.openInNewTab ? "_blank" : undefined}
                        rel={item.openInNewTab ? "noopener noreferrer" : undefined}
                        className="text-sm text-white/40 transition-colors hover:text-white"
                      >
                        {item.label}
                      </a>
                    ))}
                  </nav>
                </div>

                <motion.div
                  className="flex-1 overflow-y-auto px-10 pb-12 pt-28 lg:px-14 xl:px-20"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                >
                  {menuSections.map((section, si) => (
                    <motion.div key={`${section.headline}-${si}`} variants={fadeUp} className={si > 0 ? "mt-8" : ""}>
                      <h3
                        className="mb-1 border-b border-white/10 pb-3 text-[10px] font-medium uppercase tracking-[0.3em]"
                        style={{ color: colors.cta }}
                      >
                        {section.headline}
                      </h3>
                      <ul>
                        {section.links.map((link) => (
                          <li key={`${link.href}-${link.label}`}>
                            <a
                              href={link.href}
                              target={link.openInNewTab ? "_blank" : undefined}
                              rel={link.openInNewTab ? "noopener noreferrer" : undefined}
                              onClick={closeMenu}
                              className="group -mx-4 flex items-center justify-between rounded-lg border border-transparent px-5 py-3.5 transition-all duration-300 hover:border-white/[0.12]"
                            >
                              <span className="font-serif text-xl text-white/70 transition-colors duration-300 group-hover:text-white lg:text-2xl">
                                {link.label}
                              </span>
                              <ArrowRight
                                size={16}
                                strokeWidth={1.5}
                                className="translate-x-0 text-white/0 transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-white/50"
                              />
                            </a>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              <motion.div className="px-6 pb-12 pt-24 md:hidden" variants={staggerContainer} initial="hidden" animate="visible">
                <div className="mx-auto w-full max-w-md">
                  <motion.div variants={fadeUp} className="mb-8 rounded-2xl border border-white/10 bg-black/10 p-4">
                    <nav className="flex flex-wrap gap-x-4 gap-y-2">
                      {navigation.utilityLinks.map((item) => (
                        <a
                          key={`${item.href}-${item.label}`}
                          href={resolveHref(locale, item.href)}
                          onClick={closeMenu}
                          target={item.openInNewTab ? "_blank" : undefined}
                          rel={item.openInNewTab ? "noopener noreferrer" : undefined}
                          className="text-sm text-white/70 transition-colors hover:text-white"
                        >
                          {item.label}
                        </a>
                      ))}
                    </nav>
                  </motion.div>

                  {menuSections.map((section, si) => (
                    <motion.div key={`${section.headline}-${si}`} variants={fadeUp} className={si > 0 ? "mt-8" : ""}>
                      <h3
                        className="mb-1 border-b border-white/10 pb-3 text-[10px] font-medium uppercase tracking-[0.3em]"
                        style={{ color: colors.cta }}
                      >
                        {section.headline}
                      </h3>
                      <ul>
                        {section.links.map((link) => (
                          <li key={`${link.href}-${link.label}`}>
                            <a
                              href={link.href}
                              target={link.openInNewTab ? "_blank" : undefined}
                              rel={link.openInNewTab ? "noopener noreferrer" : undefined}
                              onClick={closeMenu}
                              className="group -mx-3 flex items-center justify-between rounded-lg border border-transparent px-4 py-3 transition-all duration-300 hover:border-white/[0.12]"
                            >
                              <span className="font-serif text-2xl text-white/70 transition-colors duration-300 group-hover:text-white">
                                {link.label}
                              </span>
                              <ArrowRight
                                size={16}
                                strokeWidth={1.5}
                                className="translate-x-0 text-white/0 transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-white/50"
                              />
                            </a>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}

                  <motion.div variants={fadeUp} className="mt-10 border-t border-white/10 pt-6">
                    <div className="mb-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] tracking-[0.15em]">
                      {languageOptions.map((entry, idx) => {
                        const href = switchLocaleInPathname(pathname || `/${locale}`, entry.code);
                        const active = entry.code === locale;
                        return (
                          <span key={entry.code} className="inline-flex items-center">
                            <a
                              href={href}
                              onClick={closeMenu}
                              className="transition-colors"
                              style={{
                                color: active ? "#FFFFFF" : "rgba(255,255,255,0.65)",
                                textDecoration: active ? "underline" : "none",
                                textUnderlineOffset: "2px",
                              }}
                            >
                              {entry.label}
                            </a>
                            {idx < languageOptions.length - 1 && <span className="mx-2 text-white/35">/</span>}
                          </span>
                        );
                      })}
                    </div>
                    <div className="flex items-center gap-2">
                      {settings.socialLinks.slice(0, 2).map((social) => (
                        <CircleLink
                          key={`${social.href}-${social.label}-menu`}
                          href={social.href}
                          label={social.label}
                          size={34}
                          color="#FFFFFF"
                          borderColor="rgba(255,255,255,0.35)"
                          hoverBg="rgba(255,255,255,0.12)"
                          external={social.openInNewTab ?? true}
                        >
                          {social.label.toLowerCase().includes("facebook") ? (
                            <FacebookIcon size={12} />
                          ) : (
                            <InstagramIcon size={12} />
                          )}
                        </CircleLink>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

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
  children: ReactNode;
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
