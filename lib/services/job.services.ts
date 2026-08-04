import { prisma } from "@/lib/prisma";

type CreateJobInput = {
  operation: string;
  originalFileName: string;
  storedFileName: string;
};

export async function createJob(data: CreateJobInput) {
  return await prisma.job.create({
    data: {
      originalFileName: data.originalFileName,
      storedFileName: data.storedFileName,
      operation: data.operation,
      status: "PENDING",
    },
  });
}

export async function updateJob(
  id: string,
  data: {
    status?: string;
    processedFileName?: string;
  }
) {
  return await prisma.job.update({
    where: {
      id,
    },
    data,
  });
}