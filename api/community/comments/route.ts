import { NextResponse } from 'next/server'; export async function GET(){return NextResponse.json({ok:true,comments:[]})} export async function POST(){return NextResponse.json({ok:true,created:true})}
