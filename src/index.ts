import { execSync } from "node:child_process";
import parseGitDiff from "parse-git-diff";

async function main() {
  const diff = execSync("git diff HEAD~1 HEAD", {
    encoding: "utf8",
});

  if (!diff.trim()) {
    console.log("No changes found.");
    return;
  }

  const parsed = parseGitDiff(diff);

  console.dir(parsed, {
    depth: null,
    colors: true,
  });

  console.log("\n=== Walking the AST ===\n");
}

main().catch(console.error);