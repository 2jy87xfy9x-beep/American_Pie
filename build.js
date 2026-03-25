// Run: node build.js
// Re-run whenever you add or edit any .md or .json file.

const fs = require("fs");
const path = require("path");

const ROOT = __dirname;

function walkFiles(dir, predicate) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory()) {
      out.push(...walkFiles(full, predicate));
    } else if (predicate(full)) {
      out.push(full);
    }
  }
  return out;
}

function relPosix(fromDir, fullPath) {
  return path.relative(fromDir, fullPath).split(path.sep).join("/");
}

function escapeTemplateLiteralContent(s) {
  return s
    .replace(/\\/g, "\\\\")
    .replace(/`/g, "\\`")
    .replace(/\$\{/g, "\\${");
}

function readMarkdownMap(rootDir) {
  const map = {};
  for (const f of walkFiles(rootDir, (p) => /\.md$/i.test(p))) {
    const key = relPosix(rootDir, f).replace(/\.md$/i, "");
    map[key] = escapeTemplateLiteralContent(fs.readFileSync(f, "utf8"));
  }
  return map;
}

function readSimulationsMap(rootDir) {
  const map = {};
  for (const f of walkFiles(rootDir, (p) => /\.json$/i.test(p))) {
    const key = relPosix(rootDir, f).replace(/\.json$/i, "");
    const text = fs.readFileSync(f, "utf8");
    map[key] = JSON.parse(text);
  }
  return map;
}

function readFlatMarkdownMap(dir) {
  const map = {};
  if (!fs.existsSync(dir)) return map;
  for (const name of fs.readdirSync(dir)) {
    if (!/\.md$/i.test(name)) continue;
    const full = path.join(dir, name);
    if (!fs.statSync(full).isFile()) continue;
    const key = name.replace(/\.md$/i, "");
    map[key] = escapeTemplateLiteralContent(fs.readFileSync(full, "utf8"));
  }
  return map;
}

function emitObjectBlock(lines, indent, obj, stringifyLeaf) {
  const keys = Object.keys(obj).sort();
  for (const k of keys) {
    const leaf = stringifyLeaf(obj[k]);
    lines.push(indent + JSON.stringify(k) + ": " + leaf + ",");
  }
}

function main() {
  const articles = readMarkdownMap(path.join(ROOT, "articles"));
  const simulations = readSimulationsMap(path.join(ROOT, "simulations"));
  const worksheets = readFlatMarkdownMap(path.join(ROOT, "worksheets"));
  const sources = readFlatMarkdownMap(path.join(ROOT, "sources"));

  const lines = [];
  lines.push("export const data = {");
  lines.push("  articles: {");
  emitObjectBlock(lines, "    ", articles, (v) => "`" + v + "`");
  lines.push("  },");
  lines.push("  simulations: {");
  emitObjectBlock(lines, "    ", simulations, (v) => JSON.stringify(v));
  lines.push("  },");
  lines.push("  worksheets: {");
  emitObjectBlock(lines, "    ", worksheets, (v) => "`" + v + "`");
  lines.push("  },");
  lines.push("  sources: {");
  emitObjectBlock(lines, "    ", sources, (v) => "`" + v + "`");
  lines.push("  },");
  lines.push("};");
  lines.push("");

  fs.writeFileSync(path.join(ROOT, "data.js"), lines.join("\n"), "utf8");
}

main();
