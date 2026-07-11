import type { Metadata } from "next";
import { site, socialLinks } from "@/lib/cv";
import { socialIcons, ArrowUpRightIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name} on LinkedIn, GitHub, or Instagram.`,
};

export default function ContactPage() {
  return (
    <div className="animate-enter pt-8 sm:pt-16">
      <h1 className="text-3xl font-semibold tracking-tight">Contact</h1>

      <p className="mt-4 max-w-prose leading-relaxed text-muted">
        The best way to reach me is on LinkedIn. You can also find my work on
        GitHub or follow me on Instagram.
      </p>

      <ul className="mt-10 space-y-2">
        {socialLinks.map(({ label, handle, href }) => {
          const Icon = socialIcons[label];
          return (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group -mx-3 flex items-center gap-4 rounded-lg px-3 py-3 transition-colors hover:bg-foreground/5"
              >
                <Icon className="size-5 text-muted transition-colors group-hover:text-foreground" />
                <span className="font-medium">{label}</span>
                <span className="text-sm text-muted">{handle}</span>
                <ArrowUpRightIcon className="ml-auto size-4 text-muted opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" />
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
