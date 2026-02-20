import sharp from "sharp";
import fs from "fs/promises";
import path from "path";

const SOURCE_DIR = "./images";
const OUTPUT_DIR = "./public/images";
const TARGET_FORMATS = ["avif"];
const QUALITY = 50;
const SOURCE_EXTENSIONS = [".jpg", ".jpeg", ".png"];

/**
 * Recursively gets all files in a directory.
 */
async function* getFiles(dir) {
  const dirents = await fs.readdir(dir, { withFileTypes: true });
  for (const dirent of dirents) {
    const res = path.resolve(dir, dirent.name);
    if (dirent.isDirectory()) {
      yield* getFiles(res);
    } else {
      yield res;
    }
  }
}

async function optimizeImages() {
  console.log(`🚀 Starting image optimization`);
  console.log(`📂 Source: ${SOURCE_DIR}`);
  console.log(`📁 Output: ${OUTPUT_DIR}`);
  console.log(`🎯 Targets: ${TARGET_FORMATS.join(", ")} (Quality: ${QUALITY})`);

  let count = 0;
  let errors = 0;

  try {
    for await (const filePath of getFiles(SOURCE_DIR)) {
      const ext = path.extname(filePath).toLowerCase();

      if (!SOURCE_EXTENSIONS.includes(ext)) continue;

      const relativePath = path.relative(SOURCE_DIR, filePath);
      const pipeline = sharp(filePath);
      const fileName = path.basename(filePath, ext);
      const relativeDir = path.dirname(relativePath);
      const targetDir = path.join(OUTPUT_DIR, relativeDir);

      // Ensure target directory exists
      await fs.mkdir(targetDir, { recursive: true });

      const conversions = TARGET_FORMATS.map(async (format) => {
        const outputPath = path.join(targetDir, `${fileName}.${format}`);

        try {
          await pipeline
            .clone()
            [format]({ quality: QUALITY })
            .toFile(outputPath);
          console.log(
            `  ✓ ${format.toUpperCase()}: ${path.relative(OUTPUT_DIR, outputPath)}`,
          );
          count++;
        } catch (err) {
          console.error(
            `  ✗ Failed ${format}: ${relativePath} -> ${err.message}`,
          );
          errors++;
        }
      });

      // Also copy/convert the original if it's not one of the target formats
      // or if you want to keep the original file in the output dir as well.
      // For now, let's just do the target formats as requested.

      await Promise.all(conversions);
    }

    console.log(`✨ Optimization completed!`);
    console.log(`📊 Total images generated: ${count}`);
    if (errors > 0) console.log(`⚠️ Errors encountered: ${errors}`);
  } catch (error) {
    console.error("💥 Critical error during optimization:", error);
  }
}

optimizeImages();
