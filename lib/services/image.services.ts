import sharp from "sharp";
import path from "path";
import { mkdir } from "fs/promises";

export type ImageOperation = "grayscale" | "resize" | "compress";

type ProcessImageInput = {
  inputPath: string;
  outputDir: string;
  outputFileName: string;
  operation: ImageOperation;
};

export async function processImage({
  inputPath,
  outputDir,
  outputFileName,
  operation,
}: ProcessImageInput) {
  await mkdir(outputDir, { recursive: true });

  const outputPath = path.join(outputDir, outputFileName);

  const image = sharp(inputPath).rotate();

  switch (operation) {
    case "grayscale": {
      await image.grayscale().toFile(outputPath);
      break;
    }

    case "resize": {
      await image
        .resize({
          width: 800,
          withoutEnlargement: true,
        })
        .toFile(outputPath);
      break;
    }

    case "compress": {
      const extension = path.extname(inputPath).toLowerCase();

      if (extension === ".jpg" || extension === ".jpeg") {
        await image
          .jpeg({
            quality: 70,
            mozjpeg: true,
          })
          .toFile(outputPath);
      } else if (extension === ".png") {
        await image
          .png({
            quality: 80,
            compressionLevel: 9,
          })
          .toFile(outputPath);
      } else if (extension === ".webp") {
        await image
          .webp({
            quality: 70,
          })
          .toFile(outputPath);
      } else {
        await image.toFile(outputPath);
      }

      break;
    }

    default: {
      throw new Error("Unsupported image operation");
    }
  }

  return outputFileName;
}