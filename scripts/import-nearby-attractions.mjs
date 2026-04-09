import {readFileSync} from "node:fs";
import {createHash} from "node:crypto";

import {createClient} from "next-sanity";

function loadEnvFile(path) {
  const raw = readFileSync(path, "utf8");
  const env = {};

  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const equalsIndex = trimmed.indexOf("=");
    if (equalsIndex === -1) continue;
    const key = trimmed.slice(0, equalsIndex).trim();
    let value = trimmed.slice(equalsIndex + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    env[key] = value;
  }

  return env;
}

const localEnv = loadEnvFile(new URL("../.env.local", import.meta.url));
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || localEnv.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || localEnv.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN || localEnv.SANITY_API_WRITE_TOKEN;

if (!projectId || !dataset || !token) {
  throw new Error("Missing Sanity env vars. Expected project id, dataset and write token.");
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-01-01",
  token,
  useCdn: false,
});

const cardsByLanguage = {
  en: {
    sectionTitle: "Discover More Around Timian",
    items: [
      {
        title: "Sumuleu Pentecost Pilgrimage",
        description:
          "One of the largest Catholic gatherings in the region, drawing hundreds of thousands of pilgrims each year to honor the Virgin Mary.",
      },
      {
        title: "Miercurea Ciuc (Csikszereda)",
        description:
          "A vibrant mountain city with deep Szekler heritage, historic churches, festivals, and direct access to scenic nature routes.",
      },
      {
        title: "Miko Fortress",
        description:
          "A 17th-century citadel in the heart of the city, built in 1623 and known as one of the most iconic historical landmarks of the area.",
      },
      {
        title: "Harghita Mountains",
        description:
          "A volcanic mountain range crowned by Madaras Peak, popular for skiing in winter and panoramic hiking trails in summer.",
      },
      {
        title: "Siculicidium Memorial",
        description:
          "A symbolic monument inaugurated in 1905 that preserves collective memory and remains a powerful emblem of local identity.",
      },
      {
        title: "Bogati Chapel",
        description:
          "A small 18th-century hilltop chapel near Racu and Siculeni, admired for its unique setting and long-standing pilgrimage tradition.",
      },
      {
        title: "Racu Fortified Church",
        description:
          "A medieval church dedicated to Saint George, notable for mysterious tower wall paintings and origins dating back to the 13th century.",
      },
      {
        title: "Carta Fortified Church",
        description:
          "A remarkable Gothic-Baroque church complex on Madicsa Hill, home to one of the most beautiful Gothic sanctuaries in the Ciuc basin.",
      },
      {
        title: "Szekler Border Guards Memorial Center",
        description:
          "An immersive museum space presenting the military history of the Eastern Carpathians and the Szekler border communities across centuries.",
      },
      {
        title: "Egyesko (Lone Stone)",
        description:
          "A beloved hiking destination rising to 1,608 meters, offering dramatic views over the Hasmas massif and surrounding mountain ranges.",
      },
    ],
  },
  ro: {
    sectionTitle: "Descoperă Mai Mult În Jurul Timian",
    items: [
      {
        title: "Pelerinajul de Rusalii la Șumuleu Ciuc",
        description:
          "Unul dintre cele mai mari evenimente catolice din regiune, care adună anual sute de mii de pelerini în cinstea Fecioarei Maria.",
      },
      {
        title: "Miercurea Ciuc",
        description:
          "Un oraș montan vibrant, cu moștenire secuiască puternică, biserici istorice, festivaluri și acces rapid la trasee în natură.",
      },
      {
        title: "Cetatea Mikó",
        description:
          "Cetate ridicată în 1623, în centrul orașului, considerată unul dintre cele mai reprezentative repere istorice ale zonei.",
      },
      {
        title: "Munții Harghita",
        description:
          "Lanț montan vulcanic dominat de vârful Harghita Mădăraș, ideal pentru schi iarna și drumeții panoramice vara.",
      },
      {
        title: "Monumentul Siculicidium",
        description:
          "Monument simbolic inaugurat în 1905, care păstrează memoria colectivă și rămâne un reper important al identității locale.",
      },
      {
        title: "Capela Bogáti",
        description:
          "Capelă de secol XVIII, situată pe deal, lângă Racu și Siculeni, apreciată pentru poziția sa specială și tradiția pelerinajului.",
      },
      {
        title: "Biserica Fortificată Sf. Gheorghe din Racu",
        description:
          "Biserică medievală cunoscută pentru picturile misterioase din turn și pentru originile sale care coboară până în secolul al XIII-lea.",
      },
      {
        title: "Biserica Fortificată din Cârța",
        description:
          "Ansamblu gotic-baroc impresionant de pe dealul Madicsa, care adăpostește unul dintre cele mai frumoase sanctuare gotice din Ciuc.",
      },
      {
        title: "Centrul Memorial al Grănicerilor Secui",
        description:
          "Spațiu muzeal interactiv care prezintă istoria militară a Carpaților Orientali și rolul grănicerimii secuiești de-a lungul secolelor.",
      },
      {
        title: "Egyeskő (Piatra Singuratică)",
        description:
          "Destinație foarte iubită pentru drumeții, la 1608 m altitudine, cu priveliști spectaculoase spre Hășmaș și culmile din jur.",
      },
    ],
  },
  hu: {
    sectionTitle: "Fedezz Fel Többet Timian Környékén",
    items: [
      {
        title: "Csíksomlyói búcsújárás",
        description:
          "A térség egyik legnagyobb katolikus eseménye, amely minden évben több százezer zarándokot vonz Szűz Mária tiszteletére.",
      },
      {
        title: "Csikszereda",
        description:
          "Élő, hegyekkel körülvett város erős székely örökséggel, történelmi templomokkal, fesztiválokkal és természeti útvonalakkal.",
      },
      {
        title: "Mikó vár",
        description:
          "A város központjában álló 17. századi erőd kezdete 1623-ra nyúlik vissza, és a környék egyik legismertebb történelmi jelképe.",
      },
      {
        title: "Hargita hegység",
        description:
          "Vulkanikus hegylánc, melynek legismertebb csúcsa a Madarasi-Hargita; télen síelésre, nyáron panorámás túrákra kiváló.",
      },
      {
        title: "Siculicidium Emlékmű",
        description:
          "1905-ben avatott jelképe a közös emlékezetnek, amely ma is fontos identitásképző emlékhely a vidéken.",
      },
      {
        title: "Bogáti Kápolna",
        description:
          "18. századi dombtetői kápolna Csíkrákos és Csíkcsicsó közelében, különleges fekvéssel és élő zarándokhagyománnyal.",
      },
      {
        title: "Rákosi Szent György erődtemplom",
        description:
          "Középkori templom, melyet a torony falfestményeinek rejtélye és a 13. századig visszanyúló eredete tesz különlegessé.",
      },
      {
        title: "Karcfalvi erődtemplom",
        description:
          "Lenyűgöző gótikus-barokk épületegyüttes a Madicsa-dombon, a Csíki-medence egyik legszebb gótikus szentélyével.",
      },
      {
        title: "Székely Határőr Emlékközpont",
        description:
          "Interaktív kiállítótér, amely bemutatja a Keleti-Kárpátok katonai múltját és a székely határőrség évszázados szerepét.",
      },
      {
        title: "Egyeskő",
        description:
          "1608 méter magas, kedvelt túracélpont lenyűgöző kilátással a Hagymás-hegységre és a környező vonulatokra.",
      },
    ],
  },
};

const imageUrls = Array.from({length: 10}, (_, index) => `https://picsum.photos/seed/timian-attraction-${index + 1}/1200/1600`);

async function uploadImages() {
  const assets = [];

  for (let i = 0; i < imageUrls.length; i += 1) {
    const imageUrl = imageUrls[i];
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to download image ${i + 1}: ${response.status} ${response.statusText}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const fileBuffer = Buffer.from(arrayBuffer);
    const hash = createHash("sha1").update(fileBuffer).digest("hex").slice(0, 10);
    const uploaded = await client.assets.upload("image", fileBuffer, {
      filename: `nearby-attraction-${i + 1}-${hash}.jpg`,
      contentType: "image/jpeg",
    });

    assets.push(uploaded);
    console.log(`Uploaded image ${i + 1}/10: ${uploaded._id}`);
  }

  return assets;
}

function toExperienceItem(item, assetRef, lang, index) {
  return {
    _key: `${lang}-nearby-${String(index + 1).padStart(2, "0")}`,
    _type: "experienceItem",
    title: item.title,
    description: item.description,
    image: {
      _type: "imageBlock",
      alt: item.title,
      image: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: assetRef,
        },
      },
    },
  };
}

async function run() {
  const docs = await client.fetch(`*[_type == "experiencesPage" && language in ["en","ro","hu"]]{_id,language}`);
  if (!docs.length) {
    throw new Error("No experiencesPage documents found for en/ro/hu.");
  }

  const assets = await uploadImages();

  for (const doc of docs) {
    const languagePack = cardsByLanguage[doc.language];
    if (!languagePack) {
      console.log(`Skipping unsupported language: ${doc.language}`);
      continue;
    }

    const nearbyAttractions = languagePack.items.map((item, index) =>
      toExperienceItem(item, assets[index]._id, doc.language, index),
    );

    await client.patch(doc._id).set({
      nearbyAttractionsTitle: languagePack.sectionTitle,
      nearbyAttractions,
    }).commit();

    console.log(`Patched ${doc.language} document: ${doc._id}`);
  }

  console.log("Nearby attractions import completed.");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
