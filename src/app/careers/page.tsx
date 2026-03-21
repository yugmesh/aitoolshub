import PlaceholderPage from "@/components/ui/PlaceholderPage";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "Careers" };
export default function CareersPage() {
  return (
    <PlaceholderPage
      emoji="💼"
      title="Careers at AIToolsHub"
      subtitle="We're a small, remote-first team passionate about making AI tools accessible to everyone."
      sections={[
        { heading: "Open Roles", body: "We're currently hiring a Senior Full-Stack Engineer (Next.js + MongoDB), a Content Writer specialising in AI tools, and a Community Manager. All roles are fully remote." },
        { heading: "Our Culture", body: "We believe in async-first communication, deep work, and shipping fast. Everyone on the team uses AI tools daily — you'll be both building for and learning from our users." },
        { heading: "How to Apply", body: "Send your CV and a short note about why you're interested to jobs@aitoolshub.com. We review every application personally and respond within 5 business days." },
      ]}
    />
  );
}
