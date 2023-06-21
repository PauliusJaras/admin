import { User } from "@/models/Users";
import { mongooseConnect } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import { isAdminRequest } from "../auth/[...nextauth]/route";

export async function GET(request){
    await mongooseConnect();
    await isAdminRequest();

    const {searchParams} = new URL(request.url);
    const email = searchParams.get("email");

    const userDoc = await User.findOne( {email: email});    

    if(userDoc){
        return NextResponse.json(true);
    } else{
        return NextResponse.json(false);
    }
}