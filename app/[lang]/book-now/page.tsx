import { notFound } from "next/navigation";

import SanityImage from "@/app/components/SanityImage";
import { isSiteLocale, SITE_LOCALES } from "@/app/lib/locale";
import { colors } from "@/app/theme/colors";
import { pageShell } from "@/app/theme/pageShell";
import { fetchBookingPage } from "@/sanity/lib/queries";

export function generateStaticParams() {
  return SITE_LOCALES.map((lang) => ({ lang }));
}

export default async function BookNowPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!isSiteLocale(lang)) {
    notFound();
  }

  const data = await fetchBookingPage(lang);

  if (!data) {
    notFound();
  }
  if (!data.backgroundImage?.url) {
    notFound();
  }

  const telHref = `tel:${data.phone.replace(/\s+/g, "")}`;
  const mailHref = `mailto:${data.email}`;

  return (
    <main data-theme="dark" className="relative min-h-screen overflow-hidden pt-32 md:pt-36" style={{ backgroundColor: colors.primaryBg }}>
      <SanityImage
        data-theme="dark"
        image={data.backgroundImage}
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/55" />
      <section className={`${pageShell} relative z-10 pb-24`}>
        <div
          className="mx-auto max-w-2xl rounded-2xl border p-8 text-center md:p-12"
          style={{ borderColor: "rgba(255,255,255,0.35)", backgroundColor: "rgba(0,0,0,0.45)" }}
        >
          <p className="text-xs uppercase tracking-[0.25em]" style={{ color: colors.cta }}>
            {data.eyebrow}
          </p>
          <h1 className="mt-4 font-serif text-4xl uppercase tracking-[0.12em] md:text-5xl text-white">
            {data.title}
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed md:text-lg text-white/90">
            {data.description}
          </p>

          <div className="mt-10 flex flex-col items-center gap-4">
            <a
              href={telHref}
              className="w-full max-w-sm rounded-full border px-6 py-3 text-sm font-medium uppercase tracking-[0.12em] transition-opacity hover:opacity-80"
              style={{ borderColor: "rgba(255,255,255,0.8)", color: "#FFFFFF" }}
            >
              {data.phone}
            </a>
            <a
              href={mailHref}
              className="w-full max-w-sm rounded-full border px-6 py-3 text-sm font-medium uppercase tracking-[0.12em] transition-opacity hover:opacity-80"
              style={{ borderColor: "rgba(255,255,255,0.8)", color: "#FFFFFF" }}
            >
              {data.email}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
