import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Container as ContainerIcon,
  Droplets,
  Info,
} from "lucide-react";
import type { FleetTab, VehicleType } from "../lib/quote";
import { cn } from "../lib/utils";
import { Blueprint } from "./Blueprint";
import { Button } from "./ui/Button";
import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";
import { SectionLabel } from "./ui/SectionLabel";

interface FleetTabConfig {
  id: FleetTab;
  index: string;
  label: string;
  subtitle: string;
  description: string;
  note: string;
  chips: string[];
  specs: Array<{ label: string; value: string }>;
  cta: string;
  vehicle: VehicleType;
  icon: typeof ContainerIcon;
}

const fleetTabs: FleetTabConfig[] = [
  {
    id: "platforms",
    index: "01",
    label: "Фитинговые платформы",
    subtitle: "Для контейнеров 20, 40 и 45 футов",
    description:
      "Платформы с фитинговыми упорами для крупнотоннажных контейнеров High Cube. Рассчитаны на регулярную эксплуатацию в составе контейнерных поездов и стабильную загрузку по всей сети 1520.",
    note: "Оптимальный выбор для регулярных контейнерных поездов и долгосрочных контрактов на перевозку.",
    chips: ["20′", "40′", "45′ HC", "Контейнерные поезда"],
    specs: [
      { label: "Совместимость", value: "20′ / 40′ / 45′ High Cube" },
      { label: "Максимальная грузоподъёмность", value: "до 60 т" },
      { label: "Осевая нагрузка", value: "23,5 тс" },
      { label: "Количество осей", value: "8" },
      { label: "Длина платформы", value: "80 футов" },
      { label: "Скорость в составе", value: "до 120 км/ч" },
    ],
    cta: "Запросить платформы",
    vehicle: "platform",
    icon: ContainerIcon,
  },
  {
    id: "cisterns",
    index: "02",
    label: "Цистерны для жидкого пека",
    subtitle: "Специализированный подвижной состав",
    description:
      "Котлы с теплоизоляцией и паровой рубашкой для перевозки жидкого каменноугольного пека. Обогрев и нижний сливной клапан с паровым сопровождением предотвращают застывание груза при транспортировке и выгрузке.",
    note: "Конструкция рассчитана на вязкие и опасные грузы: поддерживает температуру пека и снижает потери при сливе.",
    chips: ["Теплоизоляция", "Паровая рубашка", "Нижний слив", "Опасные грузы"],
    specs: [
      { label: "Назначение", value: "жидкий каменноугольный пек" },
      { label: "Объём котла", value: "до 54 м³" },
      { label: "Максимальная грузоподъёмность", value: "до 64 т" },
      { label: "Теплоизоляция", value: "кожух + минеральная вата" },
      { label: "Обогрев", value: "паровая рубашка" },
      { label: "Слив", value: "нижний клапан с обогревом" },
    ],
    cta: "Заказать цистерны под пек",
    vehicle: "cistern",
    icon: Droplets,
  },
];

interface FleetCatalogProps {
  activeTab: FleetTab;
  onTabChange: (tab: FleetTab) => void;
  onRequestQuote: (vehicle: VehicleType) => void;
}

export function FleetCatalog({
  activeTab,
  onTabChange,
  onRequestQuote,
}: FleetCatalogProps) {
  const active = fleetTabs.find((tab) => tab.id === activeTab) ?? fleetTabs[0];

  const handleTabKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;

    event.preventDefault();
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const nextIndex = (index + direction + fleetTabs.length) % fleetTabs.length;
    const nextTab = fleetTabs[nextIndex];
    onTabChange(nextTab.id);
    document.getElementById(`fleet-tab-${nextTab.id}`)?.focus();
  };

  return (
    <section
      id="fleet"
      className="relative overflow-hidden bg-white py-20 lg:py-24"
      aria-labelledby="fleet-heading"
    >
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-end lg:gap-16">
          <Reveal>
            <SectionLabel>Услуги и парк</SectionLabel>
            <h2
              id="fleet-heading"
              className="mt-5 max-w-[600px] text-[clamp(2rem,3.5vw,3rem)] font-bold leading-[1.04] tracking-[-0.04em] text-ink"
            >
              Подвижной состав под вашу логистику
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="max-w-[560px] text-base leading-relaxed text-slate-500">
              Выберите тип подвижного состава, чтобы изучить технические
              параметры. Технические специалисты помогут согласовать
              комплектацию и маршрут.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.08}>
          <div
            role="tablist"
            aria-label="Каталог подвижного состава"
            className="mt-10 flex w-full flex-col gap-1 border border-line bg-mist p-1 sm:flex-row lg:w-fit"
          >
            {fleetTabs.map((tab, index) => {
              const Icon = tab.icon;
              const isActive = tab.id === activeTab;

              return (
                <button
                  key={tab.id}
                  id={`fleet-tab-${tab.id}`}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  aria-controls={`fleet-panel-${tab.id}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => onTabChange(tab.id)}
                  onKeyDown={(event) => handleTabKeyDown(event, index)}
                  className="relative flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors duration-200 sm:w-auto sm:min-w-[250px]"
                >
                  {isActive && (
                    <motion.span
                      layoutId="fleet-active-tab"
                      className="absolute inset-0 bg-ink"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 32,
                      }}
                    />
                  )}
                  <span className="relative z-10 flex w-full items-center gap-3">
                    <Icon
                      className={cn(
                        "h-4 w-4 shrink-0 transition-colors duration-200",
                        isActive ? "text-signal" : "text-slate-400",
                      )}
                      aria-hidden="true"
                    />
                    <span
                      className={cn(
                        "text-[13px] font-semibold transition-colors duration-200",
                        isActive ? "text-white" : "text-slate-600",
                      )}
                    >
                      {tab.label}
                    </span>
                    <span
                      className={cn(
                        "ml-auto font-mono text-[9px] tracking-[0.16em] transition-colors duration-200",
                        isActive ? "text-white/35" : "text-slate-400",
                      )}
                    >
                      {tab.index}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="mt-6 border border-line">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active.id}
              id={`fleet-panel-${active.id}`}
              role="tabpanel"
              aria-labelledby={`fleet-tab-${active.id}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="grid lg:grid-cols-[1.03fr_0.97fr]"
            >
              <div className="flex flex-col p-6 sm:p-8 lg:p-10">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-slate-400">
                      Услуга {active.index} / {active.subtitle}
                    </p>
                    <h3 className="mt-3 text-2xl font-bold tracking-[-0.035em] text-ink sm:text-[28px]">
                      {active.label}
                    </h3>
                  </div>
                  <span className="hidden border border-line px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-slate-400 sm:block">
                    РТК / Парк
                  </span>
                </div>

                <p className="mt-4 max-w-[560px] text-sm leading-relaxed text-slate-500">
                  {active.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {active.chips.map((chip) => (
                    <span
                      key={chip}
                      className="border border-line bg-mist px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-slate-500"
                    >
                      {chip}
                    </span>
                  ))}
                </div>

                <dl className="mt-7 border-t border-line">
                  {active.specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="grid grid-cols-[1fr_auto] items-baseline gap-6 border-b border-line py-3.5"
                    >
                      <dt className="text-xs leading-relaxed text-slate-500">
                        {spec.label}
                      </dt>
                      <dd className="text-right text-[13px] font-semibold leading-relaxed text-ink">
                        {spec.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-5 flex items-start gap-3 border-l-2 border-signal bg-mist p-4">
                  <Info
                    className="mt-0.5 h-4 w-4 shrink-0 text-signal"
                    aria-hidden="true"
                  />
                  <p className="text-xs leading-relaxed text-slate-500">
                    {active.note}
                  </p>
                </div>

                <div className="mt-auto flex flex-col gap-4 pt-8 sm:flex-row sm:items-center">
                  <Button
                    onClick={() => onRequestQuote(active.vehicle)}
                    className="group w-full sm:w-auto"
                  >
                    {active.cta}
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </Button>
                  <p className="text-[11px] leading-relaxed text-slate-400">
                    Технические параметры и ставка — в коммерческом предложении.
                  </p>
                </div>
              </div>

              <Blueprint kind={active.id} />
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}
