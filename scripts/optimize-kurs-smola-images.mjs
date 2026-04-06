/**
 * Один раз: исходники из Cursor assets → public/kurs-smola-derevo/*.webp
 * Запуск: node scripts/optimize-kurs-smola-images.mjs
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ASSETS_DIR =
  process.env.KURS_IMAGES_SRC ??
  path.join(
    process.env.HOME,
    ".cursor/projects/Users-aleksandr-admin-Desktop-Site-Salamaha-fine-web/assets",
  );

const OUT_DIR = path.join(process.cwd(), "public/kurs-smola-derevo");

const JOBS = [
  {
    src: "IMG_5572-9f2633d2-455f-4843-94ec-19ebf91581ce.png",
    dest: "hero.webp",
    width: 1400,
  },
  { src: "IMG_5561-33539a5f-ff99-4b1a-9cdf-baf3e682fd41.png", dest: "g01.webp", width: 1200 },
  { src: "IMG_0630-4e8eea9e-59fa-41c1-b942-7c6ffe916f1a.png", dest: "g02.webp", width: 1200 },
  { src: "IMG_1773-db40727c-ef6f-443d-9c12-639b06143497.png", dest: "g03.webp", width: 1200 },
  { src: "IMG_3452-6afe3f2d-2874-4481-8a57-7a4e5b466e4e.png", dest: "g04.webp", width: 1200 },
  { src: "IMG_2351-26b9b851-a551-45be-842d-2071042d3d02.png", dest: "g05.webp", width: 1200 },
  { src: "IMG_1931-2633f1b2-679f-4a12-b599-d3870190fcf7.png", dest: "g06.webp", width: 1200 },
  { src: "IMG_4715-673e3009-c38b-4c63-82bc-7aa1f69faffc.png", dest: "g07.webp", width: 1200 },
  { src: "IMG_2047-8f62766c-6825-42af-9efa-c8e2e8d3dec5.png", dest: "g08.webp", width: 1200 },
  { src: "IMG_5718-0298e90a-f7ce-4692-919b-96279bcb6496.png", dest: "g09.webp", width: 1200 },
  { src: "LYU05117_2-8952e0e5-0e7b-456a-84e8-204241b18ccc.png", dest: "g10.webp", width: 1200 },
  { src: "LYU05136-624d2c93-6fea-4e2d-8b49-81de9e0e67b4.png", dest: "g11.webp", width: 1200 },
  { src: "LYU05179-b6125455-cdba-4837-ba2b-8aea6770dc88.png", dest: "g12.webp", width: 1200 },
  {
    src: "IMG_5572_2-2ac1d873-eb19-4601-b0f5-b05f939f3146.png",
    dest: "g13.webp",
    width: 1200,
  },
  {
    src: "LYU05243-1dd60116-2f24-4ec8-ad9b-19628816a0b6.png",
    dest: "g14.webp",
    width: 1200,
  },
  {
    src: "IMG_7849-319c885d-dbe8-43fa-b4d8-4f5292b4a145.png",
    dest: "g15.webp",
    width: 1200,
  },
  {
    src: "IMG_7983_2-ebdc2435-fb68-4241-891c-872af6b61a8f.png",
    dest: "g16.webp",
    width: 1200,
  },
];

async function main() {
  if (!fs.existsSync(ASSETS_DIR)) {
    console.error("Нет папки с исходниками:", ASSETS_DIR);
    process.exit(1);
  }
  fs.mkdirSync(OUT_DIR, { recursive: true });

  for (const job of JOBS) {
    const input = path.join(ASSETS_DIR, job.src);
    if (!fs.existsSync(input)) {
      console.warn("Пропуск (нет файла):", job.src);
      continue;
    }
    const out = path.join(OUT_DIR, job.dest);
    await sharp(input)
      .rotate()
      .resize({ width: job.width, withoutEnlargement: true })
      .webp({ quality: 82, effort: 5, smartSubsample: true })
      .toFile(out);
    const st = fs.statSync(out);
    console.log(job.dest, "→", Math.round(st.size / 1024), "KB");
  }
  console.log("Готово:", OUT_DIR);
}

main();
