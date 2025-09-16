#!/usr/bin/env node
const fs = require("fs-extra");
const path = require("path");
const JSZip = require("jszip");

(async () => {
  const ROOT = path.resolve(__dirname, "..");
  const outDir = path.join(ROOT, "exports");
  await fs.ensureDir(outDir);

  const ts = new Date().toISOString().replace(/[:.]/g, "-");
  const manifest = {
    project: "lux-veritatis",
    generated_at: new Date().toISOString(),
    files: [],
  };

  const wanted = [
    "src/istotyConfig.js",
    "src/ChatView.js",
    "src/ChatZIstotami.js",
    "src/services/claudeService.js",
    "src/utils/cryptoStorage.js",
    "src/utils/abExperiment.js",
    "src/utils/featureFlags.js",
    "src/utils/telemetry.js"
  ];

  const zip = new JSZip();

  for (const rel of wanted) {
    const p = path.join(ROOT, rel);
    if (await fs.pathExists(p)) {
      const data = await fs.readFile(p, "utf8");
      zip.file(rel, data);
      manifest.files.push({ path: rel, bytes: Buffer.byteLength(data) });
    }
  }

  await fs.writeJson(path.join(outDir, `backup-${ts}.json`), manifest, { spaces: 2 });
  const zipBuf = await zip.generateAsync({ type: "nodebuffer" });
  await fs.writeFile(path.join(outDir, `backup-${ts}.zip`), zipBuf);

  console.log("Backup ready in /exports");
})();
