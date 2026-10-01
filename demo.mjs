import { readFile } from "node:fs/promises";
import { applyLocaleMap, collectEntries } from "./sync.mjs";

const contentType = JSON.parse(
  await readFile(new URL("./content-type.json", import.meta.url), "utf8")
);
const entry = JSON.parse(await readFile(new URL("./entry.json", import.meta.url), "utf8"));

const pushed = collectEntries(entry, contentType, "en-US");
console.log("Contentful push (Symbol and Text only):");
console.log(JSON.stringify(pushed, null, 2));

const french = {
  "cf.entry.hello-world.title": "Bonjour depuis Contentful",
  "cf.entry.hello-world.body": "Seuls les champs Symbol et Text partent vers LocalesFS.",
};
const pulled = applyLocaleMap(entry.fields, french, "fr");
console.log("\nFields after pull into fr:");
console.log(JSON.stringify(pulled.fields, null, 2));
console.log(`writes: ${pulled.writes}`);
