import { spawnSync } from "node:child_process";

const values = {
  NEXT_PUBLIC_SANITY_PROJECT_ID: "sacle4cb",
  NEXT_PUBLIC_SANITY_DATASET: "production",
  NEXT_PUBLIC_SANITY_API_VERSION: "2025-01-01",
  SANITY_STUDIO_PROJECT_ID: "sacle4cb",
  SANITY_STUDIO_DATASET: "production",
  NEXT_PUBLIC_SITE_URL: "https://mahadev-chi.vercel.app",
};

const targets = ["production", "preview", "development"];

function run(args, input) {
  const result = spawnSync("npx", ["vercel", ...args], {
    input,
    encoding: "utf8",
    shell: true,
  });
  return {
    status: result.status,
    stdout: result.stdout || "",
    stderr: result.stderr || "",
  };
}

for (const [key, value] of Object.entries(values)) {
  for (const target of targets) {
    run(["env", "rm", key, target, "--yes", "--scope", "abhishek60"]);
    const added = run(
      ["env", "add", key, target, "--scope", "abhishek60"],
      `${value}\n`,
    );
    if (added.status !== 0) {
      console.error(`Failed ${key}/${target}`, added.stdout, added.stderr);
      process.exit(1);
    }
    console.log(`Set ${key} for ${target}`);
  }
}
