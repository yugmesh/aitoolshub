import Link from "next/link";
import { Zap, Twitter, Github, Linkedin } from "lucide-react";

const FOOTER_LINKS: Record<string, { label: string; href: string }[]> = {
  Product: [
    { label: "Browse Tools",  href: "/tools" },
    { label: "Compare",       href: "/compare" },
    { label: "New Releases",  href: "/new-releases" },
    { label: "Top Rated",     href: "/top-rated" },
    { label: "Categories",    href: "/tools" },
  ],
  Company: [
    { label: "About",     href: "/about" },
    { label: "Blog",      href: "/blog" },
    { label: "Careers",   href: "/careers" },
    { label: "Press Kit", href: "/press-kit" },
    { label: "Contact",   href: "/contact" },
  ],
  Resources: [
    { label: "API Docs",   href: "/api-docs" },
    { label: "Newsletter", href: "/#newsletter" },
    { label: "Community",  href: "/community" },
    { label: "Changelog",  href: "/changelog" },
    { label: "Status",     href: "/status" },
  ],
  Legal: [
    { label: "Privacy Policy",    href: "/privacy-policy" },
    { label: "Terms of Service",  href: "/terms-of-service" },
    { label: "Cookie Policy",     href: "/cookie-policy" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#06060b] py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10 mb-14">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                <Zap className="w-4 h-4 text-white fill-white" />
              </div>
              <span className="font-bold text-[17px] text-white">AIToolsHub</span>
            </Link>
            <p className="text-xs text-zinc-500 leading-relaxed max-w-xs mb-6">
              The world&apos;s most comprehensive AI tools directory. Expert reviews, honest ratings, and side-by-side comparisons.
            </p>
            <div className="flex items-center gap-3">
              {[
                { Icon: Twitter, href: "https://twitter.com" },
                { Icon: Github,  href: "https://github.com" },
                { Icon: Linkedin,href: "https://linkedin.com" },
              ].map(({ Icon, href }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-zinc-500 hover:text-white hover:border-white/[0.15] transition-all"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-600 mb-4">{section}</h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.06] pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-zinc-600">
            © {new Date().getFullYear()} AIToolsHub Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-1 flex-wrap justify-center">
            {[
              { label: "Privacy",  href: "/privacy-policy" },
              { label: "Terms",    href: "/terms-of-service" },
              { label: "Cookies",  href: "/cookie-policy" },
            ].map(({ label, href }) => (
              <Link key={label} href={href} className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors px-3 py-1">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
