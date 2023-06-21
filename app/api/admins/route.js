import { mongooseConnect } from "@/lib/mongoose";
import { Admin } from "@/models/Admin";
import { NextResponse } from "next/server";
import { isAdminRequest } from "../auth/[...nextauth]/route";

export async function GET(request){
    await mongooseConnect();

    const {searchParams} = new URL(request.url);
    const email = searchParams.get("email");

    const adminDoc = await Admin.findOne( {email: email});    

    if(adminDoc){
        return NextResponse.json(true);
    } else{
        return NextResponse.json(false);
    }
}

export async function POST(request){
    await mongooseConnect();
    await isAdminRequest();

    const res = await request.json();
    const {email} = res;
    console.log("Emailas:", email);

    const checkDuplicate = await Admin.findOne( {email: email});   

    if(checkDuplicate){
        return NextResponse.json(false);
    } else{
        const adminDoc = await Admin.create({
            email,
        })
        return NextResponse.json(adminDoc);  
    }  
}