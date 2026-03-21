import PlaceholderPage from "@/components/ui/PlaceholderPage";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "Cookie Policy" };
export default function CookiePolicyPage() {
  return (
    <PlaceholderPage
      emoji="🍪"
      title="Cookie Policy"
      subtitle="We use cookies to improve your experience on AIToolsHub."
      sections={[
        { heading: "Essential Cookies", body: "These cookies are required for the website to function correctly. They enable core functionality like navigation and bookmark persistence. You cannot opt out of essential cookies." },
        { heading: "Analytics Cookies", body: "We use anonymous analytics cookies to understand how visitors use our site. This helps us improve content and user experience. You can opt out at any time." },
        { heading: "Managing Cookies", body: "You can control cookies through your browser settings. Disabling cookies may affect some site features like saved bookmarks and preferences." },
      ]}
    />
  );
}
