import type { FleetTab } from "../lib/quote";

const drawingMeta: Record<
  FleetTab,
  { code: string; title: string; items: Array<{ label: string; value: string }> }
> = {
  platforms: {
    code: "Схема 01",
    title: "Фитинговая платформа 80′",
    items: [
      { label: "Контейнеры", value: "20 / 40 / 45′ HC" },
      { label: "Нагрузка", value: "до 60 т" },
      { label: "Оси / скорость", value: "8 / 120 км/ч" },
    ],
  },
  cisterns: {
    code: "Схема 02",
    title: "Цистерна для жидкого пека",
    items: [
      { label: "Объём котла", value: "до 54 м³" },
      { label: "Обогрев", value: "паровая рубашка" },
      { label: "Слив", value: "нижний клапан" },
    ],
  },
};

function PlatformDrawing() {
  return (
    <svg
      viewBox="0 0 640 320"
      className="h-auto w-full"
      fill="none"
      role="img"
      aria-label="Схема фитинговой платформы длиной 80 футов с контейнерами 20, 40 и 45 футов"
    >
      <defs>
        <pattern
          id="platform-ribs"
          width="12"
          height="10"
          patternUnits="userSpaceOnUse"
        >
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="10"
            stroke="#ffffff"
            strokeOpacity="0.08"
          />
        </pattern>
      </defs>

      <text x="50" y="30" fill="#64748b" fontSize="9" letterSpacing="2">
        ВИД СБОКУ / ПРОЕКЦИЯ
      </text>
      <text
        x="590"
        y="30"
        fill="#94a3b8"
        fontSize="9"
        letterSpacing="1.5"
        textAnchor="end"
      >
        80 FT
      </text>

      <line
        x1="50"
        y1="48"
        x2="590"
        y2="48"
        stroke="#475569"
        strokeWidth="1"
      />
      <line x1="50" y1="43" x2="50" y2="53" stroke="#475569" />
      <line x1="590" y1="43" x2="590" y2="53" stroke="#475569" />
      <text
        x="320"
        y="41"
        fill="#94a3b8"
        fontSize="9"
        letterSpacing="1.8"
        textAnchor="middle"
      >
        ДЛИНА 80′ / 24,4 М
      </text>

      <rect
        x="64"
        y="98"
        width="100"
        height="77"
        fill="url(#platform-ribs)"
        stroke="#94a3b8"
        strokeOpacity="0.65"
      />
      <rect
        x="184"
        y="98"
        width="200"
        height="77"
        fill="url(#platform-ribs)"
        stroke="#94a3b8"
        strokeOpacity="0.65"
      />
      <rect
        x="404"
        y="88"
        width="170"
        height="87"
        fill="url(#platform-ribs)"
        stroke="#cbd5e1"
        strokeOpacity="0.8"
      />

      <text
        x="114"
        y="141"
        fill="#ffffff"
        fontSize="10"
        fontWeight="600"
        textAnchor="middle"
        letterSpacing="1.5"
      >
        20′
      </text>
      <text
        x="284"
        y="141"
        fill="#ffffff"
        fontSize="10"
        fontWeight="600"
        textAnchor="middle"
        letterSpacing="1.5"
      >
        40′
      </text>
      <text
        x="489"
        y="136"
        fill="#ffffff"
        fontSize="10"
        fontWeight="600"
        textAnchor="middle"
        letterSpacing="1.5"
      >
        45′ HC
      </text>
      <text
        x="114"
        y="158"
        fill="#64748b"
        fontSize="7"
        textAnchor="middle"
        letterSpacing="1.2"
      >
        CONTAINER
      </text>
      <text
        x="284"
        y="158"
        fill="#64748b"
        fontSize="7"
        textAnchor="middle"
        letterSpacing="1.2"
      >
        CONTAINER
      </text>
      <text
        x="489"
        y="153"
        fill="#64748b"
        fontSize="7"
        textAnchor="middle"
        letterSpacing="1.2"
      >
        HIGH CUBE
      </text>

      {[64, 160, 184, 380, 404, 570].map((x) => (
        <rect
          key={x}
          x={x}
          y="168"
          width="4"
          height="7"
          fill="#dc2626"
        />
      ))}

      <rect
        x="50"
        y="175"
        width="540"
        height="14"
        fill="#ffffff"
        fillOpacity="0.05"
        stroke="#cbd5e1"
        strokeOpacity="0.8"
      />
      <line
        x1="50"
        y1="189"
        x2="590"
        y2="189"
        stroke="#64748b"
        strokeDasharray="3 4"
      />

      {[
        [92, 130],
        [246, 284],
        [356, 394],
        [506, 544],
      ].map(([x1, x2]) => (
        <g key={x1}>
          <line
            x1={x1}
            y1="205"
            x2={x2}
            y2="205"
            stroke="#64748b"
            strokeWidth="2"
          />
          <line x1={(x1 + x2) / 2} y1="189" x2={(x1 + x2) / 2} y2="205" stroke="#475569" />
          <circle
            cx={x1}
            cy="224"
            r="15"
            stroke="#94a3b8"
            strokeWidth="1.5"
          />
          <circle cx={x1} cy="224" r="4" fill="#475569" />
          <circle
            cx={x2}
            cy="224"
            r="15"
            stroke="#94a3b8"
            strokeWidth="1.5"
          />
          <circle cx={x2} cy="224" r="4" fill="#475569" />
        </g>
      ))}

      <line x1="30" y1="240" x2="610" y2="240" stroke="#475569" />
      {Array.from({ length: 24 }, (_, index) => {
        const x = 40 + index * 25;
        return (
          <line
            key={x}
            x1={x}
            y1="240"
            x2={x - 7}
            y2="248"
            stroke="#334155"
            strokeWidth="2"
          />
        );
      })}

      <path d="M604 230 L618 240 L604 250" stroke="#dc2626" strokeWidth="2" />
      <text
        x="50"
        y="282"
        fill="#94a3b8"
        fontSize="8"
        letterSpacing="1.4"
      >
        ОСЕВАЯ НАГРУЗКА 23,5 ТС
      </text>
      <text
        x="590"
        y="282"
        fill="#64748b"
        fontSize="8"
        letterSpacing="1.4"
        textAnchor="end"
      >
        В СОСТАВЕ КОНТЕЙНЕРНОГО ПОЕЗДА
      </text>
      <text
        x="50"
        y="300"
        fill="#64748b"
        fontSize="7"
        letterSpacing="1.1"
      >
        СХЕМАТИЧНО · НЕ ДЛЯ ПРОИЗВОДСТВА
      </text>
    </svg>
  );
}

function CisternDrawing() {
  return (
    <svg
      viewBox="0 0 640 320"
      className="h-auto w-full"
      fill="none"
      role="img"
      aria-label="Схема специализированной цистерны для жидкого пека с паровой рубашкой и нижним сливом"
    >
      <defs>
        <pattern
          id="tank-heat"
          width="10"
          height="10"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M0 10 C2.5 4, 7.5 4, 10 10"
            stroke="#dc2626"
            strokeOpacity="0.55"
          />
        </pattern>
      </defs>

      <text x="50" y="30" fill="#64748b" fontSize="9" letterSpacing="2">
        ВИД СБОКУ / ПРОЕКЦИЯ
      </text>
      <text
        x="590"
        y="30"
        fill="#94a3b8"
        fontSize="9"
        letterSpacing="1.5"
        textAnchor="end"
      >
        ПЕК · 1520
      </text>

      <line x1="50" y1="48" x2="590" y2="48" stroke="#475569" />
      <line x1="50" y1="43" x2="50" y2="53" stroke="#475569" />
      <line x1="590" y1="43" x2="590" y2="53" stroke="#475569" />
      <text
        x="320"
        y="41"
        fill="#94a3b8"
        fontSize="9"
        letterSpacing="1.8"
        textAnchor="middle"
      >
        ТЕПЛОИЗОЛИРОВАННЫЙ КОТЁЛ
      </text>

      <line
        x1="130"
        y1="72"
        x2="510"
        y2="72"
        stroke="#64748b"
        strokeDasharray="4 5"
      />
      <rect x="330" y="66" width="18" height="12" stroke="#cbd5e1" />
      <circle cx="505" cy="72" r="7" stroke="#94a3b8" />
      <line x1="498" y1="72" x2="512" y2="72" stroke="#dc2626" />

      <rect
        x="110"
        y="90"
        width="430"
        height="118"
        rx="59"
        fill="#ffffff"
        fillOpacity="0.03"
        stroke="#cbd5e1"
        strokeOpacity="0.8"
        strokeWidth="1.5"
      />
      <rect
        x="120"
        y="100"
        width="410"
        height="98"
        rx="49"
        stroke="#64748b"
        strokeDasharray="3 5"
      />
      <rect
        x="110"
        y="160"
        width="430"
        height="48"
        rx="24"
        fill="url(#tank-heat)"
        fillOpacity="0.65"
      />

      <rect x="302" y="78" width="46" height="12" stroke="#cbd5e1" />
      <line x1="312" y1="78" x2="312" y2="66" stroke="#94a3b8" />
      <line x1="338" y1="78" x2="338" y2="66" stroke="#94a3b8" />
      <line x1="305" y1="66" x2="345" y2="66" stroke="#cbd5e1" />

      <path
        d="M170 185 L175 175 L180 190 L185 175 L190 190 L195 175 L200 190 L205 175 L210 190 L215 175 L220 185"
        stroke="#f87171"
        strokeOpacity="0.65"
      />
      <path
        d="M430 185 L435 175 L440 190 L445 175 L450 190 L455 175 L460 190 L465 175 L470 190 L475 175 L480 185"
        stroke="#f87171"
        strokeOpacity="0.65"
      />

      <rect x="112" y="117" width="6" height="66" rx="3" fill="#dc2626" />
      <text
        x="78"
        y="145"
        fill="#94a3b8"
        fontSize="7"
        letterSpacing="1.2"
        transform="rotate(-90 78 145)"
      >
        ПАРОВАЯ РУБАШКА
      </text>
      <line x1="100" y1="144" x2="112" y2="144" stroke="#dc2626" />

      <line x1="325" y1="208" x2="325" y2="232" stroke="#cbd5e1" />
      <rect x="315" y="230" width="20" height="10" fill="#dc2626" />
      <line x1="335" y1="235" x2="370" y2="235" stroke="#dc2626" />
      <path d="M370 229 L382 235 L370 241" stroke="#dc2626" />
      <line
        x1="338"
        y1="243"
        x2="440"
        y2="284"
        stroke="#64748b"
        strokeDasharray="3 4"
      />
      <text
        x="448"
        y="288"
        fill="#fca5a5"
        fontSize="8"
        letterSpacing="1.4"
      >
        НИЖНИЙ СЛИВ С ОБОГРЕВОМ
      </text>

      <line x1="90" y1="236" x2="570" y2="236" stroke="#cbd5e1" strokeOpacity="0.75" />

      {[
        [162, 198],
        [438, 474],
      ].map(([x1, x2]) => (
        <g key={x1}>
          <line
            x1={x1}
            y1="234"
            x2={x2}
            y2="234"
            stroke="#64748b"
            strokeWidth="2"
          />
          <line x1={(x1 + x2) / 2} y1="208" x2={(x1 + x2) / 2} y2="234" stroke="#475569" />
          <circle
            cx={x1}
            cy="252"
            r="14"
            stroke="#94a3b8"
            strokeWidth="1.5"
          />
          <circle cx={x1} cy="252" r="4" fill="#475569" />
          <circle
            cx={x2}
            cy="252"
            r="14"
            stroke="#94a3b8"
            strokeWidth="1.5"
          />
          <circle cx={x2} cy="252" r="4" fill="#475569" />
        </g>
      ))}

      <line x1="30" y1="266" x2="610" y2="266" stroke="#475569" />
      {Array.from({ length: 24 }, (_, index) => {
        const x = 40 + index * 25;
        return (
          <line
            key={x}
            x1={x}
            y1="266"
            x2={x - 7}
            y2="274"
            stroke="#334155"
            strokeWidth="2"
          />
        );
      })}

      <text
        x="50"
        y="300"
        fill="#94a3b8"
        fontSize="8"
        letterSpacing="1.4"
      >
        ОБЪЁМ ДО 54 М³ · НАГРУЗКА ДО 64 Т
      </text>
      <text
        x="590"
        y="300"
        fill="#64748b"
        fontSize="7"
        letterSpacing="1.1"
        textAnchor="end"
      >
        СХЕМАТИЧНО · НЕ ДЛЯ ПРОИЗВОДСТВА
      </text>
    </svg>
  );
}

interface BlueprintProps {
  kind: FleetTab;
}

export function Blueprint({ kind }: BlueprintProps) {
  const meta = drawingMeta[kind];

  return (
    <div className="relative flex h-full min-h-[440px] flex-col overflow-hidden bg-ink p-5 text-white sm:p-7">
      <div
        className="pointer-events-none absolute inset-0 blueprint-grid"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-ink via-ink/60 to-transparent"
        aria-hidden="true"
      />

      <div className="relative flex items-center justify-between">
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/40">
          {meta.code}
        </span>
        <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-white/40">
          <span className="h-1.5 w-1.5 bg-signal" aria-hidden="true" />
          Технический чертёж
        </span>
      </div>

      <div className="relative flex flex-1 items-center py-6">
        {kind === "platforms" ? <PlatformDrawing /> : <CisternDrawing />}
      </div>

      <div className="relative border-t border-white/10 pt-4">
        <p className="text-sm font-semibold tracking-tight text-white">
          {meta.title}
        </p>
        <div className="mt-4 grid grid-cols-3 gap-3">
          {meta.items.map((item) => (
            <div key={item.label}>
              <p className="font-mono text-[8px] uppercase leading-tight tracking-[0.12em] text-white/35">
                {item.label}
              </p>
              <p className="mt-1.5 text-[11px] font-medium leading-tight text-white/80">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
