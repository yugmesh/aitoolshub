import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import SubscriberModel from "@/lib/models/Subscriber";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = (body?.email || "").trim().toLowerCase();

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    await dbConnect();

    const existing = await SubscriberModel.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { error: "This email is already subscribed!" },
        { status: 409 }
      );
    }

    await SubscriberModel.create({ email });

    return NextResponse.json(
      { message: "You're subscribed! Welcome to AIToolsHub." },
      { status: 201 }
    );
  } catch (error) {
    console.error("[POST /api/newsletter]", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
