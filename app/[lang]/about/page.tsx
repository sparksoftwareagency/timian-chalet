import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { isSiteLocale, localizeHref, SITE_LOCALES, type SiteLocale } from "@/app/lib/locale";
import { colors } from "@/app/theme/colors";
import { fetchAboutPage } from "@/sanity/lib/queries";

export function generateStaticParams() {
  return SITE_LOCALES.map((lang) => ({ lang }));
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!isSiteLocale(lang)) {
    notFound();
  }

  const data = await fetchAboutPage(lang as SiteLocale);

  if (!data) {
    notFound();
  }

  return (
    <main className="w-full">
      <section data-theme="dark" className="relative h-screen w-full overflow-hidden">
        <Image src={data.heroImage.url} alt={data.heroImage.alt} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <h1 className="font-serif text-5xl font-light uppercase tracking-[0.2em] text-white sm:text-6xl md:text-7xl lg:text-8xl">
            {data.heroTitle}
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-white/80 sm:text-xl">
            {data.heroSubtitle}
          </p>
        </div>
      </section>

      <section data-theme="light" style={{ backgroundColor: colors.primaryBg }}>
        <div className="mx-auto max-w-7xl px-10 py-20 sm:px-12 sm:py-28 lg:px-16 lg:py-32">
          <div className="mb-16 text-center">
            <span className="mb-4 block text-xs font-medium uppercase tracking-[0.3em]" style={{ color: colors.cta }}>
              {data.originEyebrow}
            </span>
            <h2 className="whitespace-pre-line font-serif text-3xl sm:text-4xl lg:text-5xl" style={{ color: colors.accent }}>
              {data.originTitle}
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="space-y-6 lg:col-span-5">
              {data.originParagraphs.map((paragraph) => (
                <p key={paragraph} className="text-base leading-relaxed sm:text-lg" style={{ color: colors.textSecondary }}>
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="lg:col-span-7">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg shadow-xl">
                <Image src={data.originPrimaryImage.url} alt={data.originPrimaryImage.alt} fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative h-[50vh] w-full overflow-hidden">
        <Image src={data.animalsBreakImage.url} alt={data.animalsBreakImage.alt} fill className="object-cover" />
      </section>

      <section style={{ backgroundColor: colors.secondaryBg }}>
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-10 py-20 sm:px-12 sm:py-28 lg:grid-cols-12 lg:gap-14 lg:px-16 lg:py-32">
          <div className="order-2 lg:order-1 lg:col-span-6">
            <div className="relative aspect-[3/4] w-full max-h-[550px] overflow-hidden rounded-lg shadow-xl">
              <Image src={data.transformImage.url} alt={data.transformImage.alt} fill className="object-cover" />
            </div>
          </div>
          <div className="order-1 lg:order-2 lg:col-span-6">
            <span className="mb-4 block text-xs font-medium uppercase tracking-[0.3em]" style={{ color: colors.cta }}>
              {data.transformEyebrow}
            </span>
            <h2 className="mb-6 whitespace-pre-line font-serif text-3xl sm:text-4xl lg:text-5xl" style={{ color: colors.accent }}>
              {data.transformTitle}
            </h2>
            {data.transformParagraphs.map((paragraph) => (
              <p key={paragraph} className="mb-4 text-base leading-relaxed sm:text-lg" style={{ color: colors.textSecondary }}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section data-theme="dark" style={{ backgroundColor: colors.accent }}>
        <div className="mx-auto max-w-4xl px-10 py-20 text-center sm:px-12 sm:py-28 lg:px-16">
          <blockquote className="font-serif text-2xl font-light italic leading-snug text-white sm:text-3xl lg:text-4xl">
            &ldquo;{data.quote}&rdquo;
          </blockquote>
        </div>
      </section>

      <section style={{ backgroundColor: colors.primaryBg }}>
        <div className="mx-auto max-w-7xl px-10 py-20 sm:px-12 sm:py-28 lg:px-16 lg:py-32">
          <div className="mb-16 text-center">
            <span className="mb-4 block text-xs font-medium uppercase tracking-[0.3em]" style={{ color: colors.cta }}>
              {data.farmEyebrow}
            </span>
            <h2 className="whitespace-pre-line font-serif text-3xl sm:text-4xl lg:text-5xl" style={{ color: colors.accent }}>
              {data.farmTitle}
            </h2>
          </div>
          <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            {data.farmImages.map((image) => (
              <div key={image.url} className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-xl">
                <Image src={image.url} alt={image.alt} fill className="object-cover" />
              </div>
            ))}
          </div>
          {data.farmParagraphs.map((paragraph) => (
            <p key={paragraph} className="mx-auto mb-6 max-w-3xl text-center text-base leading-relaxed sm:text-lg" style={{ color: colors.textSecondary }}>
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section style={{ backgroundColor: colors.secondaryBg }}>
        <div className="relative h-[35vh] w-full overflow-hidden">
          <Image src={data.roomsImage.url} alt={data.roomsImage.alt} fill className="object-cover" />
        </div>
        <div className="mx-auto max-w-7xl px-10 py-20 sm:px-12 sm:py-28 lg:px-16 lg:py-32">
          <div className="mb-6 text-center">
            <span className="mb-4 block text-xs font-medium uppercase tracking-[0.3em]" style={{ color: colors.cta }}>
              {data.roomsEyebrow}
            </span>
            <h2 className="whitespace-pre-line font-serif text-3xl sm:text-4xl lg:text-5xl" style={{ color: colors.accent }}>
              {data.roomsTitle}
            </h2>
            <p className="mx-auto mt-8 max-w-3xl text-base leading-relaxed sm:text-lg" style={{ color: colors.textSecondary }}>
              {data.roomsIntro}
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {data.roomFloors.map((floor) => (
              <div key={floor.title} className="rounded-lg p-8 text-center" style={{ backgroundColor: colors.primaryBg }}>
                <h3 className="mb-4 font-serif text-lg sm:text-xl" style={{ color: colors.accent }}>
                  {floor.title}
                </h3>
                <p className="text-sm leading-relaxed sm:text-base" style={{ color: colors.textSecondary }}>
                  {floor.description}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href={localizeHref(lang, data.roomsLink.href)} className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em]" style={{ color: colors.cta }}>
              {data.roomsLink.label}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
