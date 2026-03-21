import PlaceholderPage from "@/components/ui/PlaceholderPage";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "Terms of Service" };
export default function TermsPage() {
  return (
    <PlaceholderPage emoji="📋" title="Terms of Service" subtitle="By using AIToolsHub, you agree to these terms."
      sections={[
        { heading: "Use of Service", body: "AIToolsHub provides AI tool reviews and comparisons for informational purposes. You may not scrape, reproduce, or redistribute our content without permission." },
        { heading: "Accuracy", body: "We strive for accuracy but cannot guarantee that all information is current. AI tools change rapidly — always verify pricing and features on the official tool website." },
        { heading: "Liability", body: "AIToolsHub is not liable for decisions made based on our reviews. Use your own judgment when choosing AI tools for professional or commercial purposes." },
      ]}
    />
  );
}
