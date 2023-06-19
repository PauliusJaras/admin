import { NextResponse } from "next/server";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { isAdminRequest } from "../auth/[...nextauth]/route";

export async function POST(request) {
  await mongooseConnect();
  await isAdminRequest();

  const res = await request.json();
  let { title, parentCategory, properties } = res;

  if (!parentCategory) {
    parentCategory = null;
  }

  const categoryDoc = await Category.create({
    title,
    parent: parentCategory,
    properties: properties,
  });

  return NextResponse.json(categoryDoc);
}

export async function GET() {
  await mongooseConnect();
  await isAdminRequest();

  return NextResponse.json(await Category.find().populate("parent"));
}

export async function PUT(request) {
  await mongooseConnect();
  await isAdminRequest();
  const res = await request.json();
  let { title, parentCategory, properties, _id } = res;
  if (!parentCategory) {
    parentCategory = null;
  }

  const categoryDoc = await Category.updateOne(
    { _id },
    {
      title,
      parent: parentCategory,
      properties: properties,
    }
  );

  return NextResponse.json(categoryDoc);
}

export async function DELETE(request) {
    await mongooseConnect();
    await isAdminRequest();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    const categoryDoc = await Category.deleteOne({_id: id});

    return NextResponse.json(categoryDoc);
}
