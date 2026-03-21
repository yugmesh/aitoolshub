import PlaceholderPage from "@/components/ui/PlaceholderPage";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "API Documentation" };
export default function ApiDocsPage() {
  return (
    <PlaceholderPage
      emoji="📡"
      title="API Documentation"
      subtitle="Programmatic access to the AIToolsHub database. Coming soon."
      sections={[
        {
          heading: "GET /api/tools",
          body: "Returns a list of AI tools. Supports query parameters: search (string), category (string), pricing (Free|Freemium|Paid), sort (rating|reviews|name|newest), featured (true|false).",
        },
        {
          heading: "GET /api/tools/:slug",
          body: "Returns full details for a single tool by slug, including related tools from the same category.",
        },
        {
          heading: "POST /api/newsletter",
          body: 'Subscribe an email to the newsletter. Body: { "email": "user@example.com" }. Returns 201 on success, 409 if already subscribed.',
        },
        {
          heading: "Rate Limits & Auth",
          body: "Public endpoints are currently open. API key authentication and rate limiting will be enforced in the v2 API. Contact us to get early access.",
        },
      ]}
    />
  );
}
