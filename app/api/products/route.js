import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request) {
  await mongooseConnect();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    return NextResponse.json(await Product.findOne({ _id: id }));
  } else {
    return NextResponse.json(await Product.find());
  }
}

export async function POST(request) {
  await mongooseConnect();

  const res = await request.json();
  const { title, description, price, images, category } = res;

  const productDoc = await Product.create({
    title,
    description,
    price,
    images: [...images],
    category,
  });
  return NextResponse.json(productDoc);
}

export async function PUT(request) {
  await mongooseConnect();

  const res = await request.json();
  const { title, description, price, images, category, _id } = res;

  console.log(images);

  const productDoc = await Product.updateOne(
    { _id: _id },
    {
      title,
      description,
      price,
      images: [...images],
      category,
    }
  );
  return NextResponse.json(productDoc);
}

export async function DELETE(request) {
  await mongooseConnect();

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const products = await Product.findOne({ _id: id });
  const { images } = products;

  if (images.length > 0) {
    images.map(async (i) => {
      const filename = i.split("/").pop();

      try {
        await axios.delete(
          "http://localhost:3000/api/upload?filename=" + filename
        );
      } catch (error) {
        console.log("Error");
      }
    });
  }
  const productDoc = await Product.deleteOne({ _id: id });
  return NextResponse.json(productDoc);
}
