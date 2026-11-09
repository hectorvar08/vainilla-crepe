// Genera las imágenes optimizadas del sitio a partir de los originales en assets-src/.
// Los originales NO se modifican. Ejecutar con:  npm run images
//
// Para cambiar una foto: reemplaza el PNG en assets-src/fotos/ (mismo nombre)
// y vuelve a ejecutar este script. Si agregas una crepa nueva, añádela a FOTOS
// y a src/data/menu.ts con el mismo slug.

import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const OUT = 'public/img';
const ANCHOS = [480, 800, 1200];

// archivo original → slug público
const FOTOS = {
  'Banana-caramel.png': 'banana-caramel',
  'Frutos-rojos.png': 'frutos-rojos',
  'Strawberry-creme.png': 'strawberry-cream',
  'Chocolate-avellana.png': 'chocolate-avellana',
  'Tropical.png': 'tropical',
  'Fresa-plátano.png': 'fresa-platano',
  'Apple-pie.png': 'apple-pie',
  'Cookie-cream.png': 'cookies-cream',
};

// Fondo café de Logo-inicial.png (muestreado: #30120E, uniforme ±2)
const CAFE = { r: 0x30, g: 0x12, b: 0x0e };

// Recortes del logo dentro de Logo-inicial.png (941×1672), sin retocar el logo.
// Recorte con margen amplio: en la página las orillas se difuminan (mask) para fundirse
// con el café liso sin que se note el grano del archivo original.
const LOGO = { left: 205, top: 666, width: 532, height: 352 }; // lettering + CRÊPE + estrella
const ESTRELLA = { left: 432, top: 903, width: 78, height: 78 }; // estrella de cuatro puntas

await mkdir(OUT, { recursive: true });

for (const [archivo, slug] of Object.entries(FOTOS)) {
  const src = `assets-src/fotos/${archivo}`;
  for (const w of ANCHOS) {
    const base = sharp(src).resize(w, w);
    await base.clone().avif({ quality: 55, effort: 6 }).toFile(`${OUT}/${slug}-${w}.avif`);
    await base.clone().webp({ quality: 78 }).toFile(`${OUT}/${slug}-${w}.webp`);
  }
  console.log('✓', slug);
}

const logoSrc = 'assets-src/marca/Logo-inicial.png';
const logo = sharp(logoSrc).extract(LOGO);
await logo.clone().png({ compressionLevel: 9 }).toFile(`${OUT}/logo.png`);
await logo.clone().webp({ quality: 92 }).toFile(`${OUT}/logo.webp`);

// Favicons a partir de la estrella (sobre el mismo café)
const estrella = sharp(logoSrc).extract(ESTRELLA);
await estrella.clone().resize(48, 48).png().toFile('public/favicon.png');
await sharp(logoSrc)
  .extract({ left: 245, top: 696, width: 452, height: 292 }) // recorte ajustado al logo
  .resize(150, null)
  .extend({ top: 40, bottom: 40, left: 15, right: 15, background: CAFE })
  .resize(180, 180, { fit: 'contain', background: CAFE })
  .png()
  .toFile('public/apple-touch-icon.png');

// Imagen para compartir en redes (Open Graph)
await sharp('assets-src/fotos/Banana-caramel.png')
  .resize(1200, 630, { fit: 'contain', background: { r: 0xf6, g: 0xe8, b: 0xd7 } })
  .jpeg({ quality: 82 })
  .toFile(`${OUT}/og.jpg`);

console.log('✓ logo, favicons y og');
