import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/utils";

export type ButtonVariant = "primary" | "outline" | "dark" | "light" | "white";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[2px] border text-[13px] font-semibold leading-none transition-colors duration-200 disabled:pointer-events-none disabled:opacity-60";

const variants: Record<ButtonVariant, string> = {
  primary:
    "border-signal bg-signal text-white hover:border-signal-dark hover:bg-signal-dark",
  outline:
    "border-ink/15 bg-transparent text-ink hover:border-ink hover:bg-ink hover:text-white",
  dark: "border-ink bg-ink text-white hover:border-ink-2 hover:bg-ink-2",
  light:
    "border-white/20 bg-transparent text-white hover:border-white/50 hover:bg-white/10",
  white:
    "border-white bg-white text-ink hover:border-mist hover:bg-mist",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-10 px-4",
  md: "h-12 px-5 sm:px-6",
  lg: "h-14 px-6 sm:px-7",
};

export function buttonStyles(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className?: string,
) {
  return cn(base, variants[variant], sizes[size], className);
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  type = "button",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonStyles(variant, size, className)}
      {...props}
    >
      {children}
    </button>
  );
}
