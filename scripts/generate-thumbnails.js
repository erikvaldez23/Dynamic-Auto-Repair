import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INPUT_DIR = path.join(__dirname, '../public/gallery/compressed');
const OUTPUT_DIR = path.join(__dirname, '../public/gallery/thumbnails');
const TARGET_WIDTH = 600; // Good balance for grid view items

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function processImages() {
  try {
    const files = fs.readdirSync(INPUT_DIR);
    
    // Filter for image files
    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png|webp)$/i.test(file)
    );

    console.log(`Found ${imageFiles.length} images to process...`);

    let count = 0;
    for (const file of imageFiles) {
      const inputPath = path.join(INPUT_DIR, file);
      const outputPath = path.join(OUTPUT_DIR, file);

      // Check if already exists to skip (optional, but good for re-runs)
      if (fs.existsSync(outputPath)) {
        // console.log(`Skipping ${file} (already exists)`);
        // continue; 
        // For now, let's overwrite to ensure we get the right size
      }

      await sharp(inputPath)
        .resize({ width: TARGET_WIDTH })
        .jpeg({ quality: 80, mozjpeg: true }) // Optimize quality/size
        .toFile(outputPath);

      count++;
      process.stdout.write(`\rProcessed ${count}/${imageFiles.length}: ${file}`);
    }

    console.log('\n\n✅ Thumbnail generation complete!');
    console.log(`Saved to: ${OUTPUT_DIR}`);

  } catch (error) {
    console.error('Error processing images:', error);
  }
}

processImages();
