import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { NextResponse } from "next/server";
import { isAdminRequest } from "../auth/[...nextauth]/route";

export async function GET(){
    await mongooseConnect();
    await isAdminRequest();
    const data = await Order.find().sort({createdAt: -1});
    return NextResponse.json(data);
}