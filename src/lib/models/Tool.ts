import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITool extends Document {
  name: string;
  slug: string;
  category: string;
  emoji: string;
  accent: string;
  description: string;
  longDescription: string;
  rating: number;
  reviews: number;
  pricing: "Free" | "Freemium" | "Paid";
  badge: string | null;
  url: string;
  features: string[];
  pros: string[];
  cons: string[];
  isFeatured: boolean;
  createdAt: Date;
}

const ToolSchema = new Schema<ITool>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    category: { type: String, required: true, index: true },
    emoji: { type: String, default: "🤖" },
    accent: { type: String, default: "#6366f1" },
    description: { type: String, required: true },
    longDescription: { type: String, default: "" },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviews: { type: Number, default: 0 },
    pricing: { type: String, enum: ["Free", "Freemium", "Paid"], default: "Free" },
    badge: { type: String, default: null },
    url: { type: String, required: true },
    features: [{ type: String }],
    pros: [{ type: String }],
    cons: [{ type: String }],
    isFeatured: { type: Boolean, default: false, index: true },
  },
  { timestamps: true }
);

const ToolModel: Model<ITool> =
  mongoose.models.Tool || mongoose.model<ITool>("Tool", ToolSchema);

export default ToolModel;
