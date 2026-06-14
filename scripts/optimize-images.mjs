/**
 * Оптимизация растровых файлов в public/ (WebP) и SVG (SVGO).
 * Запуск: npm run optimize-images
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { optimize as svgoOptimize } from "svgo";

const PUBLIC = path.join(process.cwd(), "public");
const RASTER_EXT = new Set([".png", ".jpg", ".jpeg", ".webp"]);
const WEBP_QUALITY = 82;

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(abs));
    } else {
      files.push(abs);
    }
  }
  return files;
}

function maxWidth(relPath) {
  const p = relPath.replace(/\\/g, "/");
  if (p === "logo-salamaha.webp") return 160;
  if (p.startsWith("review-")) return 192;
  if (p.startsWith("category-")) return 640;
  if (
    p === "hero-resin-art.webp" ||
    p === "hero-floral-circle.webp" ||
    p.endsWith("/hero.webp")
  ) {
    return 1600;
  }
  if (p.startsWith("kurs-smola-derevo/")) return 1200;
  if (p.startsWith("portfolio-")) return 960;
  if (p.startsWith("about-")) return 960;
  if (p.startsWith("blog-")) return 1200;
  if (p.startsWith("product-")) return 1200;
  if (p.startsWith("masters-")) return 1200;
  if (p === "quick-lead-botanical-table.webp") return 1200;
  return 1200;
}

async function optimizeRaster(absPath, relPath) {
  const ext = path.extname(absPath).toLowerCase();
  if (!RASTER_EXT.has(ext)) return;

  const isWebp = ext === ".webp";
  const outPath = isWebp
    ? absPath
    : absPath.replace(/\.(png|jpe?g)$/i, ".webp");
  const outRel = isWebp
    ? relPath
    : relPath.replace(/\.(png|jpe?g)$/i, ".webp");

  const inputStat = fs.statSync(absPath);
  const width = maxWidth(outRel);

  const meta = await sharp(absPath).metadata();
  let pipeline = sharp(absPath).rotate();
  if (meta.width && meta.width > width) {
    pipeline = sharp(absPath)
      .rotate()
      .resize({ width, withoutEnlargement: true });
  }

  const tmpPath = `${outPath}.opt.tmp`;
  await pipeline
    .webp({ quality: WEBP_QUALITY, effort: 6, smartSubsample: true })
    .toFile(tmpPath);

  const newStat = fs.statSync(tmpPath);
  const outExists = fs.existsSync(outPath);
  const outStat = outExists ? fs.statSync(outPath) : null;

  const shouldReplace =
    !outExists ||
    (isWebp && newStat.size < outStat.size * 0.97) ||
    (!isWebp && newStat.size < inputStat.size * 0.97);

  if (!shouldReplace) {
    fs.unlinkSync(tmpPath);
    if (!isWebp) {
      console.log(`skip ${relPath} → ${outRel} (webp уже меньше)`);
    }
    return;
  }

  fs.renameSync(tmpPath, outPath);
  const saved = outStat
    ? Math.round((outStat.size - newStat.size) / 1024)
    : Math.round((inputStat.size - newStat.size) / 1024);

  console.log(
    `${outRel}: ${Math.round(newStat.size / 1024)} KB` +
      (outStat || !isWebp
        ? ` (−${saved} KB vs ${isWebp ? "до" : "источник"})`
        : ""),
  );

  if (!isWebp) {
    fs.unlinkSync(absPath);
  }
}

function optimizeSvg(absPath, relPath) {
  try {
    const input = fs.readFileSync(absPath, "utf8");
    const result = svgoOptimize(input, {
      multipass: true,
      path: absPath,
    });
    if (!result.data || result.data.length >= input.length) {
      console.log(`skip ${relPath} (svg уже оптимален)`);
      return;
    }
    fs.writeFileSync(absPath, result.data);
    console.log(
      `${relPath}: ${Math.round(input.length / 1024)} → ${Math.round(result.data.length / 1024)} KB`,
    );
  } catch (err) {
    console.warn(`skip ${relPath} (svg: ${err.message ?? err})`);
  }
}

async function main() {
  if (!fs.existsSync(PUBLIC)) {
    console.error("Нет папки public/");
    process.exit(1);
  }

  const files = walk(PUBLIC);
  let raster = 0;
  let svg = 0;

  for (const abs of files) {
    const rel = path.relative(PUBLIC, abs);
    const ext = path.extname(abs).toLowerCase();
    if (RASTER_EXT.has(ext)) {
      await optimizeRaster(abs, rel);
      raster += 1;
    } else if (ext === ".svg") {
      optimizeSvg(abs, rel);
      svg += 1;
    }
  }

  console.log(`Готово: ${raster} растровых, ${svg} SVG в ${PUBLIC}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
