"use client";

import Image from "next/image";
import Link from "next/link";

import { localizeHref, type SiteLocale } from "@/app/lib/locale";
import { colors } from "@/app/theme/colors";
import { pageShell } from "@/app/theme/pageShell";
import type { SiteSettingsData } from "@/sanity/lib/queries";

export default function Footer({
  locale,
  settings,
}: {
  locale: SiteLocale;
  settings: SiteSettingsData;
}) {
  const facebook = settings.socialLinks.find((item) => item.label.toLowerCase().includes("facebook"));
  const instagram = settings.socialLinks.find((item) => item.label.toLowerCase().includes("instagram"));

  return (
    <footer className="w-full" style={{ backgroundColor: colors.primaryBg }}>
      <div className={`${pageShell} py-12`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div>
              <Image
                data-theme="dark"
                src={settings.logoDarkUrl}
                alt={settings.siteTitle}
                width={180}
                height={36}
                className="h-9 w-auto"
              />
            </div>
            <p className="text-sm leading-relaxed" style={{ color: colors.textSecondary }}>
              {settings.footerDescription}
            </p>
            <div className="flex space-x-3">
              {facebook?.href ? (
                <a
                  href={facebook.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded border flex items-center justify-center"
                  style={{ borderColor: colors.border }}
                  aria-label={facebook.label}
                >
                  <svg className="w-4 h-4" style={{ color: colors.textSecondary }} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35C.594 0 0 .594 0 1.326v21.348C0 23.406.594 24 1.326 24h11.495v-9.294H9.692V11.08h3.129V8.413c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.464.099 2.795.143v3.24h-1.918c-1.505 0-1.796.716-1.796 1.765v2.313h3.587l-.467 3.626h-3.12V24h6.114C23.406 24 24 23.406 24 22.674V1.326C24 .594 23.406 0 22.675 0z" />
                  </svg>
                </a>
              ) : null}
              {instagram?.href ? (
                <a
                  href={instagram.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded border flex items-center justify-center"
                  style={{ borderColor: colors.border }}
                  aria-label={instagram.label}
                >
                  <svg className="w-4 h-4" style={{ color: colors.textSecondary }} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7.75 2C4.574 2 2 4.574 2 7.75v8.5C2 19.426 4.574 22 7.75 22h8.5C19.426 22 22 19.426 22 16.25v-8.5C22 4.574 19.426 2 16.25 2h-8.5zm0 1.8h8.5a3.95 3.95 0 0 1 3.95 3.95v8.5a3.95 3.95 0 0 1-3.95 3.95h-8.5a3.95 3.95 0 0 1-3.95-3.95v-8.5A3.95 3.95 0 0 1 7.75 3.8zm9.05 1.35a1.05 1.05 0 1 0 0 2.1 1.05 1.05 0 0 0 0-2.1zM12 7.2A4.8 4.8 0 1 0 12 16.8 4.8 4.8 0 0 0 12 7.2zm0 1.8A3 3 0 1 1 12 15a3 3 0 0 1 0-6z" />
                  </svg>
                </a>
              ) : null}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wide" style={{ color: colors.cta }}>
              {settings.quickLinksHeading}
            </h3>
            <ul className="space-y-2">
              {settings.quickLinks.map((item) => (
                <li key={`${item.href}-${item.label}`}>
                  <Link href={localizeHref(locale, item.href)} className="text-sm hover:opacity-80 transition-opacity" style={{ color: colors.textSecondary }}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wide" style={{ color: colors.cta }}>
              {settings.servicesHeading}
            </h3>
            <ul className="space-y-2">
              {settings.services.map((item) => (
                <li key={item} className="text-sm" style={{ color: colors.textSecondary }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wide" style={{ color: colors.cta }}>
              {settings.contactHeading}
            </h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-4 h-4 mt-0.5 flex-shrink-0">
                  <svg className="w-full h-full" style={{ color: colors.cta }} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                </div>
                <div className="text-sm" style={{ color: colors.textSecondary }}>
                  {settings.addressLines.map((line) => (
                    <div key={line}>{line}</div>
                  ))}
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 flex-shrink-0">
                  <svg className="w-full h-full" style={{ color: colors.cta }} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                  </svg>
                </div>
                <a href={`tel:${settings.phone}`} className="text-sm hover:opacity-80 transition-opacity" style={{ color: colors.textSecondary }}>
                  {settings.phone}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 flex-shrink-0">
                  <svg className="w-full h-full" style={{ color: colors.cta }} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </div>
                <a href={`mailto:${settings.email}`} className="text-sm hover:opacity-80 transition-opacity" style={{ color: colors.textSecondary }}>
                  {settings.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t" style={{ borderColor: colors.border }}>
        <div className={`${pageShell} py-6`}>
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
            <div className="text-sm" style={{ color: colors.textSecondary }}>
              {settings.copyright}
            </div>
            <div className="flex space-x-6">
              {settings.legalLinks.map((link) => (
                <Link key={`${link.href}-${link.label}`} href={localizeHref(locale, link.href)} className="text-sm hover:opacity-80 transition-opacity" style={{ color: colors.textSecondary }}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
