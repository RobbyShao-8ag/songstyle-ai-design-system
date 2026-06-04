import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import YAML from "yaml";

const skillsDir = path.resolve("skills");
const errors = [];
const names = (await readdir(skillsDir, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

for (const folderName of names) {
  const skillDir = path.join(skillsDir, folderName);
  const skillFile = path.join(skillDir, "SKILL.md");
  let markdown;
  try {
    markdown = await readFile(skillFile, "utf8");
  } catch {
    errors.push(`${folderName}: missing SKILL.md`);
    continue;
  }

  const match = markdown.match(/^---\n([\s\S]*?)\n---/);
  if (!match) {
    errors.push(`${folderName}: missing YAML frontmatter`);
    continue;
  }

  let data;
  try {
    data = YAML.parse(match[1]);
  } catch (error) {
    errors.push(`${folderName}: invalid YAML frontmatter: ${error.message}`);
    continue;
  }

  if (!data.name) errors.push(`${folderName}: missing name`);
  if (!data.description) errors.push(`${folderName}: missing description`);
  if (data.name !== folderName) errors.push(`${folderName}: name must match parent directory`);
  if (data.name?.length > 64) errors.push(`${folderName}: name exceeds 64 characters`);
  if (data.name && !/^[a-z0-9-]+$/.test(data.name)) {
    errors.push(`${folderName}: name must use lowercase letters, numbers, and hyphens only`);
  }
  if (data.description?.length > 1024) {
    errors.push(`${folderName}: description exceeds 1024 characters`);
  }

  const references = [...markdown.matchAll(/\]\((references\/[^)]+)\)/g)].map(
    ([, reference]) => reference
  );
  for (const reference of references) {
    try {
      await access(path.join(skillDir, reference));
    } catch {
      errors.push(`${folderName}: missing referenced file ${reference}`);
    }
  }
}

if (errors.length > 0) {
  for (const error of errors) console.error(error);
  process.exitCode = 1;
} else {
  console.log("Skills OK");
}
