import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(".");
const dist = resolve(root, "dist");

if (!existsSync(dist)) {
  throw new Error("dist folder not found. Run build before copy-pages-files.");
}

mkdirSync(dist, { recursive: true });

const files = ["terms.html", "privacy.html"];
for (const name of files) {
  const src = resolve(root, name);
  const dest = resolve(dist, name);
  if (existsSync(src)) {
    copyFileSync(src, dest);
  }
}

console.log("Copied static legal pages to dist.");
