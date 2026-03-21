import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import ToolModel from "@/lib/models/Tool";

export async function GET(
  _req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await dbConnect();
    const tool = await ToolModel.findOne({ slug: params.slug }).lean();

    if (!tool) {
      return NextResponse.json({ error: "Tool not found" }, { status: 404 });
    }

    // Fetch related tools (same category, exclude current)
    const related = await ToolModel.find({
      category: tool.category,
      slug: { $ne: params.slug },
    })
      .sort({ rating: -1 })
      .limit(3)
      .lean();

    return NextResponse.json({ tool, related });
  } catch (error) {
    console.error("[GET /api/tools/[slug]]", error);
    return NextResponse.json({ error: "Failed to fetch tool" }, { status: 500 });
  }
}
