import fs from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";

const root = process.cwd();
const envPath = path.join(root, ".env.local");

if (!fs.existsSync(envPath)) {
  throw new Error(".env.local not found");
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

const dividerPaths = [
  "/welcome_timian/Timian-8.jpg",
  "/welcome_timian/Timian-163.jpg",
  "/welcome_timian/Timian-187.jpg",
  "/welcome_timian/Timian-243.jpg",
  "/welcome_timian/Timian-259.jpg",
  "/divider_eight_rooms/Timian-2.jpg",
  "/divider_eight_rooms/Timian-13.jpg",
  "/divider_eight_rooms/Timian-19.jpg",
  "/divider_eight_rooms/Timian-66.jpg",
  "/divider_eight_rooms/Timian-87.jpg",
];

const results = [];

for (const publicPath of dividerPaths) {
  const absolutePath = path.join(root, "public", publicPath);
  if (!fs.existsSync(absolutePath)) {
    results.push({ publicPath, error: "missing-local-file" });
    continue;
  }

  const fileBuffer = fs.readFileSync(absolutePath);
  const filename = path.basename(absolutePath);
  const asset = await client.assets.upload("image", fileBuffer, { filename });

  results.push({
    publicPath,
    assetId: asset._id,
    originalFilename: asset.originalFilename,
    url: asset.url,
  });
}

console.log(JSON.stringify(results, null, 2));
