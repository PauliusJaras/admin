import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET() {
    await mongooseConnect();
    return NextResponse.json(await Product.find())
}

export async function POST(request) {
  await mongooseConnect();

  const res = await request.json();
  const { title, description, price } = res;

  const productDoc = await Product.create({
    title,
    description,
    price,
  });
  return NextResponse.json(productDoc);
}