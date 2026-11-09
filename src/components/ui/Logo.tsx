import { cn } from "../../lib/utils";

interface LogoProps {
  tone?: "light" | "dark";
  className?: string;
  onClick?: () => void;
}

export function Logo({ tone = "light", className, onClick }: LogoProps) {
  return (
    <a
      href="#top"
      onClick={onClick}
      aria-label="РТК — на главную"
      className={cn("inline-flex items-center gap-3", className)}
    >
      <svg
        viewBox="0 0 36 36"
        className="h-9 w-9 shrink-0 text-signal"
        aria-hidden="true"
      >
        <path d="M3 32 14 4h5.5L8.5 32H3Z" fill="currentColor" />
        <path d="M18.5 32 29.5 4H35L24 32h-5.5Z" fill="currentColor" />
      </svg>
      <span className="flex flex-col">
        <span className="flex items-center gap-2">
          <span
            className={cn(
              "text-[25px] font-black leading-none tracking-[-0.075em]",
              tone === "dark" ? "text-white" : "text-ink",
            )}
          >
            РТК
          </span>
          <span className="h-1.5 w-1.5 bg-signal" aria-hidden="true" />
        </span>
        <span
          className={cn(
            "mt-1.5 hidden text-[8px] font-semibold uppercase leading-none tracking-[0.16em] xl:block",
            tone === "dark" ? "text-white/45" : "text-slate-500",
          )}
        >
          Региональная транспортная компания
        </span>
      </span>
    </a>
  );
}
