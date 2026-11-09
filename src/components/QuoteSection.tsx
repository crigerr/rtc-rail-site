import { Check, Mail, PhoneCall } from "lucide-react";
import { company } from "../data/company";
import { Container } from "./ui/Container";
import { QuoteForm } from "./QuoteForm";
import { Reveal } from "./ui/Reveal";
import { SectionLabel } from "./ui/SectionLabel";

const benefits = [
  "Подтвердим доступность подвижного состава",
  "Проверим станции и маршрут по сети 1520",
  "Зафиксируем условия в коммерческом предложении",
];

export function QuoteSection() {
  return (
    <section
      id="quote"
      className="relative overflow-hidden border-t border-line bg-mist py-20 lg:py-24"
      aria-labelledby="quote-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 technical-grid opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent_80%)]"
        aria-hidden="true"
      />
      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:items-start lg:gap-20">
          <Reveal>
            <SectionLabel>Экспресс-запрос</SectionLabel>
            <h2
              id="quote-heading"
              className="mt-5 max-w-[520px] text-[clamp(2rem,3.5vw,3rem)] font-bold leading-[1.04] tracking-[-0.04em] text-ink"
            >
              Расчёт ставки
              <span className="block text-signal">за 2 часа</span>
            </h2>
            <p className="mt-5 max-w-[480px] text-base leading-relaxed text-slate-500">
              Укажите тип подвижного состава и маршрут. Подготовим расчёт
              доступности и стоимости аренды без лишней переписки.
            </p>

            <ul className="mt-8 space-y-4">
              {benefits.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-start gap-3 text-sm text-slate-600"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center bg-signal text-white">
                    <Check className="h-3 w-3" aria-hidden="true" />
                  </span>
                  {benefit}
                </li>
              ))}
            </ul>

            <div className="mt-10 border-t border-line pt-7">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                Связаться с коммерческим отделом
              </p>
              <a
                href={company.phoneHref}
                className="mt-3 flex items-center gap-3 text-xl font-bold tracking-tight text-ink transition-colors hover:text-signal"
              >
                <PhoneCall className="h-5 w-5 text-signal" aria-hidden="true" />
                {company.phone}
              </a>
              <a
                href={`mailto:${company.email}`}
                className="mt-2 flex items-center gap-3 text-sm text-slate-500 transition-colors hover:text-signal"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                {company.email}
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1} y={28}>
            <div className="relative border border-line bg-white shadow-[0_30px_80px_-52px_rgba(15,23,42,0.45)]">
              <div className="absolute inset-x-0 top-0 h-[3px] bg-signal" />
              <div className="border-b border-line p-6 pt-7 sm:p-8 sm:pt-9">
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-slate-400">
                  Запрос доступности
                </p>
                <h3 className="mt-2 text-xl font-bold tracking-[-0.025em] text-ink">
                  Сообщите параметры маршрута
                </h3>
                <p className="mt-1.5 text-xs text-slate-500">
                  Поля со звёздочкой обязательны для расчёта.
                </p>
              </div>
              <div className="p-6 sm:p-8">
                <QuoteForm />
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
