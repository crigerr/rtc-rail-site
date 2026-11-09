export const company = {
  shortName: "ООО «РТК»",
  descriptor: "Региональная Транспортная Компания",
  inn: "7840103251",
  ogrn: "1227800155824",
  kpp: "784201001",
  okved: "77.39.12",
  phone: "8-812-416-63-61",
  phoneHref: "tel:+78124166361",
  email: "info@rtc-rails.ru",
  address:
    "191119, г. Санкт-Петербург, вн.тер.г. муниципальный округ Семёновский, наб. Обводного Канала, д. 93а литера а, помещ. 5-н, офис 3/4",
  companyCard: "/documents/rtk-company-card.pdf",
} as const;

export const navItems = [
  { label: "О компании", id: "about", href: "#about" },
  { label: "Услуги и парк", id: "fleet", href: "#fleet" },
  { label: "Техсодержание", id: "maintenance", href: "#maintenance" },
  { label: "Контакты", id: "contacts", href: "#contacts" },
] as const;

export type NavItem = (typeof navItems)[number];
