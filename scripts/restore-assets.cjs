/*
 * Restores the binary files in `public/images` from the generated TypeScript modules.
 * Useful after downloading a project that only contains source code.
 *
 * Run from the project root: node scripts/restore-assets.cjs
 */
const fs = require("fs");
const path = require("path");
const { GROUPS } = require("./asset-map.cjs");

const root = process.cwd();

for (const group of GROUPS) {
  const modulePath = path.join(root, group.module);
  if (!fs.existsSync(modulePath)) {
    throw new Error(`Missing generated asset module: ${group.module}`);
  }
  const source = fs.readFileSync(modulePath, "utf8");

  for (const entry of group.files) {
    const key = entry.key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const pattern = group.nested
      ? new RegExp(`\\b${key}:\\s*\\{[\\s\\S]*?\\b${entry.slot}:\\s*"(data:[^"]+)"`)
      : new RegExp(`\\b${key}:\\s*"(data:[^"]+)"`);
    const match = source.match(pattern);

    if (!match) throw new Error(`Could not decode ${entry.file} from ${group.module}`);
    const [, base64] = match[1].split(",");
    const destination = path.join(root, group.dir, entry.file);
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.writeFileSync(destination, Buffer.from(base64, "base64"));
    console.log(`restored ${destination} (${fs.statSync(destination).size} bytes)`);
  }
}
