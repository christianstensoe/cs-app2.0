"use client";

import { useEffect, useState } from "react";

type Section = { id: string; title: string };

export function SectionNav({ sections }: { sections: Section[] }) {
  const [activeId, setActiveId] = useState(sections[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      // A narrow band near the top of the viewport decides the active section.
      { rootMargin: "-20% 0px -70% 0px" }
    );

    for (const { id } of sections) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav
      aria-label="Resume sections"
      className="sticky top-14 z-30 -mx-6 border-b border-border bg-background px-6 print:hidden"
    >
      <ul className="flex h-11 items-center gap-5 text-sm">
        {sections.map(({ id, title }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              aria-current={activeId === id ? "location" : undefined}
              className={`transition-colors ${
                activeId === id
                  ? "font-medium text-accent"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
