"use client";

import { PrinterIcon } from "@/components/icons";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm font-medium text-foreground transition-colors hover:border-muted print:hidden"
    >
      <PrinterIcon className="size-4" />
      Save as PDF
    </button>
  );
}
