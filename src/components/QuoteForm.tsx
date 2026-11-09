import { useId, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Loader2,
  Mail,
  MapPin,
  Phone,
  TrainFront,
} from "lucide-react";
import {
  submitQuote,
  vehicleOptions,
  type QuoteChannel,
  type QuotePayload,
  type VehicleType,
} from "../lib/quote";
import { cn } from "../lib/utils";
import { Button } from "./ui/Button";

type FormStatus = "idle" | "submitting" | "success" | "error";
type FormErrors = Partial<Record<keyof QuotePayload | "consent", string>>;

interface QuoteFormProps {
  initialVehicle?: VehicleType;
  onSuccess?: () => void;
}

const inputBase =
  "h-12 w-full border bg-white px-3.5 text-sm text-ink placeholder:text-slate-400 transition-colors duration-200 focus:border-signal focus:outline-none focus:ring-2 focus:ring-signal/15 disabled:cursor-not-allowed disabled:bg-mist";

const inputIcons = "pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400";

function validate(values: QuotePayload, consent: boolean): FormErrors {
  const errors: FormErrors = {};

  if (!values.origin.trim()) {
    errors.origin = "Укажите станцию отправления";
  }

  if (!values.destination.trim()) {
    errors.destination = "Укажите станцию назначения";
  } else if (
    values.origin.trim() &&
    values.origin.trim().toLowerCase() ===
      values.destination.trim().toLowerCase()
  ) {
    errors.destination = "Станции отправления и назначения не должны совпадать";
  }

  const phoneDigits = values.phone.replace(/\D/g, "");
  if (!values.phone.trim()) {
    errors.phone = "Укажите контактный телефон";
  } else if (phoneDigits.length < 10 || phoneDigits.length > 15) {
    errors.phone = "Проверьте номер телефона";
  }

  if (!values.email.trim()) {
    errors.email = "Укажите корпоративный email";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) {
    errors.email = "Проверьте адрес электронной почты";
  }

  if (!consent) {
    errors.consent = "Подтвердите согласие на обработку данных";
  }

  return errors;
}

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}

function Field({ id, label, error, children }: FieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500"
      >
        {label}
        <span className="ml-1 text-signal" aria-hidden="true">
          *
        </span>
      </label>
      {children}
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-1.5 flex items-start gap-1.5 text-[11px] leading-snug text-signal"
        >
          <AlertCircle
            className="mt-px h-3 w-3 shrink-0"
            aria-hidden="true"
          />
          {error}
        </p>
      )}
    </div>
  );
}

export function QuoteForm({
  initialVehicle = "platform",
  onSuccess,
}: QuoteFormProps) {
  const formId = useId();
  const [values, setValues] = useState<QuotePayload>({
    vehicleType: initialVehicle,
    origin: "",
    destination: "",
    phone: "",
    email: "",
  });
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [channel, setChannel] = useState<QuoteChannel>("endpoint");
  const [formError, setFormError] = useState("");

  const updateValue = <K extends keyof QuotePayload>(
    field: K,
    value: QuotePayload[K],
  ) => {
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
    if (status === "error") {
      setStatus("idle");
      setFormError("");
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validate(values, consent);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      const firstField = Object.keys(nextErrors)[0];
      document.getElementById(`${formId}-${firstField}`)?.focus();
      return;
    }

    setStatus("submitting");
    setFormError("");

    try {
      const result = await submitQuote({
        ...values,
        origin: values.origin.trim(),
        destination: values.destination.trim(),
        phone: values.phone.trim(),
        email: values.email.trim(),
      });
      setChannel(result.channel);
      setStatus("success");
      onSuccess?.();
    } catch (error) {
      setStatus("error");
      setFormError(
        error instanceof Error
          ? error.message
          : "Не удалось отправить заявку. Попробуйте ещё раз.",
      );
    }
  };

  const resetForm = () => {
    setValues({
      vehicleType: initialVehicle,
      origin: "",
      destination: "",
      phone: "",
      email: "",
    });
    setConsent(false);
    setErrors({});
    setFormError("");
    setStatus("idle");
  };

  if (status === "success") {
    return (
      <div
        className="flex min-h-[480px] flex-col items-center justify-center px-4 py-10 text-center"
        role="status"
      >
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
        </span>
        <h3 className="mt-6 text-2xl font-bold tracking-[-0.03em] text-ink">
          {channel === "email" ? "Заявка сформирована" : "Заявка принята"}
        </h3>
        <p className="mt-3 max-w-[420px] text-sm leading-relaxed text-slate-500">
          {channel === "email"
            ? "Мы открыли ваш почтовый клиент с готовым письмом. Если он не открылся, напишите нам напрямую на info@rtc-rails.ru."
            : "Специалист свяжется с вами в течение 2 рабочих часов и подготовит расчёт по указанному маршруту."}
        </p>
        <div className="mt-7 flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
          <a
            href="mailto:info@rtc-rails.ru"
            className="inline-flex h-12 items-center justify-center gap-2 border border-ink px-5 text-[13px] font-semibold text-ink transition-colors hover:bg-ink hover:text-white"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            Написать напрямую
          </a>
          <Button variant="outline" onClick={resetForm}>
            Новая заявка
          </Button>
        </div>
      </div>
    );
  }

  const isSubmitting = status === "submitting";

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Field
            id={`${formId}-vehicleType`}
            label="Тип подвижного состава"
            error={errors.vehicleType}
          >
            <div className="relative">
              <TrainFront className={inputIcons} aria-hidden="true" />
              <select
                id={`${formId}-vehicleType`}
                name="vehicleType"
                value={values.vehicleType}
                onChange={(event) =>
                  updateValue(
                    "vehicleType",
                    event.target.value as VehicleType,
                  )
                }
                disabled={isSubmitting}
                aria-required="true"
                aria-invalid={Boolean(errors.vehicleType)}
                aria-describedby={
                  errors.vehicleType
                    ? `${formId}-vehicleType-error`
                    : undefined
                }
                className={cn(
                  inputBase,
                  "appearance-none pl-10 pr-10",
                  errors.vehicleType ? "border-signal" : "border-line",
                )}
              >
                {vehicleOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                aria-hidden="true"
              />
            </div>
          </Field>
        </div>

        <Field
          id={`${formId}-origin`}
          label="Станция отправления"
          error={errors.origin}
        >
          <div className="relative">
            <MapPin className={inputIcons} aria-hidden="true" />
            <input
              id={`${formId}-origin`}
              name="origin"
              type="text"
              autoComplete="off"
              placeholder="Санкт-Петербург-Товарный"
              value={values.origin}
              onChange={(event) => updateValue("origin", event.target.value)}
              disabled={isSubmitting}
              aria-required="true"
              aria-invalid={Boolean(errors.origin)}
              aria-describedby={
                errors.origin ? `${formId}-origin-error` : undefined
              }
              className={cn(
                inputBase,
                "pl-10",
                errors.origin ? "border-signal" : "border-line",
              )}
            />
          </div>
        </Field>

        <Field
          id={`${formId}-destination`}
          label="Станция назначения"
          error={errors.destination}
        >
          <div className="relative">
            <MapPin className={inputIcons} aria-hidden="true" />
            <input
              id={`${formId}-destination`}
              name="destination"
              type="text"
              autoComplete="off"
              placeholder="Новолипецк"
              value={values.destination}
              onChange={(event) =>
                updateValue("destination", event.target.value)
              }
              disabled={isSubmitting}
              aria-required="true"
              aria-invalid={Boolean(errors.destination)}
              aria-describedby={
                errors.destination
                  ? `${formId}-destination-error`
                  : undefined
              }
              className={cn(
                inputBase,
                "pl-10",
                errors.destination ? "border-signal" : "border-line",
              )}
            />
          </div>
        </Field>

        <Field
          id={`${formId}-phone`}
          label="Контактный телефон"
          error={errors.phone}
        >
          <div className="relative">
            <Phone className={inputIcons} aria-hidden="true" />
            <input
              id={`${formId}-phone`}
              name="phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              placeholder="+7 (___) ___-__-__"
              value={values.phone}
              onChange={(event) => updateValue("phone", event.target.value)}
              disabled={isSubmitting}
              aria-required="true"
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={
                errors.phone ? `${formId}-phone-error` : undefined
              }
              className={cn(
                inputBase,
                "pl-10",
                errors.phone ? "border-signal" : "border-line",
              )}
            />
          </div>
        </Field>

        <Field
          id={`${formId}-email`}
          label="Корпоративный email"
          error={errors.email}
        >
          <div className="relative">
            <Mail className={inputIcons} aria-hidden="true" />
            <input
              id={`${formId}-email`}
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              placeholder="name@company.ru"
              value={values.email}
              onChange={(event) => updateValue("email", event.target.value)}
              disabled={isSubmitting}
              aria-required="true"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={
                errors.email ? `${formId}-email-error` : undefined
              }
              className={cn(
                inputBase,
                "pl-10",
                errors.email ? "border-signal" : "border-line",
              )}
            />
          </div>
        </Field>

        <div className="sm:col-span-2">
          <label
            htmlFor={`${formId}-consent`}
            className="flex cursor-pointer items-start gap-3 text-[11px] leading-relaxed text-slate-500"
          >
            <input
              id={`${formId}-consent`}
              name="consent"
              type="checkbox"
              checked={consent}
              onChange={(event) => {
                setConsent(event.target.checked);
                if (errors.consent) {
                  setErrors((current) => ({
                    ...current,
                    consent: undefined,
                  }));
                }
              }}
              disabled={isSubmitting}
              aria-required="true"
              aria-invalid={Boolean(errors.consent)}
              aria-describedby={
                errors.consent ? `${formId}-consent-error` : undefined
              }
              className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-signal"
            />
            <span>
              Согласен на обработку персональных данных для подготовки
              коммерческого предложения.
            </span>
          </label>
          {errors.consent && (
            <p
              id={`${formId}-consent-error`}
              role="alert"
              className="mt-1.5 flex items-start gap-1.5 text-[11px] leading-snug text-signal"
            >
              <AlertCircle
                className="mt-px h-3 w-3 shrink-0"
                aria-hidden="true"
              />
              {errors.consent}
            </p>
          )}
        </div>
      </div>

      {formError && (
        <div
          role="alert"
          className="mt-5 flex items-start gap-2 border border-signal/30 bg-signal/5 p-3 text-xs leading-relaxed text-signal"
        >
          <AlertCircle className="mt-px h-4 w-4 shrink-0" aria-hidden="true" />
          {formError}
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="group mt-6 w-full"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Отправляем заявку
          </>
        ) : (
          <>
            Получить расчёт ставки за 2 часа
            <ArrowRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </>
        )}
      </Button>

      <p className="mt-3 text-center text-[10px] leading-relaxed text-slate-400">
        Ответим в течение 2 рабочих часов. Без спама и рассылок.
      </p>
    </form>
  );
}
