import fs from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";

const root = process.cwd();
const envPath = path.join(root, ".env.local");
const videoPath = path.join(root, "public/local_cheese/Nature_1_v1.mov");

if (!fs.existsSync(envPath)) {
  throw new Error(".env.local not found");
}

if (!fs.existsSync(videoPath)) {
  throw new Error(`Video file not found: ${videoPath}`);
}

function loadEnv(filePath) {
  const text = fs.readFileSync(filePath, "utf8");
  const env = {};

  for (const line of text.split("\n")) {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (!match) continue;

    let value = match[2].trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    env[match[1].trim()] = value;
  }

  return env;
}

const env = loadEnv(envPath);

const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  token: env.SANITY_API_WRITE_TOKEN,
  apiVersion: "2026-03-08",
  useCdn: false,
});

const fileBuffer = fs.readFileSync(videoPath);
const uploaded = await client.assets.upload("file", fileBuffer, {
  filename: "Nature_1_v1.mov",
  label: "Local cheese seasonality video",
});

console.log(
  JSON.stringify(
    {
      assetId: uploaded._id,
      url: uploaded.url,
      originalFilename: uploaded.originalFilename,
      mimeType: uploaded.mimeType,
    },
    null,
    2,
  ),
);
