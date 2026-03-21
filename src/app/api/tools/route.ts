import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import ToolModel from "@/lib/models/Tool";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);

    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const pricing = searchParams.get("pricing") || "";
    const sort = searchParams.get("sort") || "rating";
    const featured = searchParams.get("featured") === "true";

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: any = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ];
    }
    if (category) query.category = category;
    if (pricing) query.pricing = pricing;
    if (featured) query.isFeatured = true;

    const sortMap: Record<string, object> = {
      rating: { rating: -1 },
      reviews: { reviews: -1 },
      name: { name: 1 },
      newest: { createdAt: -1 },
    };

    const tools = await ToolModel.find(query)
      .sort((sortMap[sort] ?? { rating: -1 }) as any)
      .lean();

    return NextResponse.json({ tools });
  } catch (error) {
    console.error("[GET /api/tools]", error);
    return NextResponse.json({ error: "Failed to fetch tools" }, { status: 500 });
  }
}
