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
const imagePath = path.join(root, "public/experiences_divider/Timian-125.jpg");

const moreExperiencesByLanguage = {
  en: {
    sectionTitle: "More Experiences",
    items: [
      {
        title: "Horseback Riding",
        description: "Ride scenic countryside trails with experienced local guides.",
      },
      {
        title: "Hiking",
        description: "Explore forest paths and mountain routes at your own pace.",
      },
      {
        title: "Hot Air Balloon Flight",
        description: "Take in sweeping views from above during a sunrise flight.",
      },
      {
        title: "Truffle Hunting",
        description: "Join a guided search and discover the region's hidden flavors.",
      },
      {
        title: "Museum Visit",
        description: "Step into local history, art, and stories through curated exhibits.",
      },
      {
        title: "Paragliding",
        description: "Soar over valleys and hills for an unforgettable aerial experience.",
      },
      {
        title: "Skiing",
        description: "Enjoy nearby slopes suited for both beginners and advanced skiers.",
      },
      {
        title: "Bear Watching",
        description: "Observe wildlife safely from designated spots in natural habitats.",
      },
      {
        title: "Bicaz Lake & Gorge",
        description: "Visit dramatic cliffs and peaceful waters in a single day trip.",
      },
      {
        title: "Lake Saint Anne",
        description: "Discover a volcanic lake surrounded by quiet pine forests.",
      },
    ],
  },
  ro: {
    sectionTitle: "Mai multe experiențe",
    items: [
      {
        title: "Călărie",
        description: "Parcurge trasee pitorești alături de ghizi locali cu experiență.",
      },
      {
        title: "Drumeții",
        description: "Descoperă poteci de pădure și trasee montane în ritmul tău.",
      },
      {
        title: "Zbor cu balon cu aer cald",
        description: "Admiră panorama de sus într-un zbor de dimineață memorabil.",
      },
      {
        title: "Vânătoare de trufe",
        description: "Participă la o căutare ghidată și descoperă arome locale autentice.",
      },
      {
        title: "Vizită la muzeu",
        description: "Explorează istoria, arta și poveștile locului prin expoziții atent curate.",
      },
      {
        title: "Parapantă",
        description: "Planează deasupra văilor și dealurilor într-o experiență spectaculoasă.",
      },
      {
        title: "Schi",
        description: "Bucură-te de pârtii apropiate, potrivite pentru toate nivelurile.",
      },
      {
        title: "Observarea urșilor",
        description: "Privește fauna sălbatică în siguranță din puncte special amenajate.",
      },
      {
        title: "Lacul și Cheile Bicazului",
        description: "Vizitează stânci impresionante și ape liniștite într-o singură excursie.",
      },
      {
        title: "Lacul Sfânta Ana",
        description: "Descoperă un lac vulcanic înconjurat de păduri liniștite de conifere.",
      },
    ],
  },
  hu: {
    sectionTitle: "További élmények",
    items: [
      {
        title: "Lovaglás",
        description: "Fedezd fel a vidéki ösvényeket tapasztalt helyi vezetőkkel.",
      },
      {
        title: "Túrázás",
        description: "Járd be az erdei utakat és hegyi ösvényeket a saját tempódban.",
      },
      {
        title: "Hőlégballonos repülés",
        description: "Élvezd a lélegzetelállító panorámát egy napfelkeltei repülés során.",
      },
      {
        title: "Szarvasgomba-vadászat",
        description: "Csatlakozz egy vezetett kereséshez, és fedezd fel a régió ízeit.",
      },
      {
        title: "Múzeumlátogatás",
        description: "Ismerd meg a helyi történelmet és művészetet gondosan rendezett tárlatokon.",
      },
      {
        title: "Siklóernyőzés",
        description: "Suhanj a völgyek és dombok fölött egy felejthetetlen élményben.",
      },
      {
        title: "Síelés",
        description: "Élvezd a közeli sípályákat, amelyek minden tudásszinthez ideálisak.",
      },
      {
        title: "Medveles",
        description: "Figyeld meg biztonságosan a vadon élő állatokat kijelölt helyszínekről.",
      },
      {
        title: "Békási-tó és szoros",
        description: "Látogasd meg az impozáns sziklafalakat és a nyugodt tavat egy kirándulás alatt.",
      },
      {
        title: "Szent Anna-tó",
        description: "Fedezz fel egy vulkanikus tavat csendes fenyvesek ölelésében.",
      },
    ],
  },
};

function buildImageBlock(assetId, title, key) {
  return {
    _key: key,
    _type: "experienceItem",
    title,
    description: "",
    image: {
      _type: "imageBlock",
      alt: title,
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
    filename: "Timian-125.jpg",
  });
}

function buildLocalizedItems(language, assetId) {
  const localized = moreExperiencesByLanguage[language];
  return localized.items.map((item, index) => {
    const row = buildImageBlock(assetId, item.title, `${language}-more-experience-${index + 1}`);
    row.description = item.description;
    return row;
  });
}

async function fetchExperiencesDocuments() {
  return client.fetch(
    `*[_type == "experiencesPage" && language in $languages]{
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

  const docs = await fetchExperiencesDocuments();
  const docsByLanguage = supportedLanguages.reduce((acc, language) => {
    acc[language] = docs.filter((doc) => doc.language === language);
    return acc;
  }, {});

  for (const language of supportedLanguages) {
    if (!docsByLanguage[language] || docsByLanguage[language].length === 0) {
      throw new Error(`No experiencesPage document found for language: ${language}`);
    }
  }

  const asset = await uploadImageAsset();

  for (const language of supportedLanguages) {
    const localized = moreExperiencesByLanguage[language];
    const items = buildLocalizedItems(language, asset._id);

    for (const doc of docsByLanguage[language]) {
      await client
        .patch(doc._id)
        .set({
          moreExperiencesTitle: localized.sectionTitle,
          moreExperiences: items,
        })
        .commit({ autoGenerateArrayKeys: false });
    }
  }

  const verification = await client.fetch(
    `*[_type == "experiencesPage" && language in $languages]{
      _id,
      language,
      moreExperiencesTitle,
      "moreExperiencesCount": count(moreExperiences),
      "firstCardTitle": moreExperiences[0].title,
      "firstCardAssetRef": moreExperiences[0].image.image.asset->_id
    } | order(language asc)`,
    { languages: supportedLanguages },
  );

  console.log(JSON.stringify(verification, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
