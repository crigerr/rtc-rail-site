import { useEffect, useState } from "react";
import {
  ArrowRight,
  Check,
  Copy,
  FileCheck2,
  Gauge,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { company } from "../data/company";
import { cn } from "../lib/utils";
import { Button } from "./ui/Button";
import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";
import { SectionLabel } from "./ui/SectionLabel";

const credentials = [
  {
    index: "01",
    metric: "ОКВЭД 77.39.12",
    lead: "Легальная аренда",
    description:
      "Официальная деятельность по аренде железнодорожного транспорта. Вид деятельности подтверждён в ЕГРЮЛ.",
    icon: FileCheck2,
  },
  {
    index: "02",
    metric: "До 7 лет",
    lead: "Возраст парка",
    description:
      "Средний возраст нашего подвижного состава. Плановое ТО и деповские ремонты — строго по регламенту.",
    icon: Gauge,
  },
  {
    index: "03",
    metric: "ТО-2 и деповской ремонт",
    lead: "Полное содержание",
    description:
      "Все вагоны застрахованы от коммерческого брака. Технические риски и устранение неисправностей берём на себя.",
    icon: Wrench,
  },
  {
    index: "04",
    metric: "Проверка по ИНН",
    lead: "Открытые данные",
    description:
      "Реквизиты опубликованы для службы безопасности контрагентов. Проверка компании доступна онлайн.",
    icon: ShieldCheck,
  },
];

const requisites = [
  { label: "ИНН", value: company.inn },
  { label: "ОГРН", value: company.ogrn },
  { label: "КПП", value: company.kpp },
];

export function TrustSection() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2200);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const copyRequisites = async () => {
    const text = `${company.shortName} · ИНН ${company.inn} · КПП ${company.kpp} · ОГРН ${company.ogrn}`;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section
      id="about"
      className="border-y border-line bg-mist py-20 lg:py-24"
      aria-labelledby="about-heading"
    >
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end lg:gap-16">
          <Reveal>
            <SectionLabel>О компании</SectionLabel>
            <h2
              id="about-heading"
              className="mt-5 max-w-[590px] text-[clamp(2rem,3.5vw,3rem)] font-bold leading-[1.04] tracking-[-0.04em] text-ink"
            >
              Надёжность, которую можно проверить
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="max-w-[560px] text-base leading-relaxed text-slate-500">
              РТК — оператор специализированного подвижного состава.
              Работаем официально, поддерживаем парк в исправном состоянии
              и публикуем данные, необходимые для проверки контрагента.
            </p>
            <a
              href="#contacts"
              className="group mt-5 inline-flex items-center gap-2 text-[13px] font-semibold text-ink transition-colors hover:text-signal"
            >
              Реквизиты и контакты
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </a>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 xl:grid-cols-4">
          {credentials.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal
                key={item.metric}
                delay={index * 0.06}
                className="group relative bg-white p-6 transition-colors duration-300 hover:bg-white sm:p-7"
              >
                <div className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-signal transition-transform duration-300 group-hover:scale-x-100" />
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] tracking-[0.18em] text-slate-400">
                    {item.index}
                  </span>
                  <Icon
                    className="h-5 w-5 text-slate-300 transition-colors duration-300 group-hover:text-signal"
                    aria-hidden="true"
                  />
                </div>
                <p className="mt-8 min-h-[3.2rem] text-[21px] font-bold leading-[1.1] tracking-[-0.035em] text-ink">
                  {item.metric}
                </p>
                <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-signal">
                  {item.lead}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-500">
                  {item.description}
                </p>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-6 flex flex-col gap-6 border border-line bg-white p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-line text-signal">
                <ShieldCheck className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-semibold text-ink">
                  Реквизиты для службы безопасности
                </p>
                <p className="mt-0.5 text-xs text-slate-500">
                  Сверьте данные перед заключением договора
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              {requisites.map((item) => (
                <div key={item.label}>
                  <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-slate-400">
                    {item.label}
                  </p>
                  <p className="mt-1 text-sm font-semibold tabular-nums text-ink">
                    {item.value}
                  </p>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={copyRequisites}
                className={cn("min-w-[148px]", copied && "border-signal")}
                aria-live="polite"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-signal" aria-hidden="true" />
                ) : (
                  <Copy className="h-4 w-4" aria-hidden="true" />
                )}
                {copied ? "Скопировано" : "Копировать"}
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
