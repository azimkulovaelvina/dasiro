import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
const sources = JSON.parse(
  await fs.readFile(new URL("./image-sources.json", import.meta.url), "utf8"),
);
const output = new URL("../public/assets/", import.meta.url);
await fs.mkdir(output, { recursive: true });
for (const { name, path: source } of sources) {
  if (!source) continue;
  await sharp(source)
    .rotate()
    .resize({ width: 1400, withoutEnlargement: true })
    .webp({ quality: 82, effort: 5 })
    .toFile(path.join(fileURLToPath(output), `${name}.webp`));
  await sharp(source)
    .rotate()
    .resize({ width: 640, withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(path.join(fileURLToPath(output), `${name}-small.webp`));
  console.log(`Prepared ${name}`);
}
