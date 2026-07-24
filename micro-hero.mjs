import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';
import { statSync } from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const imagesDir = path.join(__dirname, 'src', 'assets', 'images');

// 640x360 WebP at q=8 (effort: 6)
await sharp(path.join(imagesDir, 'hero_tree_nature_1784729516064.jpg'))
  .resize(640, 360, { fit: 'cover' })
  .webp({ quality: 8, effort: 6, smartSubsample: true })
  .toFile(path.join(imagesDir, 'hero_tree_nature_1784729516064.webp'));

const heroSize = statSync(path.join(imagesDir, 'hero_tree_nature_1784729516064.webp')).size;
console.log(`✓ Micro-compressed Hero WebP: ${(heroSize/1024).toFixed(1)} KiB`);
