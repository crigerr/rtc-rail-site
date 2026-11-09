export const company = {
  shortName: "ООО «РТК»",
  descriptor: "Региональная Транспортная Компания",
  inn: "7801458923",
  ogrn: "1157847123456",
  kpp: "780101001",
  okved: "49.41",
  phone: "8-812-555-32-10",
  phoneHref: "tel:+78125553210",
  email: "info@rtk-spb.ru",
  address:
    "190005, г. Санкт-Петербург, вн.тер.г. муниципальный округ Измайловское, наб. реки Фонтанки, д. 120 литер а, помещ. 4-н, офис 12",
  companyCard: `${import.meta.env.BASE_URL}documents/rtk-company-card.pdf`,
} as const;

export const navItems = [
  { label: "О компании", id: "about", href: "#about" },
  { label: "Услуги и парк", id: "fleet", href: "#fleet" },
  { label: "Техсодержание", id: "maintenance", href: "#maintenance" },
  { label: "Контакты", id: "contacts", href: "#contacts" },
] as const;

export type NavItem = (typeof navItems)[number];
