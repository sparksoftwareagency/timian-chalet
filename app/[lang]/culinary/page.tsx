import { notFound } from "next/navigation";
import Image from "next/image";

import { isSiteLocale, SITE_LOCALES, type SiteLocale } from "@/app/lib/locale";
import { colors } from "@/app/theme/colors";
import { fetchCulinaryPage } from "@/sanity/lib/queries";

export function generateStaticParams() {
  return SITE_LOCALES.map((lang) => ({ lang }));
}

export default async function CulinaryPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!isSiteLocale(lang)) {
    notFound();
  }

  const data = await fetchCulinaryPage(lang as SiteLocale);

  if (!data) {
    notFound();
  }

  return (
    <main>
      <section className="relative h-screen w-full overflow-hidden">
        <Image src={data.heroImage.url} alt={data.heroImage.alt} fill priority className="object-cover" />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
          <div className="mb-8 h-4 w-4 rotate-45 border-2" style={{ borderColor: colors.cta }} />
          <h1 className="font-serif text-5xl font-light uppercase tracking-[0.3em] text-white sm:text-6xl md:text-7xl lg:text-8xl">
            {data.heroTitle}
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-light text-white/90 sm:text-xl">
            {data.heroSubtitle}
          </p>
        </div>
      </section>
    </main>
  );
}
