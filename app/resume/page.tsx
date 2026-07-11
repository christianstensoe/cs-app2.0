import type { Metadata } from "next";
import { cvSections, site, socialLinks } from "@/lib/cv";
import { PrintButton } from "@/components/print-button";
import { SectionNav } from "@/components/section-nav";

export const metadata: Metadata = {
  title: "Resume",
  description: `Education, experience, and volunteering of ${site.name}.`,
};

export default function ResumePage() {
  return (
    <div className="animate-enter">
      {/* Identity header for the printed/PDF version only */}
      <div className="hidden print:block">
        <h1 className="text-2xl font-semibold">{site.name}</h1>
        <p className="mt-1 text-sm text-muted">
          {site.role} ·{" "}
          {socialLinks
            .filter(({ label }) => label !== "Instagram")
            .map(({ href }) => href.replace(/^https:\/\/(www\.)?/, ""))
            .join(" · ")}
        </p>
      </div>

      <div className="flex flex-wrap items-start justify-between gap-4 print:hidden">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Resume</h1>
          <p className="mt-2 text-muted">
            Experience, education, and volunteering.
          </p>
        </div>
        <PrintButton />
      </div>

      <div className="mt-8 print:mt-0">
        <SectionNav
          sections={cvSections.map(({ id, title }) => ({ id, title }))}
        />

        {cvSections.map(({ id, title, entries }) => (
          <section
            key={id}
            id={id}
            aria-labelledby={`${id}-heading`}
            className="mt-14 scroll-mt-28 print:mt-8"
          >
            <h2
              id={`${id}-heading`}
              className="text-xs font-semibold uppercase tracking-[0.2em] text-muted"
            >
              {title}
            </h2>

            <div className="mt-6 space-y-8 print:mt-4 print:space-y-5">
              {entries.map((entry) => (
                <article key={`${entry.title}-${entry.org}`}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <h3 className="font-medium">{entry.title}</h3>
                    <p className="whitespace-nowrap text-sm tabular-nums text-muted">
                      {entry.period}
                    </p>
                  </div>
                  <p className="mt-0.5 text-sm text-muted">
                    {entry.org}
                    {entry.location ? ` · ${entry.location}` : ""}
                  </p>
                  {entry.description && (
                    <p className="mt-2 max-w-prose text-sm leading-relaxed text-foreground/80">
                      {entry.description}
                    </p>
                  )}
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
