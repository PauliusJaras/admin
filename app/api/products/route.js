import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  await mongooseConnect();

  if (id) {
    return NextResponse.json(await Product.findOne({ _id: id }));
  } else {
    return NextResponse.json(await Product.find());
  }
}

export async function POST(request) {
  await mongooseConnect();

  const res = await request.json();
  const { title, description, price, images } = res;

  const productDoc = await Product.create({
    title,
    description,
    price,
    images: [...images],
  });
  return NextResponse.json(productDoc);
}

export async function PUT(request) {
  await mongooseConnect();

  const res = await request.json();
  const { title, description, price, images, _id } = res;

  console.log(images);

  const productDoc = await Product.updateOne({_id: _id}, {
    title,
    description,
    price,
    images: [...images],
  });
  return NextResponse.json(productDoc);
}

export async function DELETE(request){
  await mongooseConnect();

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  const productDoc = await Product.deleteOne({_id: id});
  return NextResponse.json(productDoc);
}
