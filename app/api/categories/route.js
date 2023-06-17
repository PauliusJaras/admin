import { NextResponse } from "next/server";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";

export async function POST(request) {
  await mongooseConnect();

  const res = await request.json();
  let { title, parentCategory } = res;

  if(!parentCategory){
    parentCategory = undefined;
  }

  const categoryDoc = await Category.create({
    title,
    parent: parentCategory,
  });

  return NextResponse.json(categoryDoc);
}

export async function GET() {
  await mongooseConnect();

  return NextResponse.json(await Category.find().populate('parent'));
}
