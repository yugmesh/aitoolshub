import PlaceholderPage from "@/components/ui/PlaceholderPage";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "Community" };
export default function CommunityPage() {
  return (
    <PlaceholderPage
      emoji="👥"
      title="AIToolsHub Community"
      subtitle="Join 50,000+ AI enthusiasts sharing discoveries, tips, and comparisons."
      sections={[
        { heading: "Discord Server", body: "Our Discord has channels for every AI category — coding, writing, image gen, video, research, and more. Share what you're building and get recommendations from real users." },
        { heading: "Weekly Roundup", body: "Every Friday we publish a community-curated list of the best new tools, model updates, and pricing changes. Subscribe to the newsletter to get it in your inbox." },
        { heading: "Submit a Tool", body: "Found an AI tool we haven't listed? Submit it via the contact form and our team will review and add it within 48 hours if it meets our quality bar." },
      ]}
    />
  );
}
