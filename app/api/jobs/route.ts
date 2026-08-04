import { NextResponse } from "next/server";
import path from "path";
import { writeFile, mkdir } from "fs/promises";
import { randomUUID } from "crypto";

import { createJob, updateJob } from "@/lib/services/job.services";
import { processImage } from "@/lib/services/image.services";

export const runtime = "nodejs";

const allowedOperations = ["grayscale", "resize", "compress"] as const;

type AllowedOperation = (typeof allowedOperations)[number];

function isAllowedOperation(value: string): value is AllowedOperation {
  return allowedOperations.includes(value as AllowedOperation);
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("image") as File | null;
    const operation = formData.get("operation") as string | null;

    if (!file) {
      return NextResponse.json(
        { error: "There is no file uploaded" },
        { status: 400 }
      );
    }

    if (!operation) {
      return NextResponse.json(
        { error: "Operation is required" },
        { status: 400 }
      );
    }

    if (!isAllowedOperation(operation)) {
      return NextResponse.json(
        { error: "Invalid operation" },
        { status: 400 }
      );
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Only image files are allowed" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), "storage", "uploads");
    const processedDir = path.join(process.cwd(), "storage", "processed");

    await mkdir(uploadDir, { recursive: true });
    await mkdir(processedDir, { recursive: true });

    const extension = path.extname(file.name).toLowerCase() || ".png";

    const storedFileName = `${randomUUID()}${extension}`;

    const uploadPath = path.join(uploadDir, storedFileName);

    await writeFile(uploadPath, buffer);

    let job = await createJob({
      operation,
      originalFileName: file.name,
      storedFileName,
    });

    try {
      job = await updateJob(job.id, {
        status: "PROCESSING",
      });

      const processedFileName = await processImage({
        inputPath: uploadPath,
        outputDir: processedDir,
        outputFileName: `processed-${storedFileName}`,
        operation,
      });

      job = await updateJob(job.id, {
        status: "COMPLETED",
        processedFileName,
      });

      return NextResponse.json({
        success: true,
        job,
      });
    } catch (processingError) {
      console.error("Image processing error:", processingError);

      await updateJob(job.id, {
        status: "FAILED",
      }).catch(console.error);

      return NextResponse.json(
        { error: "Image processing failed" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Upload error:", error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}