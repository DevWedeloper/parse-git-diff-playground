import { readFile } from "node:fs/promises";
import parseGitDiff from "parse-git-diff";

async function main() {
  const diff = await readFile("sample.diff", "utf8");

  const parsed = parseGitDiff(diff);

  console.dir(parsed, {
    depth: null,
    colors: true,
  });

  console.log("\n=== Walking the AST ===\n");
}

main().catch(console.error);