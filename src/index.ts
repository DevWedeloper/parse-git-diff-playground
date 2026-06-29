import { execSync } from "node:child_process";
import parseGitDiff from "parse-git-diff";

async function main() {
  const before = process.env.GITHUB_EVENT_BEFORE;
  const after = process.env.GITHUB_SHA;

  console.log({ before, after });

  const range =
    before && after
      ? `${before} ${after}`
      : "HEAD~1 HEAD";

  const diff = execSync(`git diff ${range}`, {
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