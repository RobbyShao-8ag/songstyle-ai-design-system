export function withBase(path: string): string {
  const normalized = path.replace(/^\/+/, "");
  const base = import.meta.env.BASE_URL.replace(/\/?$/, "/");
  return `${base}${normalized}`;
}
