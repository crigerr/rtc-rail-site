import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, PhoneCall, X } from "lucide-react";
import { company } from "../data/company";
import { useBodyScrollLock } from "../hooks/useBodyScrollLock";
import type { VehicleType } from "../lib/quote";
import { QuoteForm } from "./QuoteForm";

interface QuoteModalProps {
  open: boolean;
  onClose: () => void;
  initialVehicle: VehicleType;
}

export function QuoteModal({
  open,
  onClose,
  initialVehicle,
}: QuoteModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useBodyScrollLock(open);

  useEffect(() => {
    if (!open) return;

    previousFocusRef.current = document.activeElement as HTMLElement | null;

    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus({ preventScroll: true });
    }, 120);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const panel = panelRef.current;
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
      previousFocusRef.current?.focus();
    };
  }, [open, onClose]);

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <motion.div
            className="absolute inset-0 bg-ink/65 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-hidden="true"
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="quote-modal-title"
            aria-describedby="quote-modal-description"
            className="relative max-h-[calc(100dvh-1.5rem)] w-full max-w-[680px] overflow-y-auto bg-white shadow-[0_40px_120px_-30px_rgba(0,0,0,0.55)] sm:max-h-[calc(100dvh-3rem)]"
            initial={{ opacity: 0, y: 18, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.99 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <div className="absolute inset-x-0 top-0 z-20 h-[3px] bg-signal" />

            <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-line bg-white/95 px-5 py-5 backdrop-blur sm:px-8 sm:py-6">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-slate-400">
                  Коммерческое предложение
                </p>
                <h2
                  id="quote-modal-title"
                  className="mt-2 text-2xl font-bold tracking-[-0.035em] text-ink"
                >
                  Запросить КП
                </h2>
                <p
                  id="quote-modal-description"
                  className="mt-1 text-xs leading-relaxed text-slate-500"
                >
                  Укажите маршрут — подберём платформы или цистерны под задачу.
                </p>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Закрыть форму запроса КП"
                className="flex h-10 w-10 shrink-0 items-center justify-center border border-line text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div className="p-5 sm:p-8">
              <QuoteForm key={initialVehicle} initialVehicle={initialVehicle} />
            </div>

            <div className="flex flex-col gap-3 border-t border-line bg-mist px-5 py-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-8">
              <span>Коммерческий отдел РТК</span>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                <a
                  href={company.phoneHref}
                  className="flex items-center gap-2 font-semibold text-ink transition-colors hover:text-signal"
                >
                  <PhoneCall className="h-3.5 w-3.5 text-signal" aria-hidden="true" />
                  {company.phone}
                </a>
                <a
                  href={`mailto:${company.email}`}
                  className="flex items-center gap-2 transition-colors hover:text-signal"
                >
                  <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                  {company.email}
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
