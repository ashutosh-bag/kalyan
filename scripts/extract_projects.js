const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const sharp = require('sharp');

const PDF_DIR = path.resolve('public/images/ourprojects');

function extractImagesFromPdf(pdfPath, outDir) {
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const buf = fs.readFileSync(pdfPath);
  console.log(`\nProcessing ${path.basename(pdfPath)} (${(buf.length/1024/1024).toFixed(2)} MB)...`);

  let count = 0;
  let pos = 0;

  while (pos < buf.length) {
    let sPos = buf.indexOf(Buffer.from('stream'), pos);
    if (sPos === -1) break;

    let headerStart = Math.max(0, sPos - 600);
    let header = buf.subarray(headerStart, sPos).toString('latin1');

    let isImage = header.includes('/Subtype /Image') || header.includes('/Subtype/Image') || header.includes('DCTDecode');
    
    if (isImage) {
      let startData = sPos + 6;
      if (buf[startData] === 0x0d && buf[startData+1] === 0x0a) startData += 2;
      else if (buf[startData] === 0x0a) startData += 1;

      // Find endstream
      let ePos = buf.indexOf(Buffer.from('endstream'), startData);
      if (ePos !== -1) {
        let rawData = buf.subarray(startData, ePos);
        
        let widthMatch = header.match(/\/Width\s+(\d+)/);
        let heightMatch = header.match(/\/Height\s+(\d+)/);
        let width = widthMatch ? parseInt(widthMatch[1]) : 0;
        let height = heightMatch ? parseInt(heightMatch[1]) : 0;
        
        let isFlateDct = header.includes('FlateDecode') && header.includes('DCTDecode');
        let isDct = header.includes('DCTDecode') && !header.includes('FlateDecode');
        let isFlate = header.includes('FlateDecode') && !header.includes('DCTDecode');

        try {
          if (isFlateDct) {
            let inflated = zlib.inflateSync(rawData);
            if (inflated[0] === 0xff && inflated[1] === 0xd8) {
              const outPath = path.join(outDir, `img_${String(count).padStart(2, '0')}.jpg`);
              fs.writeFileSync(outPath, inflated);
              console.log(`  [DCT+Flate] Saved image ${count} -> ${path.basename(outPath)} (${(inflated.length/1024).toFixed(0)} KB, ${width}x${height})`);
              count++;
            }
          } else if (isDct) {
            // Raw JPEG inside PDF stream
            if (rawData[0] === 0xff && rawData[1] === 0xd8) {
              const outPath = path.join(outDir, `img_${String(count).padStart(2, '0')}.jpg`);
              fs.writeFileSync(outPath, rawData);
              console.log(`  [DCT] Saved image ${count} -> ${path.basename(outPath)} (${(rawData.length/1024).toFixed(0)} KB, ${width}x${height})`);
              count++;
            }
          } else if (isFlate && width > 100 && height > 100) {
            // Raw pixel data inflated with zlib
            let inflated = zlib.inflateSync(rawData);
            let channels = 3;
            if (inflated.length === width * height * 4) channels = 4;
            else if (inflated.length === width * height) channels = 1;

            if (inflated.length >= width * height * channels) {
              const outPath = path.join(outDir, `img_${String(count).padStart(2, '0')}.jpg`);
              sharp(inflated, { raw: { width, height, channels } })
                .jpeg({ quality: 90 })
                .toFile(outPath)
                .then(() => {
                  console.log(`  [Flate-Raw] Saved image ${count} -> ${path.basename(outPath)} (${width}x${height})`);
                })
                .catch(err => {
                  console.log(`  [Flate-Raw error] ${err.message}`);
                });
              count++;
            }
          }
        } catch (err) {
          // ignore stream parse errors
        }
      }
    }

    pos = sPos + 6;
  }

  console.log(`Done ${path.basename(pdfPath)}. Total extracted: ${count}`);
}

async function run() {
  const pdfs = [
    { pdf: 'HOTEL WHITE SAND PURI.pdf', dir: 'public/images/ourprojects/hotel-white-sand/3d' },
    { pdf: 'Hotel White Sand final photos.pdf', dir: 'public/images/ourprojects/hotel-white-sand/interiors' },
    { pdf: 'KDS - Kaushik house .pdf', dir: 'public/images/ourprojects/kaushik-house/3d' },
    { pdf: 'KOUSIK SITE.pdf', dir: 'public/images/ourprojects/kaushik-house/interiors' },
    { pdf: 'Shree vila Bedroom 3D.pdf', dir: 'public/images/ourprojects/shree-villa/3d' },
    { pdf: 'Shree Villa Renovation images .pdf', dir: 'public/images/ourprojects/shree-villa/interiors' }
  ];

  for (const item of pdfs) {
    const fullPdf = path.join(PDF_DIR, item.pdf);
    extractImagesFromPdf(fullPdf, path.resolve(item.dir));
  }
}

run();
