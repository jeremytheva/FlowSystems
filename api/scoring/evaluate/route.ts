import { NextResponse } from 'next/server'; export async function POST(req:Request){const body=await req.json().catch(()=>({}));return NextResponse.json({ok:true,total:0,input:body})}
