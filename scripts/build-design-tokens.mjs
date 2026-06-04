import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { compileTokenFiles } from "./lib/design-token-compiler.mjs";

const sourceDir = path.resolve("design-tokens/source");
const distDir = path.resolve("design-tokens/dist");

const names = (await readdir(sourceDir))
  .filter((name) => name.endsWith(".tokens.json"))
  .sort();

if (names.length === 0) {
  throw new Error("No design token source files found.");
}

const files = await Promise.all(
  names.map(async (name) => ({
    name,
    data: JSON.parse(await readFile(path.join(sourceDir, name), "utf8"))
  }))
);

const { css, resolved } = compileTokenFiles(files);

await mkdir(distDir, { recursive: true });
await writeFile(path.join(distDir, "songstyle.css"), css);
await writeFile(
  path.join(distDir, "songstyle.resolved.json"),
  `${JSON.stringify(resolved, null, 2)}\n`
);
