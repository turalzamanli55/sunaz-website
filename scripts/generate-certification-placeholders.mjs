import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const certDir = path.join(root, "public", "certifications");
const imgDir = path.join(certDir, "images");

const certificates = [
  { pdf: "halal-certificate.pdf", img: "halal-certificate.jpg", title: "Halal Certification" },
  { pdf: "aqta-compliance.pdf", img: "aqta-compliance.jpg", title: "AQTA Compliance" },
  { pdf: "veterinary-certificate.pdf", img: "veterinary-certificate.jpg", title: "Veterinary Certification" },
  { pdf: "export-compliance.pdf", img: "export-compliance.jpg", title: "Export Compliance" },
  { pdf: "quality-assurance.pdf", img: "quality-assurance.jpg", title: "Quality Assurance" },
];

function createPdf(title) {
  const safeTitle = title.replace(/[()\\]/g, "");
  return `%PDF-1.4
1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj
2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj
3 0 obj<</Type/Page/MediaBox[0 0 612 792]/Parent 2 0 R/Contents 4 0 R/Resources<</Font<</F1 5 0 R>>>>>>endobj
4 0 obj<</Length 60>>stream
BT /F1 20 Tf 72 720 Td (SUNAZ - ${safeTitle}) Tj ET
endstream
endobj
5 0 obj<</Type/Font/Subtype/Type1/BaseFont/Helvetica>>endobj
xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000266 00000 n 
0000000375 00000 n 
trailer<</Size 6/Root 1 0 R>>
startxref
450
%%EOF`;
}

function createSvgPlaceholder(title, accent) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="560" viewBox="0 0 400 560">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0F3D2E"/>
      <stop offset="100%" style="stop-color:#1a5c45"/>
    </linearGradient>
  </defs>
  <rect width="400" height="560" fill="url(#bg)"/>
  <rect x="24" y="24" width="352" height="512" rx="12" fill="#ffffff" opacity="0.95"/>
  <rect x="24" y="24" width="352" height="8" rx="4" fill="${accent}"/>
  <text x="200" y="120" text-anchor="middle" font-family="Georgia, serif" font-size="22" fill="#0F3D2E" font-weight="bold">SUNAZ</text>
  <text x="200" y="155" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" fill="#6b7280" letter-spacing="2">GROUP LLC</text>
  <text x="200" y="260" text-anchor="middle" font-family="Georgia, serif" font-size="18" fill="#0F3D2E">${title}</text>
  <text x="200" y="300" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="#9ca3af">Certificate Placeholder</text>
  <rect x="80" y="340" width="240" height="1" fill="#D4AF37" opacity="0.5"/>
  <text x="200" y="380" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" fill="#9ca3af">Replace with official document</text>
  <text x="200" y="500" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" fill="#D4AF37">CERTIFIED</text>
</svg>`;
}

const accents = ["#D4AF37", "#0F3D2E", "#1a5c45", "#D4AF37", "#0F3D2E"];

fs.mkdirSync(imgDir, { recursive: true });

const sharp = (await import("sharp")).default;

for (let i = 0; i < certificates.length; i++) {
  const cert = certificates[i];
  const pdfPath = path.join(certDir, cert.pdf);
  const imgPath = path.join(imgDir, cert.img);

  fs.writeFileSync(pdfPath, createPdf(cert.title));
  const svg = createSvgPlaceholder(cert.title, accents[i]);
  await sharp(Buffer.from(svg)).jpeg({ quality: 90 }).toFile(imgPath);
}

console.log("Certification placeholders generated.");
