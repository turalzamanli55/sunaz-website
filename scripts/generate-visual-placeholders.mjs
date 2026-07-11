import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const publicDir = path.join(root, "public", "placeholders");

const PRODUCT_SLUGS = [
  "whole-chicken", "premium-whole-chicken", "slow-growing-chicken", "slow-cooking-frozen-chicken",
  "fast-cooking-chicken", "chicken-fillet", "drumsticks", "thighs", "wings",
  "mid-joint-wings", "chicken-feet", "chicken-paws", "liver", "heart",
];

function createPlaceholderSvg(title, subtitle, width, height, accent) {
  const safeTitle = title.replace(/&/g, "&amp;").replace(/</g, "&lt;");
  const safeSub = subtitle.replace(/&/g, "&amp;").replace(/</g, "&lt;");
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0a2e22"/>
      <stop offset="50%" style="stop-color:#0F3D2E"/>
      <stop offset="100%" style="stop-color:#1a5c45"/>
    </linearGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" stroke-width="0.5" opacity="0.06"/>
    </pattern>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#bg)"/>
  <rect width="${width}" height="${height}" fill="url(#grid)"/>
  <rect x="0" y="${height - 8}" width="${width}" height="8" fill="${accent}"/>
  <circle cx="${width * 0.15}" cy="${height * 0.2}" r="60" fill="${accent}" opacity="0.08"/>
  <circle cx="${width * 0.85}" cy="${height * 0.75}" r="80" fill="white" opacity="0.04"/>
  <text x="${width / 2}" y="${height * 0.42}" text-anchor="middle" font-family="Georgia, serif" font-size="${Math.min(width / 14, 32)}" fill="white" font-weight="bold">SUNAZ</text>
  <text x="${width / 2}" y="${height * 0.52}" text-anchor="middle" font-family="Arial, sans-serif" font-size="${Math.min(width / 28, 16)}" fill="#D4AF37" letter-spacing="3">GROUP LLC</text>
  <text x="${width / 2}" y="${height * 0.65}" text-anchor="middle" font-family="Arial, sans-serif" font-size="${Math.min(width / 22, 20)}" fill="white" opacity="0.9">${safeTitle}</text>
  <text x="${width / 2}" y="${height * 0.72}" text-anchor="middle" font-family="Arial, sans-serif" font-size="${Math.min(width / 32, 13)}" fill="white" opacity="0.5">${safeSub}</text>
  <text x="${width / 2}" y="${height * 0.88}" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" fill="white" opacity="0.35">Replace with official photography</text>
</svg>`;
}

async function writeJpeg(sharp, svg, outPath) {
  await sharp(Buffer.from(svg)).jpeg({ quality: 88 }).toFile(outPath);
}

async function main() {
  const sharp = (await import("sharp")).default;
  const dirs = {
    hero: path.join(publicDir, "hero"),
    facilities: path.join(publicDir, "facilities"),
    products: path.join(publicDir, "products"),
  };
  Object.values(dirs).forEach((d) => fs.mkdirSync(d, { recursive: true }));

  const heroFiles = [
    { file: "hero-1.jpg", title: "Export Complex", sub: "Baku Facility", w: 1920, h: 1080 },
    { file: "hero-2.jpg", title: "Processing Plant", sub: "Production Facility", w: 1920, h: 1080 },
    { file: "hero-3.jpg", title: "Processing Line", sub: "Modern Equipment", w: 1920, h: 1080 },
    { file: "hero-4.jpg", title: "Cold Storage", sub: "Refrigerated Logistics", w: 1920, h: 1080 },
  ];

  for (const h of heroFiles) {
    const svg = createPlaceholderSvg(h.title, h.sub, h.w, h.h, "#D4AF37");
    await writeJpeg(sharp, svg, path.join(dirs.hero, h.file));
  }

  const facilityFiles = [
    { file: "baku-1.jpg", title: "Baku Export Complex", sub: "7 Hectares", w: 800, h: 600 },
    { file: "baku-2.jpg", title: "Baku Production", sub: "5,000+ m²", w: 600, h: 800 },
    { file: "baku-3.jpg", title: "Export Preparation", sub: "Baku, Azerbaijan", w: 700, h: 700 },
    { file: "lerik-1.jpg", title: "Lerik Complex", sub: "15 Hectares", w: 800, h: 600 },
    { file: "lerik-2.jpg", title: "Slaughtering Facility", sub: "7,000/hr Capacity", w: 600, h: 800 },
    { file: "lerik-3.jpg", title: "Primary Processing", sub: "Lerik, Azerbaijan", w: 700, h: 700 },
  ];

  for (const f of facilityFiles) {
    const svg = createPlaceholderSvg(f.title, f.sub, f.w, f.h, "#D4AF37");
    await writeJpeg(sharp, svg, path.join(dirs.facilities, f.file));
  }

  for (const slug of PRODUCT_SLUGS) {
    const name = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    const svg = createPlaceholderSvg(name, "Premium Poultry Product", 600, 600, "#D4AF37");
    await writeJpeg(sharp, svg, path.join(dirs.products, `${slug}.jpg`));
  }

  const partnersDir = path.join(root, "public", "partners");
  fs.mkdirSync(partnersDir, { recursive: true });

  const partnerLogos = [
    { file: "atlasfood-logo.png", title: "Atlas Food", sub: "International Partner", w: 440, h: 220 },
    { file: "sulavco-logo.png", title: "Sulavco", sub: "International Partner", w: 440, h: 220 },
  ];

  for (const p of partnerLogos) {
    const svg = createPlaceholderSvg(p.title, p.sub, p.w, p.h, "#0F3D2E");
    await sharp(Buffer.from(svg)).png().toFile(path.join(partnersDir, p.file));
  }

  console.log("Visual placeholders generated.");
}

main().catch(console.error);
