"use client";

import Image from "next/image";
import { useT } from "../i18n/LanguageContext";
import { tr } from "../i18n/translations";
import { colors } from "../theme/colors";

export default function Footer() {
  const t = useT();

  return (
    <footer className="w-full" style={{ backgroundColor: colors.textPrimary }}>
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1 - Brand/About */}
          <div className="space-y-4">
            <div>
              <Image
                src="/timian_chalet_logo_w.png"
                alt="Timian Chalet"
                width={180}
                height={36}
                className="h-9 w-auto"
              />
            </div>
            <p className="text-sm leading-relaxed" style={{ color: colors.secondaryBg }}>
              {t(tr.footer.description)}
            </p>
            <div className="flex space-x-3">
              <div className="w-8 h-8 rounded border flex items-center justify-center" style={{ borderColor: colors.secondaryBg }}>
                <svg className="w-4 h-4" style={{ color: colors.secondaryBg }} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z" />
                </svg>
              </div>
              <div className="w-8 h-8 rounded border flex items-center justify-center" style={{ borderColor: colors.secondaryBg }}>
                <svg className="w-4 h-4" style={{ color: colors.secondaryBg }} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wide" style={{ color: colors.cta }}>
              {t(tr.footer.quickLinks)}
            </h3>
            <ul className="space-y-2">
              {[tr.footer.roomsSuites, tr.footer.culinary, tr.footer.experiences, tr.footer.contactUs].map((item) => (
                <li key={t(item)}>
                  <a href="#" className="text-sm hover:opacity-80 transition-opacity" style={{ color: colors.secondaryBg }}>
                    {t(item)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Services */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wide" style={{ color: colors.cta }}>
              {t(tr.footer.services)}
            </h3>
            <ul className="space-y-2">
              {[tr.footer.luxuryAccom, tr.footer.fineDining, tr.footer.spaWellness, tr.footer.mountainAct, tr.footer.eventHosting, tr.footer.concierge].map((item) => (
                <li key={t(item)}>
                  <a href="#" className="text-sm hover:opacity-80 transition-opacity" style={{ color: colors.secondaryBg }}>
                    {t(item)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Contact */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wide" style={{ color: colors.cta }}>
              {t(tr.footer.contact)}
            </h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-4 h-4 mt-0.5 flex-shrink-0">
                  <svg className="w-full h-full" style={{ color: colors.cta }} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                </div>
                <div className="text-sm" style={{ color: colors.secondaryBg }}>
                  <div>Ciaracio Nr. 201</div>
                  <div>Miercurea Ciuc 537296</div>
                  <div>Romania</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 flex-shrink-0">
                  <svg className="w-full h-full" style={{ color: colors.cta }} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                  </svg>
                </div>
                <div className="text-sm" style={{ color: colors.secondaryBg }}>
                  +40 740 207 200
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 flex-shrink-0">
                  <svg className="w-full h-full" style={{ color: colors.cta }} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </div>
                <div className="text-sm" style={{ color: colors.secondaryBg }}>
                  contact@timian.ro
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Copyright and Legal Links */}
      <div className="border-t" style={{ borderColor: colors.secondaryBg }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
            <div className="text-sm" style={{ color: colors.secondaryBg }}>
              {t(tr.footer.copyright)}
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-sm hover:opacity-80 transition-opacity" style={{ color: colors.secondaryBg }}>
                {t(tr.footer.privacy)}
              </a>
              <a href="#" className="text-sm hover:opacity-80 transition-opacity" style={{ color: colors.secondaryBg }}>
                {t(tr.footer.terms)}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
