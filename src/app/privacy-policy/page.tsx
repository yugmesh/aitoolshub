import PlaceholderPage from "@/components/ui/PlaceholderPage";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "Privacy Policy" };
export default function PrivacyPage() {
  return (
    <PlaceholderPage emoji="🔒" title="Privacy Policy" subtitle="Last updated: January 2025. We take your privacy seriously."
      sections={[
        { heading: "Data We Collect", body: "We collect email addresses when you subscribe to our newsletter, and anonymous usage analytics to improve the site. We do not sell your data to any third parties." },
        { heading: "Cookies", body: "We use essential cookies for site functionality and optional analytics cookies. You can opt out of analytics cookies at any time." },
        { heading: "Contact", body: "For privacy-related questions, email privacy@aitoolshub.com. We respond within 48 hours." },
      ]}
    />
  );
}
