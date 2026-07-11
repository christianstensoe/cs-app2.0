import Link from "next/link";
import { site, socialLinks } from "@/lib/cv";
import { socialIcons } from "@/components/icons";

export default function HomePage() {
  return (
    <div className="animate-enter pt-8 sm:pt-16">
      <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
        {site.name}
      </h1>

      <p className="mt-4 text-lg text-muted">{site.role}</p>

      <p className="mt-6 max-w-prose leading-relaxed text-muted">
        I&apos;m pursuing my Master&apos;s degree at the Norwegian University of
        Science and Technology, with an exchange year at Tsinghua University in
        Beijing. My experience spans software development, consulting, and
        investment risk.
      </p>

      <div className="mt-10 flex flex-wrap items-center gap-3">
        <Link
          href="/resume"
          className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-85"
        >
          View resume
        </Link>
        <Link
          href="/contact"
          className="rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-muted"
        >
          Contact
        </Link>
      </div>

      <div className="mt-14 flex items-center gap-1">
        {socialLinks.map(({ label, href }) => {
          const Icon = socialIcons[label];
          return (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="rounded-md p-2 text-muted transition-colors hover:text-foreground"
            >
              <Icon className="size-5" />
            </a>
          );
        })}
      </div>
    </div>
  );
}
