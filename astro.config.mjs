import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import { fileURLToPath } from "node:url";

const referenceUi = fileURLToPath(new URL("./packages/reference-ui/src", import.meta.url));

export default defineConfig({
  site: "https://robbyshao-8ag.github.io",
  base: "/songstyle-ai-design-system",
  srcDir: "./website/src",
  publicDir: "./website/public",
  outDir: "./dist",
  integrations: [mdx(), sitemap()],
  vite: {
    resolve: {
      alias: {
        "@songstyle/reference-ui": referenceUi
      }
    }
  }
});
