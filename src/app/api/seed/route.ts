import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import ToolModel from "@/lib/models/Tool";
import { SEED_TOOLS } from "@/data/seed";

export async function GET() {
  try {
    await dbConnect();
    await ToolModel.deleteMany({});
    await ToolModel.insertMany(SEED_TOOLS);
    return NextResponse.json({
      message: `Seeded ${SEED_TOOLS.length} tools successfully.`,
      tools: SEED_TOOLS.map((t) => t.name),
    });
  } catch (error) {
    console.error("[GET /api/seed]", error);
    return NextResponse.json({ error: "Seed failed" }, { status: 500 });
  }
}
