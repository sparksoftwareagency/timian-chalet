import { createClient } from "@sanity/client";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

function loadEnv() {
  const envPath = path.join(root, ".env.local");
  const text = fs.readFileSync(envPath, "utf8");
  const env = {};

  for (const line of text.split("\n")) {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (!match) continue;

    const key = match[1].trim();
    let value = match[2].trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    env[key] = value;
  }

  return env;
}

const env = loadEnv();
const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  token: env.SANITY_API_WRITE_TOKEN,
  apiVersion: "2026-03-08",
  useCdn: false,
});

const supportedLanguages = ["en", "ro", "hu"];
const imagePath = path.join(root, "public/wellness/wellness_4_quiet_relaxation.jpg");

const wellnessByLanguage = {
  en: {
    eyebrow: "Wellness",
    title: "Restore body and mind",
    description:
      "Slip into the quiet rhythm of our alpine spa — a private sauna, a bracing cold plunge, and unhurried moments of stillness designed to leave you lighter than when you arrived.",
    link: { label: "Discover wellness", href: "/wellness" },
    alt: "Quiet relaxation at Timian Chalet wellness",
  },
  ro: {
    eyebrow: "Wellness",
    title: "Reîncărcare pentru corp și minte",
    description:
      "Lasă-te purtat de ritmul liniștit al spa-ului nostru alpin — saună privată, baie rece revigorantă și momente de tăcere care îți redau echilibrul.",
    link: { label: "Descoperă wellness", href: "/wellness" },
    alt: "Moment de relaxare la wellness-ul Timian Chalet",
  },
  hu: {
    eyebrow: "Wellness",
    title: "Test és lélek harmóniája",
    description:
      "Merülj el alpesi wellness-világunk csendes ritmusában — privát szauna, frissítő merülőmedence és nyugodt pillanatok, melyek könnyebbé teszik a napjaidat.",
    link: { label: "Fedezd fel a wellnesst", href: "/wellness" },
    alt: "Csendes pihenés a Timian Chalet wellnessében",
  },
};

function buildWellnessSection(language, assetId) {
  const localized = wellnessByLanguage[language];
  return {
    _type: "teaserSection",
    eyebrow: localized.eyebrow,
    title: localized.title,
    description: localized.description,
    link: {
      _type: "linkObject",
      label: localized.link.label,
      href: localized.link.href,
      openInNewTab: false,
    },
    image: {
      _type: "imageBlock",
      alt: localized.alt,
      image: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: assetId,
        },
      },
    },
  };
}

async function uploadImageAsset() {
  if (!fs.existsSync(imagePath)) {
    throw new Error(`Image file not found: ${imagePath}`);
  }

  const buffer = fs.readFileSync(imagePath);
  return client.assets.upload("image", buffer, {
    filename: "wellness_4_quiet_relaxation.jpg",
  });
}

async function fetchHomeDocuments() {
  return client.fetch(
    `*[_type == "homePage" && language in $languages]{
      _id,
      language
    }`,
    { languages: supportedLanguages },
  );
}

async function main() {
  if (!env.SANITY_API_WRITE_TOKEN) {
    throw new Error("Missing SANITY_API_WRITE_TOKEN in .env.local");
  }

  const docs = await fetchHomeDocuments();
  const docsByLanguage = supportedLanguages.reduce((acc, language) => {
    acc[language] = docs.filter((doc) => doc.language === language);
    return acc;
  }, {});

  for (const language of supportedLanguages) {
    if (!docsByLanguage[language] || docsByLanguage[language].length === 0) {
      throw new Error(`No homePage document found for language: ${language}`);
    }
  }

  const asset = await uploadImageAsset();
  console.log(`Uploaded asset: ${asset._id}`);

  for (const language of supportedLanguages) {
    const section = buildWellnessSection(language, asset._id);

    for (const doc of docsByLanguage[language]) {
      await client
        .patch(doc._id)
        .set({ wellnessSection: section })
        .commit({ autoGenerateArrayKeys: false });
      console.log(`Patched ${doc._id} (${language})`);
    }
  }

  const verification = await client.fetch(
    `*[_type == "homePage" && language in $languages]{
      _id,
      language,
      "eyebrow": wellnessSection.eyebrow,
      "title": wellnessSection.title,
      "linkHref": wellnessSection.link.href,
      "assetRef": wellnessSection.image.image.asset->_id
    } | order(language asc)`,
    { languages: supportedLanguages },
  );

  console.log(JSON.stringify(verification, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
