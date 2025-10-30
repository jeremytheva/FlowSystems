import { NextResponse } from 'next/server'; export async function GET(_:Request,{params}:{params:{slug:string}}){return NextResponse.json({ok:true,slug:params.slug,review:null})}
