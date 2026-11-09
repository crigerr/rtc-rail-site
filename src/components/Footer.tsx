import { ArrowUpRight, Download, Mail, MapPin, PhoneCall } from "lucide-react";
import { company, navItems } from "../data/company";
import { buttonStyles } from "./ui/Button";
import { Container } from "./ui/Container";
import { Logo } from "./ui/Logo";

const legalDetails = [
  { label: "ИНН", value: company.inn },
  { label: "ОГРН", value: company.ogrn },
  { label: "КПП", value: company.kpp },
  { label: "ОКВЭД", value: company.okved },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="contacts"
      className="relative overflow-hidden border-t border-white/10 bg-ink text-white"
      aria-labelledby="footer-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 blueprint-grid opacity-30"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-signal via-signal/30 to-transparent"
        aria-hidden="true"
      />

      <Container className="relative">
        <h2 id="footer-heading" className="sr-only">
          Контакты и реквизиты ООО «РТК»
        </h2>

        <div className="grid gap-12 border-b border-white/10 py-14 lg:grid-cols-[1.3fr_0.7fr_1fr] lg:gap-16 lg:py-20">
          <div>
            <Logo tone="dark" />
            <p className="mt-6 max-w-[420px] text-sm leading-relaxed text-white/50">
              Долгосрочная аренда фитинговых платформ и специализированных
              цистерн для жидкого пека. Полное техническое содержание по всей
              сети 1520.
            </p>
            <a
              href={company.companyCard}
              download
              className={buttonStyles(
                "light",
                "md",
                "group mt-7 w-full sm:w-auto",
              )}
            >
              <Download
                className="h-4 w-4 transition-transform group-hover:translate-y-0.5"
                aria-hidden="true"
              />
              Скачать карточку компании (PDF)
            </a>
          </div>

          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/35">
              Навигация
            </p>
            <nav className="mt-5 flex flex-col gap-3" aria-label="Навигация в подвале">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  className="group inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
                >
                  {item.label}
                  <ArrowUpRight
                    className="h-3.5 w-3.5 opacity-0 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                </a>
              ))}
              <a
                href="#quote"
                className="group inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
              >
                Экспресс-запрос
                <ArrowUpRight
                  className="h-3.5 w-3.5 opacity-0 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                  aria-hidden="true"
                />
              </a>
            </nav>
          </div>

          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/35">
              Контакты
            </p>
            <a
              href={company.phoneHref}
              className="mt-5 flex items-center gap-3 text-lg font-bold tracking-tight text-white transition-colors hover:text-signal"
            >
              <PhoneCall className="h-4 w-4 shrink-0 text-signal" aria-hidden="true" />
              <span className="tabular-nums">{company.phone}</span>
            </a>
            <a
              href={`mailto:${company.email}`}
              className="mt-3 flex items-center gap-3 text-sm text-white/55 transition-colors hover:text-white"
            >
              <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
              {company.email}
            </a>
            <p className="mt-5 flex items-start gap-3 text-sm leading-relaxed text-white/45">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              Санкт-Петербург, наб. Обводного Канала, д. 93а
            </p>
          </div>
        </div>

        <div className="grid gap-8 border-b border-white/10 py-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/35">
              Юридические реквизиты
            </p>
            <p className="mt-4 text-sm font-semibold text-white">
              {company.shortName}
            </p>
            <p className="mt-1 text-xs text-white/40">{company.descriptor}</p>
          </div>

          <div>
            <dl className="grid grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-4">
              {legalDetails.map((item) => (
                <div key={item.label}>
                  <dt className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/30">
                    {item.label}
                  </dt>
                  <dd className="mt-1.5 text-[13px] font-semibold tabular-nums text-white/80">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-6 border-t border-white/10 pt-5">
              <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/30">
                Адрес
              </p>
              <p className="mt-2 max-w-[760px] text-xs leading-relaxed text-white/50">
                {company.address}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 py-6 text-[10px] leading-relaxed text-white/30 sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYear} {company.shortName}. Все права защищены.</p>
          <p className="font-mono uppercase tracking-[0.16em]">
            ОКВЭД {company.okved} · Сеть 1520
          </p>
        </div>
      </Container>
    </footer>
  );
}
