const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const sourceImage = '/home/jeremy_work/OpenSCRM/jixing.png';
const dashboardDir = '/home/jeremy_work/OpenSCRM/OpenSCRM-dashboard';

async function generateLogos() {
  console.log('Generating logos from jixing.png...');

  // 1. Copy to public/logo.png (original size or reasonable size)
  await sharp(sourceImage)
    .resize(200, 200, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .toFile(path.join(dashboardDir, 'public/logo.png'));
  console.log('Created public/logo.png');

  // 2. Create icons for PWA
  await sharp(sourceImage)
    .resize(128, 128, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .toFile(path.join(dashboardDir, 'public/icons/icon-128x128.png'));
  console.log('Created public/icons/icon-128x128.png');

  await sharp(sourceImage)
    .resize(192, 192, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .toFile(path.join(dashboardDir, 'public/icons/icon-192x192.png'));
  console.log('Created public/icons/icon-192x192.png');

  await sharp(sourceImage)
    .resize(512, 512, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .toFile(path.join(dashboardDir, 'public/icons/icon-512x512.png'));
  console.log('Created public/icons/icon-512x512.png');

  // 3. Copy to src/assets/logo.png
  await sharp(sourceImage)
    .resize(200, 200, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .toFile(path.join(dashboardDir, 'src/assets/logo.png'));
  console.log('Created src/assets/logo.png');

  // 4. Create favicon (32x32)
  await sharp(sourceImage)
    .resize(32, 32, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toFile(path.join(dashboardDir, 'public/favicon.png'));
  console.log('Created public/favicon.png');

  // 5. Create openscrm_icon replacement (256x256 for loading page)
  await sharp(sourceImage)
    .resize(256, 256, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .toFile(path.join(dashboardDir, 'public/jixing_icon.png'));
  console.log('Created public/jixing_icon.png');

  console.log('All logos generated successfully!');
}

generateLogos().catch(console.error);
