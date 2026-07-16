import { readdir, stat } from "node:fs/promises";
import path from "node:path";

const STATIC_DIR = path.resolve(".next/static");
const budgets = {
  ".js": 250 * 1024,
  ".css": 150 * 1024,
};

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const resolved = path.join(directory, entry.name);
      return entry.isDirectory() ? walk(resolved) : [resolved];
    }),
  );
  return files.flat();
}

const violations = [];
for (const file of await walk(STATIC_DIR)) {
  const extension = path.extname(file);
  const budget = budgets[extension];
  if (!budget) continue;
  const { size } = await stat(file);
  if (size > budget) {
    violations.push(
      `${path.relative(process.cwd(), file)}: ${(size / 1024).toFixed(1)} KiB > ${budget / 1024} KiB`,
    );
  }
}

if (violations.length > 0) {
  console.error(`Bundle budget exceeded:\n${violations.join("\n")}`);
  process.exitCode = 1;
} else {
  console.log("Bundle budgets respected (JS ≤ 250 KiB, CSS ≤ 150 KiB per asset). ");
}
