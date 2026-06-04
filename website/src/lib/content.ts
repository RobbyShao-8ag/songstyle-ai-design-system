import { getCollection, type CollectionEntry } from "astro:content";

export type ContentKind =
  | "docs"
  | "checklists"
  | "prompts"
  | "examples"
  | "skills";

export interface ContentItem {
  kind: ContentKind;
  route: string;
  title: string;
  description: string;
  section: string;
  order: number;
  entry: CollectionEntry<ContentKind>;
}

export async function getContentItems(): Promise<ContentItem[]> {
  const [docs, checklists, prompts, examples, skills] = await Promise.all([
    getCollection("docs"),
    getCollection("checklists"),
    getCollection("prompts"),
    getCollection("examples"),
    getCollection("skills")
  ]);

  const pageItems = [
    ...docs.map((entry) => ({ kind: "docs" as const, entry })),
    ...checklists.map((entry) => ({ kind: "checklists" as const, entry })),
    ...prompts.map((entry) => ({ kind: "prompts" as const, entry })),
    ...examples.map((entry) => ({ kind: "examples" as const, entry }))
  ].map(({ kind, entry }) => ({
    kind,
    route: entry.data.route,
    title: entry.data.title,
    description: entry.data.description,
    section: entry.data.section,
    order: entry.data.order,
    entry
  }));

  const skillItems = skills.map((entry) => ({
    kind: "skills" as const,
    route: `/skills/${entry.data.name}/`,
    title: entry.data.name,
    description: entry.data.description,
    section: "Skills",
    order: 100,
    entry
  }));

  const items = [...pageItems, ...skillItems].sort(
    (a, b) =>
      a.section.localeCompare(b.section, "zh-CN") ||
      a.order - b.order ||
      a.title.localeCompare(b.title, "zh-CN")
  );
  const routes = new Set<string>();
  for (const item of items) {
    if (routes.has(item.route)) throw new Error(`Duplicate content route: ${item.route}`);
    routes.add(item.route);
  }

  return items;
}

export async function getDocumentNavigation(): Promise<ContentItem[]> {
  return (await getContentItems()).filter(
    ({ kind }) => kind === "docs" || kind === "checklists"
  );
}
