import { NextResponse } from "next/server";
import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";

export const config = { runtime: "experimental-edge" };

//S3 client
const client = new S3Client({
  region: "eu-north-1",
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
});

//S3 bucket
const bucketName = "paul-next-ecommerce";

//uploads images to S3
export async function GET() {
  return NextResponse.json("ok");
}

export async function POST(request) {
  const formData = await request.formData();
  const file = formData.get("file") || null;

  if (!file) {
    return NextResponse.json(
      { error: "File blob is required." },
      { status: 400 }
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  const links = [];

  try {
    const ext = file.type.split("/").pop();
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const filename = `${file.name.replace(
      /\.[^/.]+$/,
      ""
    )}-${uniqueSuffix}.${ext}`;

    await client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: filename,
        Body: buffer,
        ACL: "public-read",
        ContentType: ext,
      })
    );

    const link = `https://${bucketName}.s3.amazonaws.com/${filename}`;
    links.push(link);
  } catch (e) {
    console.error("Error while trying to upload a file\n", e);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }

  return NextResponse.json({ links });
}

//Deletes images from S3
export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get("filename");

  const response = await client.send(
    new DeleteObjectCommand({
      Bucket: bucketName,
      Key: filename,
    })
  );
  return NextResponse.json({ response });
}
