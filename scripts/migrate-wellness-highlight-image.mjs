import { readFileSync } from "node:fs";

import { createClient } from "next-sanity";

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

const localEnv = loadEnvFile(new URL("../.env.local", import.meta.url));
const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || localEnv.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || localEnv.NEXT_PUBLIC_SANITY_DATASET || "production";
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

async function run() {
  const docs = await client.fetch(`
    *[_type == "wellnessPage" && !defined(highlightImage) && defined(highlightImages[0])]{
      _id,
      "firstImage": highlightImages[0]
    }
  `);

  if (!docs.length) {
    console.log("No wellnessPage documents require migration.");
    return;
  }

  for (const doc of docs) {
    await client
      .patch(doc._id)
      .set({
        highlightImage: doc.firstImage,
      })
      .commit();

    console.log(`Patched ${doc._id}`);
  }

  console.log(`Migration completed. Updated ${docs.length} wellnessPage document(s).`);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
