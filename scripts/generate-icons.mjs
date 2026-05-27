import sharp from 'sharp';
import pngToIco from 'png-to-ico';
import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const src = resolve(root, 'public', 'gslogo.png');

async function run() {
  // 1. Komprimera gslogo.png (max 400px bred)
  await sharp(src)
    .resize({ width: 400, withoutEnlargement: true })
    .png({ compressionLevel: 9, quality: 80 })
    .toFile(resolve(root, 'public', 'gslogo-opt.png'));

  // Ersätt originalet
  const { renameSync, unlinkSync } = await import('fs');
  try { unlinkSync(src); } catch {}
  renameSync(resolve(root, 'public', 'gslogo-opt.png'), src);
  console.log('✅ gslogo.png komprimerad');

  // 2. favicon-32.png
  await sharp(src)
    .resize(32, 32)
    .png({ compressionLevel: 9 })
    .toFile(resolve(root, 'public', 'favicon-32.png'));
  console.log('✅ favicon-32.png');

  // 3. apple-touch-icon.png (180×180)
  await sharp(src)
    .resize(180, 180)
    .png({ compressionLevel: 9 })
    .toFile(resolve(root, 'public', 'apple-touch-icon.png'));
  console.log('✅ apple-touch-icon.png');

  // 4. icon-192.png
  await sharp(src)
    .resize(192, 192)
    .png({ compressionLevel: 9 })
    .toFile(resolve(root, 'public', 'icon-192.png'));
  console.log('✅ icon-192.png');

  // 5. favicon.ico (16×16 + 32×32)
  const buf16 = await sharp(src).resize(16, 16).png().toBuffer();
  const buf32 = await sharp(src).resize(32, 32).png().toBuffer();
  const icoBuffer = await pngToIco([buf16, buf32]);
  writeFileSync(resolve(root, 'public', 'favicon.ico'), icoBuffer);
  console.log('✅ favicon.ico');

  console.log('\n🎉 Klart! Alla ikoner genererade.');
}

run().catch(err => { console.error(err); process.exit(1); });
