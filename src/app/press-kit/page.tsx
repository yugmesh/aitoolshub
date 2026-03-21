import PlaceholderPage from "@/components/ui/PlaceholderPage";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "Press Kit" };
export default function PressKitPage() {
  return (
    <PlaceholderPage
      emoji="📰"
      title="Press Kit"
      subtitle="Resources for journalists and media professionals covering AIToolsHub."
      sections={[
        { heading: "About AIToolsHub", body: "AIToolsHub is the leading independent AI tools directory, with 2,400+ tools reviewed across 10 categories. We serve 180,000+ monthly users across 120 countries." },
        { heading: "Brand Assets", body: "Download our logo pack, brand guidelines, and product screenshots at press.aitoolshub.com (coming soon). For urgent requests, email press@aitoolshub.com." },
        { heading: "Media Inquiries", body: "For interview requests, quotes, or exclusive data, contact our communications team at press@aitoolshub.com. We typically respond within 4 business hours." },
      ]}
    />
  );
}
