import { NextResponse } from 'next/server'

export async function GET(request) {
    return NextResponse.json(request);
}

export async function POST(request) {
    return NextResponse.json(request);
}