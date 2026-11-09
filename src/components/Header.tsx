import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, PhoneCall, X } from "lucide-react";
import { company, navItems } from "../data/company";
import { useActiveSection } from "../hooks/useActiveSection";
import { useBodyScrollLock } from "../hooks/useBodyScrollLock";
import { cn } from "../lib/utils";
import { Button } from "./ui/Button";
import { Container } from "./ui/Container";
import { Logo } from "./ui/Logo";

const sectionIds = navItems.map((item) => item.id);

interface HeaderProps {
  onRequestQuote: () => void;
}

export function Header({ onRequestQuote }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const activeId = useActiveSection(sectionIds);
  const menuPanelRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);

  useBodyScrollLock(menuOpen);

  useEffect(() => {
    if (!menuOpen) return;

    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus({ preventScroll: true });
    }, 280);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        return;
      }

      if (event.key !== "Tab") return;

      const panel = menuPanelRef.current;
      if (!panel) return;

      const focusable = Array.from(
        panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => element.offsetParent !== null);

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", handleKeyDown);
      menuTriggerRef.current?.focus({ preventScroll: true });
    };
  }, [menuOpen]);

  const handleQuote = () => {
    setMenuOpen(false);
    onRequestQuote();
  };

  return (
    <>
    <header
      id="top"
      className="sticky top-0 z-40 border-b border-line/80 bg-white/90 backdrop-blur-xl"
    >
      <Container className="grid h-20 grid-cols-[1fr_auto] items-center gap-6 lg:grid-cols-[1fr_auto_1fr]">
        <Logo />

        <nav
          className="hidden items-center gap-7 lg:flex"
          aria-label="Основная навигация"
        >
          {navItems.map((item) => {
            const isActive = activeId === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "relative py-2 text-[13px] font-medium transition-colors duration-200",
                  isActive
                    ? "text-ink"
                    : "text-slate-500 hover:text-ink",
                )}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="header-active-link"
                    className="absolute inset-x-0 -bottom-1 h-[2px] bg-signal"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        <div className="hidden items-center justify-end gap-6 lg:flex">
          <a
            href={company.phoneHref}
            className="hidden items-center gap-2 text-[13px] font-semibold text-ink transition-colors hover:text-signal xl:inline-flex"
          >
            <PhoneCall className="h-4 w-4 text-signal" aria-hidden="true" />
            <span className="tabular-nums tracking-tight">{company.phone}</span>
          </a>
          <Button
            onClick={onRequestQuote}
            className="group"
            aria-label="Запросить коммерческое предложение"
          >
            Запросить КП
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Button>
        </div>

        <button
          ref={menuTriggerRef}
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label="Открыть меню"
          className="flex h-11 w-11 items-center justify-center border border-line text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white lg:hidden"
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
        </button>
      </Container>
    </header>

      {createPortal(
        <AnimatePresence>
        {menuOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Закрыть меню"
              className="fixed inset-0 z-[60] cursor-default bg-ink/55 backdrop-blur-[2px] lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.aside
              ref={menuPanelRef}
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Мобильное меню"
              className="fixed inset-y-0 right-0 z-[70] flex w-[min(92vw,400px)] flex-col overflow-y-auto bg-white shadow-2xl lg:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 340, damping: 34 }}
            >
              <div className="flex items-center justify-between border-b border-line px-5 py-5">
                <Logo onClick={() => setMenuOpen(false)} />
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Закрыть меню"
                  className="flex h-11 w-11 items-center justify-center border border-line text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              <nav
                className="flex flex-col px-5 pt-4"
                aria-label="Мобильная навигация"
              >
                {navItems.map((item, index) => (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="group flex items-center gap-4 border-b border-line py-5"
                  >
                    <span className="font-mono text-[10px] tracking-[0.16em] text-slate-400">
                      0{index + 1}
                    </span>
                    <span className="text-xl font-semibold tracking-tight text-ink transition-colors group-hover:text-signal">
                      {item.label}
                    </span>
                    <ArrowUpRight
                      className="ml-auto h-4 w-4 text-slate-300 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal"
                      aria-hidden="true"
                    />
                  </a>
                ))}
              </nav>

              <div className="px-5 pt-8">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                  Связаться напрямую
                </p>
                <a
                  href={company.phoneHref}
                  className="mt-4 flex items-center gap-3 text-lg font-bold tracking-tight text-ink"
                >
                  <PhoneCall className="h-5 w-5 text-signal" aria-hidden="true" />
                  {company.phone}
                </a>
                <a
                  href={`mailto:${company.email}`}
                  className="mt-3 block text-sm text-slate-500 transition-colors hover:text-signal"
                >
                  {company.email}
                </a>
              </div>

              <div className="mt-auto space-y-5 px-5 pb-8 pt-10">
                <Button
                  onClick={handleQuote}
                  size="lg"
                  className="group w-full"
                >
                  Запросить коммерческое предложение
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Button>
                <p className="text-center font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">
                  Сеть 1520 · ОКВЭД {company.okved}
                </p>
              </div>
            </motion.aside>
          </>
        )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
}
