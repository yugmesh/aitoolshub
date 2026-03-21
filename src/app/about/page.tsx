import PlaceholderPage from "@/components/ui/PlaceholderPage";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "About Us" };
export default function AboutPage() {
  return (
    <PlaceholderPage
      emoji="🚀"
      title="About AIToolsHub"
      subtitle="We're a team of AI enthusiasts, developers, and researchers on a mission to cut through the noise and help everyone find the right AI tool — without the guesswork."
      sections={[
        { heading: "Our Mission", body: "AI tools are multiplying faster than anyone can track. We test, review, and rank them so you don't have to. Every rating on AIToolsHub is earned — never paid for." },
        { heading: "Our Team", body: "We're a distributed team of engineers, designers, and researchers who use AI tools professionally every day. We built AIToolsHub because we needed it ourselves." },
        { heading: "Review Methodology", body: "Each tool is tested for at least two weeks before publishing. We assess usability, output quality, pricing fairness, and real-world utility across multiple use cases." },
      ]}
    />
  );
}
