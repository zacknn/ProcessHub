import path from "path";
import { writeFile } from "fs/promises";

export async function POST(req: Request) {
  const formData = await req.formData();

  const file = formData.get("image") as File;
  const operation = formData.get("operation");


  if (!file) {
    return Response.json(
        {error : "there is no file uploaded"},
        {status : 400}
    );
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);


  const uploadPath = path.join(
    process.cwd() ,
    "storage",
    "uploads",
    file.name
  );

  await writeFile(uploadPath , buffer);

  return Response.json({
    success : true , 
    filename : file.name,
    operation,
  })

}
