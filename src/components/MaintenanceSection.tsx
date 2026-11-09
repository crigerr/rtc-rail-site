import {
  ArrowRight,
  ClipboardList,
  ScanSearch,
  ShieldCheck,
  TrainFront,
  Wrench,
} from "lucide-react";
import { buttonStyles } from "./ui/Button";
import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";
import { SectionLabel } from "./ui/SectionLabel";

const steps = [
  {
    number: "01",
    title: "Заявка",
    description:
      "Фиксируем маршрут, тип груза и требования к подвижному составу.",
    icon: ClipboardList,
  },
  {
    number: "02",
    title: "Дефектовка",
    description:
      "Проводим осмотр и фиксируем объём работ до выхода состава на линию.",
    icon: ScanSearch,
  },
  {
    number: "03",
    title: "Ремонт в депо РЖД",
    description:
      "Устраняем неисправности в сертифицированных депо-партнёрах РЖД.",
    icon: Wrench,
  },
  {
    number: "04",
    title: "Выпуск на линию",
    description:
      "Передаём исправный состав под погрузку — без простоя клиента.",
    icon: TrainFront,
  },
];

export function MaintenanceSection() {
  return (
    <section
      id="maintenance"
      className="relative overflow-hidden bg-ink py-20 text-white lg:py-24"
      aria-labelledby="maintenance-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 blueprint-grid opacity-50"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-signal via-signal/20 to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-32 top-1/3 h-[420px] w-[420px] rounded-full bg-signal/[0.06] blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.72fr] lg:items-end lg:gap-20">
          <Reveal>
            <SectionLabel tone="dark">Техсодержание</SectionLabel>
            <h2
              id="maintenance-heading"
              className="mt-5 max-w-[720px] text-[clamp(2rem,3.6vw,3.15rem)] font-bold leading-[1.04] tracking-[-0.04em] text-white"
            >
              Берём техническое состояние парка на себя
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="border-l-2 border-signal pl-5 text-sm leading-relaxed text-white/55 sm:text-base">
              Мы берём все технические и ремонтные риски на себя. Плановое ТО,
              дефектовка и ремонт — в одном контуре ответственности, чтобы
              исключить простои клиента.
            </p>
          </Reveal>
        </div>

        <div className="relative mt-14">
          <div
            className="absolute bottom-8 left-[23px] top-6 w-px bg-gradient-to-b from-signal via-white/20 to-transparent sm:hidden"
            aria-hidden="true"
          />
          <div
            className="absolute left-0 right-0 top-[23px] hidden h-px bg-gradient-to-r from-signal via-white/25 to-white/20 lg:block"
            aria-hidden="true"
          />

          <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <li key={step.number} className="relative pl-16 sm:pl-0">
                  <Reveal delay={index * 0.08}>
                    <div className="relative">
                      <div className="relative z-10 mb-7 flex items-center gap-4">
                        <span className="absolute left-[-64px] top-0 flex h-12 w-12 items-center justify-center border border-white/15 bg-ink text-signal sm:static">
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <span className="relative z-10 bg-ink px-2 font-mono text-[10px] tracking-[0.2em] text-white/35">
                          {step.number}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold tracking-tight text-white">
                        {step.title}
                      </h3>
                      <p className="mt-2 max-w-[260px] text-sm leading-relaxed text-white/50">
                        {step.description}
                      </p>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>

        <Reveal delay={0.12}>
          <div className="mt-16 flex flex-col gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-white/15 text-signal">
                <ShieldCheck className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-base font-semibold tracking-tight text-white">
                  Технические риски — на нашей стороне
                </p>
                <p className="mt-1 max-w-[620px] text-sm leading-relaxed text-white/45">
                  ТО-2, деповской ремонт, страхование подвижного состава и
                  устранение неисправностей — в рамках одного договора аренды.
                </p>
              </div>
            </div>
            <a
              href="#quote"
              className={buttonStyles(
                "light",
                "md",
                "group w-full shrink-0 sm:w-auto",
              )}
            >
              Обсудить условия
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
