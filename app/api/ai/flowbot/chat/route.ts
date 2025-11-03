import { NextResponse } from "next/server";

import FlowBotCore from "@modules/FlowBotCore";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));

  FlowBotCore.init();
  await FlowBotCore.loadData();
  const result = await FlowBotCore.runAction("chat", body);

  return NextResponse.json({
    ok: true,
    module: FlowBotCore.slug,
    result,
  });
}
