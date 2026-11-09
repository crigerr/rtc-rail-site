import { company } from "../data/company";

export type VehicleType = "platform" | "cistern";
export type FleetTab = "platforms" | "cisterns";

export const vehicleOptions: Array<{ value: VehicleType; label: string }> = [
  { value: "platform", label: "Фитинговая платформа" },
  { value: "cistern", label: "Цистерна для жидкого пека" },
];

export const vehicleLabel: Record<VehicleType, string> = {
  platform: "Фитинговая платформа 20/40/45′",
  cistern: "Цистерна для жидкого пека",
};

export interface QuotePayload {
  vehicleType: VehicleType;
  origin: string;
  destination: string;
  phone: string;
  email: string;
}

export type QuoteChannel = "endpoint" | "email";

export async function submitQuote(
  payload: QuotePayload,
): Promise<{ channel: QuoteChannel }> {
  const isDemo = new URLSearchParams(window.location.search).has("demo");

  if (isDemo) {
    await new Promise((resolve) => window.setTimeout(resolve, 550));
    return { channel: "endpoint" };
  }

  const endpoint = import.meta.env.VITE_QUOTE_ENDPOINT?.trim();

  if (endpoint) {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...payload,
        vehicleTypeLabel: vehicleLabel[payload.vehicleType],
        source: "rtc-rails.ru",
        submittedAt: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error("Не удалось отправить заявку. Попробуйте ещё раз.");
    }

    return { channel: "endpoint" };
  }

  const subject = `Запрос расчёта ставки — ${vehicleLabel[payload.vehicleType]}`;
  const body = [
    `Тип подвижного состава: ${vehicleLabel[payload.vehicleType]}`,
    `Станция отправления: ${payload.origin}`,
    `Станция назначения: ${payload.destination}`,
    `Телефон: ${payload.phone}`,
    `Корпоративный email: ${payload.email}`,
    "",
    "Заявка сформирована на сайте rtc-rails.ru",
  ].join("\n");

  window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return { channel: "email" };
}
