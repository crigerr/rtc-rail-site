import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

interface SectionLabelProps {
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}

export function SectionLabel({
  children,
  tone = "light",
  className,
}: SectionLabelProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.24em]",
        tone === "dark" ? "text-white/45" : "text-slate-500",
        className,
      )}
    >
      <span className="h-px w-7 shrink-0 bg-signal" aria-hidden="true" />
      <span>{children}</span>
    </div>
  );
}
