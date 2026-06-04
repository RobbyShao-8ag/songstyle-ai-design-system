import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { parse } from "parse5";

const DIST_DIR = path.resolve("dist");
const BASE_PATH = "/songstyle-ai-design-system";

async function findHtmlFiles(directory) {
  const entries = await readdir(directory);
  const files = [];

  for (const entry of entries) {
    const filePath = path.join(directory, entry);
    const fileStat = await stat(filePath);
    if (fileStat.isDirectory()) {
      files.push(...(await findHtmlFiles(filePath)));
    } else if (entry.endsWith(".html")) {
      files.push(filePath);
    }
  }

  return files;
}

function walk(node, visit) {
  visit(node);
  for (const child of node.childNodes ?? []) walk(child, visit);
}

function collectLinks(document) {
  const links = [];
  walk(document, (node) => {
    if (node.nodeName !== "a") return;
    const href = node.attrs?.find((attribute) => attribute.name === "href")?.value;
    if (href) links.push(href);
  });
  return links;
}

function shouldIgnore(href) {
  return (
    href.startsWith("#") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("http:") ||
    href.startsWith("https:")
  );
}

function hrefToTarget(href, sourceFile) {
  const urlPath = href.split("#")[0].split("?")[0];
  if (!urlPath || shouldIgnore(urlPath)) return null;

  if (urlPath.startsWith("/") && urlPath !== BASE_PATH && !urlPath.startsWith(`${BASE_PATH}/`)) {
    return path.join(DIST_DIR, "__invalid-base-path__");
  }

  const withoutBase = urlPath === BASE_PATH
    ? "/"
    : urlPath.startsWith(`${BASE_PATH}/`)
      ? urlPath.slice(BASE_PATH.length)
      : urlPath;
  const normalized = withoutBase.replace(/^\/+/, "");

  if (normalized && path.extname(normalized) && !normalized.endsWith(".html")) {
    return null;
  }

  const baseDirectory = urlPath.startsWith("/")
    ? DIST_DIR
    : path.dirname(sourceFile);
  const target = path.resolve(baseDirectory, normalized || ".");

  if (!normalized || normalized.endsWith("/")) {
    return path.join(target, "index.html");
  }

  return target;
}

const htmlFiles = await findHtmlFiles(DIST_DIR);
const missing = [];

for (const file of htmlFiles) {
  const document = parse(await readFile(file, "utf8"));
  for (const href of collectLinks(document)) {
    const target = hrefToTarget(href, file);
    if (!target) continue;
    try {
      await stat(target);
    } catch {
      missing.push(`${path.relative(DIST_DIR, file)} -> ${href}`);
    }
  }
}

if (missing.length > 0) {
  console.error("Broken internal links:");
  for (const item of missing) console.error(`- ${item}`);
  process.exitCode = 1;
} else {
  console.log("Internal links OK");
}
