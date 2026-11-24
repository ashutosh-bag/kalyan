const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function optimizeImage(src, dest, maxWidth = 1920) {
  const meta = await sharp(src).metadata();
  let pipeline = sharp(src);
  if (meta.width > maxWidth) {
    pipeline = pipeline.resize({ width: maxWidth, withoutEnlargement: true });
  }
  await pipeline
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile(dest);
}

async function prepare() {
  const rootDir = path.resolve('public/images/ourprojects');

  // 1. Hotel White Sand
  console.log('Preparing Hotel White Sand...');
  const hwsDir = path.join(rootDir, 'hotel-white-sand');
  const hwsDist = path.join(hwsDir, 'optimized');
  fs.mkdirSync(hwsDist, { recursive: true });

  // 3D Hero
  await optimizeImage(path.join(hwsDir, '3d/img_00.jpg'), path.join(hwsDist, '3d-hero.jpg'));
  await optimizeImage(path.join(hwsDir, '3d/img_01.jpg'), path.join(hwsDist, '3d-day.jpg'));
  await optimizeImage(path.join(hwsDir, '3d/img_02.jpg'), path.join(hwsDist, '3d-facade.jpg'));

  // Interiors
  const hwsInts = fs.readdirSync(path.join(hwsDir, 'interiors')).filter(f => f.endsWith('.jpg'));
  for (let i = 0; i < Math.min(8, hwsInts.length); i++) {
    const src = path.join(hwsDir, 'interiors', hwsInts[i]);
    await optimizeImage(src, path.join(hwsDist, `interior-${i+1}.jpg`));
  }
  console.log('Hotel White Sand ready!');

  // 2. Kaushik Residence
  console.log('Preparing Kaushik Residence...');
  const kshDir = path.join(rootDir, 'kaushik-house');
  const kshDist = path.join(kshDir, 'optimized');
  fs.mkdirSync(kshDist, { recursive: true });

  // 3D Hero
  await optimizeImage(path.join(kshDir, '3d/img_00.jpg'), path.join(kshDist, '3d-hero.jpg'));
  
  // Additional 3D / elevation if exists
  const ksh3ds = fs.readdirSync(path.join(kshDir, '3d')).filter(f => f.endsWith('.jpg'));
  for (let i = 1; i < Math.min(4, ksh3ds.length); i++) {
    await optimizeImage(path.join(kshDir, '3d', ksh3ds[i]), path.join(kshDist, `3d-detail-${i}.jpg`));
  }

  // Interiors
  const kshInts = fs.readdirSync(path.join(kshDir, 'interiors')).filter(f => f.endsWith('.jpg'));
  for (let i = 0; i < Math.min(8, kshInts.length); i++) {
    const src = path.join(kshDir, 'interiors', kshInts[i]);
    await optimizeImage(src, path.join(kshDist, `interior-${i+1}.jpg`));
  }
  console.log('Kaushik Residence ready!');

  // 3. Shree Villa
  console.log('Preparing Shree Villa...');
  const shvDir = path.join(rootDir, 'shree-villa');
  const shvDist = path.join(shvDir, 'optimized');
  fs.mkdirSync(shvDist, { recursive: true });

  // 3D Hero
  await optimizeImage(path.join(shvDir, '3d/img_00.jpg'), path.join(shvDist, '3d-hero.jpg'));
  if (fs.existsSync(path.join(shvDir, '3d/img_01.jpg'))) {
    await optimizeImage(path.join(shvDir, '3d/img_01.jpg'), path.join(shvDist, '3d-view-2.jpg'));
  }
  if (fs.existsSync(path.join(shvDir, '3d/img_02.jpg'))) {
    await optimizeImage(path.join(shvDir, '3d/img_02.jpg'), path.join(shvDist, '3d-view-3.jpg'));
  }

  // Interiors
  const shvInts = fs.readdirSync(path.join(shvDir, 'interiors')).filter(f => f.endsWith('.jpg'));
  for (let i = 0; i < Math.min(8, shvInts.length); i++) {
    const src = path.join(shvDir, 'interiors', shvInts[i]);
    await optimizeImage(src, path.join(shvDist, `interior-${i+1}.jpg`));
  }
  console.log('Shree Villa ready!');
}

prepare().catch(console.error);
