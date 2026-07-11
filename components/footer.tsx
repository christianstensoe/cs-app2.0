import { socialLinks, site } from "@/lib/cv";
import { socialIcons } from "@/components/icons";

export function Footer() {
  return (
    <footer className="border-t border-border print:hidden">
      <div className="mx-auto flex h-16 max-w-2xl items-center justify-between px-6 text-sm text-muted">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <div className="flex items-center gap-1">
          {socialLinks.map(({ label, href }) => {
            const Icon = socialIcons[label];
            return (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="rounded-md p-2 transition-colors hover:text-foreground"
              >
                <Icon className="size-4" />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
