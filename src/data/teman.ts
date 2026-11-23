// Real client facts only (veon/client.json). Nothing here points to the client's current website.
export const PHONE_MAIN = { label: "+38 (066) 977-99-47", tel: "+380669779947" };
export const PHONES = [
  PHONE_MAIN,
  { label: "+38 (098) 977-99-47", tel: "+380989779947" },
  { label: "+38 (073) 977-99-47", tel: "+380739779947" },
  { label: "+38 (097) 055-17-37", tel: "+380970551737" },
];
export const EMAIL = "info@teman.com.ua";

export const WA_BASE = "https://wa.me/380669779947";
export const waLink = (text: string) => `${WA_BASE}?text=${encodeURIComponent(text)}`;
export const WA_DEFAULT_TEXT = "Вітаю! Шукаю запчастину.";

export const MESSENGERS = {
  viber: { label: "Viber", href: "viber://chat?number=%2B380669779947" },
  telegram: { label: "Telegram", href: "https://t.me/teman_ua" },
  whatsapp: { label: "WhatsApp", href: waLink(WA_DEFAULT_TEXT) },
} as const;

export const MAP_ROUTE = "https://www.google.com/maps/dir/?api=1&destination=49.945796%2C36.264288";

export const SOCIAL = [
  { name: "Facebook", icon: "facebook", href: "https://www.facebook.com/teman.com.ua" },
  { name: "Instagram", icon: "instagram", href: "https://www.instagram.com/teman_ua" },
  { name: "YouTube", icon: "youtube", href: "https://www.youtube.com/channel/UC1VUZkhUdjrYF6Bd7uNDrJw" },
  { name: "TikTok", icon: "tiktok", href: "https://www.tiktok.com/@teman.com.ua" },
  { name: "Telegram-канал", icon: "telegram", href: "https://t.me/teman_com_ua" },
] as const;

export const NAV = [
  { href: "#poshuk", label: "Пошук" },
  { href: "#kataloh", label: "Каталог" },
  { href: "#brendy", label: "Бренди" },
  { href: "#dostavka", label: "Доставка й оплата" },
  { href: "#biznesu", label: "Для бізнесу" },
  { href: "#kontakty", label: "Контакти" },
];

export const FUTURE_NOTE = "Розділ у розробці";

// Car makes listed on the client's current homepage.
export const MAKES = [
  "AUDI", "BMW", "CHEVROLET", "CITROËN", "DACIA", "DAEWOO", "FIAT", "FORD", "GM", "HONDA",
  "HYUNDAI", "INFINITI", "KIA", "LEXUS", "MAZDA", "MERCEDES-BENZ", "MITSUBISHI", "NISSAN", "OPEL", "PEUGEOT",
  "PORSCHE", "RENAULT", "SEAT", "SKODA", "SSANGYONG", "SUBARU", "SUZUKI", "TOYOTA", "VOLVO", "VW",
];
