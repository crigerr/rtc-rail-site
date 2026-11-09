import {
  ArrowRight,
  FileCheck2,
  ShieldCheck,
  TrainFront,
  Wrench,
} from "lucide-react";
import type { FleetTab } from "../lib/quote";
import { Button } from "./ui/Button";
import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";
import { SectionLabel } from "./ui/SectionLabel";

interface HeroProps {
  onSelectFleet: (tab: FleetTab) => void;
}

const heroMetrics = [
  { value: "20/40/45′", label: "Контейнеры High Cube" },
  { value: "До 60 т", label: "Грузоподъёмность" },
  { value: "До 7 лет", label: "Возраст парка" },
  { value: "ТО-2+", label: "Плановое содержание" },
];

const trustNotes = [
  { icon: FileCheck2, label: "Официальный договор" },
  { icon: ShieldCheck, label: "Страхование подвижного состава" },
  { icon: Wrench, label: "Техсодержание под ключ" },
];

export function Hero({ onSelectFleet }: HeroProps) {
  return (
    <section
      className="relative overflow-hidden bg-white"
      aria-labelledby="hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 technical-grid opacity-70 [mask-image:linear-gradient(to_bottom,black,transparent_75%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-40 top-0 h-[520px] w-[520px] rounded-full bg-signal/[0.04] blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative py-14 sm:py-20 lg:py-24">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.85fr)] lg:gap-16 xl:gap-24">
          <div>
            <Reveal>
              <SectionLabel className="tracking-[0.18em] sm:tracking-[0.24em]">
                Аренда подвижного состава · Сеть 1520
              </SectionLabel>
            </Reveal>

            <Reveal delay={0.06}>
              <h1
                id="hero-heading"
                className="mt-7 max-w-[760px] text-[clamp(1.75rem,7.8vw,3.05rem)] font-bold leading-[1.01] tracking-[-0.045em] text-ink lg:text-[clamp(2.25rem,3.5vw,3rem)]"
              >
                <span className="block">Аренда фитинговых</span>
                <span className="block">платформ</span>
                <span className="block">и специализированных</span>
                <span className="block">цистерн</span>
                <span className="mt-2 block text-signal">
                  с полным техсодержанием
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-7 max-w-[590px] text-base leading-relaxed text-slate-500 sm:text-lg">
                Долгосрочный лизинг грузового подвижного состава для
                бесперебойной логистики промышленных предприятий по всей сети
                1520.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button
                  size="lg"
                  className="group w-full sm:w-auto"
                  onClick={() => onSelectFleet("platforms")}
                >
                  Подобрать платформы
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="group w-full sm:w-auto"
                  onClick={() => onSelectFleet("cisterns")}
                >
                  Заказать цистерны под пек
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-9 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6">
                {trustNotes.map(({ icon: Icon, label }) => (
                  <span
                    key={label}
                    className="flex items-center gap-2 text-xs font-medium text-slate-500"
                  >
                    <Icon className="h-4 w-4 text-signal" aria-hidden="true" />
                    {label}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.16} y={28}>
            <div className="relative lg:mt-6">
              <div
                className="absolute -left-3 top-10 hidden h-24 w-[3px] bg-signal lg:block"
                aria-hidden="true"
              />

              <div className="relative border border-line bg-white shadow-[0_30px_80px_-48px_rgba(15,23,42,0.5)]">
                <div className="flex items-center justify-between border-b border-line px-5 py-4">
                  <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                    </span>
                    Парк РТК · параметры
                  </div>
                  <span className="font-mono text-[10px] tracking-[0.18em] text-slate-400">
                    01 / 04
                  </span>
                </div>

                <div className="technical-grid p-5 sm:p-6">
                  <div className="grid grid-cols-2 gap-px border border-line bg-line">
                    {heroMetrics.map((metric) => (
                      <div key={metric.label} className="bg-white p-4 sm:p-5">
                        <p className="text-[23px] font-bold leading-none tracking-[-0.04em] text-ink tabular-nums">
                          {metric.value}
                        </p>
                        <p className="mt-2 text-[9px] font-semibold uppercase leading-snug tracking-[0.13em] text-slate-400">
                          {metric.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6">
                    <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.18em] text-slate-400">
                      <span>Санкт-Петербург</span>
                      <span>Сеть 1520</span>
                    </div>
                    <svg
                      viewBox="0 0 520 32"
                      className="mt-2 h-8 w-full"
                      fill="none"
                      aria-hidden="true"
                    >
                      <line
                        x1="0"
                        y1="14"
                        x2="520"
                        y2="14"
                        stroke="#cbd5e1"
                        strokeWidth="1.5"
                      />
                      <line
                        x1="0"
                        y1="21"
                        x2="520"
                        y2="21"
                        stroke="#cbd5e1"
                        strokeWidth="1.5"
                      />
                      {[40, 110, 180, 250, 320, 390, 460].map((x) => (
                        <line
                          key={x}
                          x1={x}
                          y1="10"
                          x2={x - 6}
                          y2="25"
                          stroke="#e2e8f0"
                          strokeWidth="2"
                        />
                      ))}
                      <circle cx="8" cy="14" r="3.5" fill="#0f172a" />
                      <circle cx="512" cy="14" r="3.5" fill="#dc2626" />
                      <circle cx="512" cy="14" r="8" stroke="#dc2626" />
                    </svg>
                  </div>
                </div>

                <div className="flex items-center gap-3 border-t border-line bg-mist px-5 py-4">
                  <ShieldCheck
                    className="h-5 w-5 shrink-0 text-signal"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-sm font-semibold text-ink">
                      Полное техсодержание
                    </p>
                    <p className="mt-0.5 text-xs text-slate-500">
                      ТО-2 · деповской ремонт · страхование
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-5 -right-2 hidden items-center gap-3 border border-line bg-ink px-4 py-3 text-white shadow-xl xl:flex">
                <TrainFront
                  className="h-4 w-4 text-signal"
                  aria-hidden="true"
                />
                <div>
                  <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/40">
                    Специализация
                  </p>
                  <p className="mt-0.5 text-xs font-semibold">
                    Жидкий пек · 1520
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
