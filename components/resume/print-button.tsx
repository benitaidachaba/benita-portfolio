"use client";

import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <button
      className="text-link resume-print-button"
      type="button"
      onClick={() => window.print()}
    >
      <Printer size={18} aria-hidden="true" />
      Print HTML resume
    </button>
  );
}
