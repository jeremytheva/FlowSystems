import { NextResponse } from "next/server";
import { platforms } from "../../../data/catalog/platforms";

export function GET() {
  return NextResponse.json(platforms);
}
