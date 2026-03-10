export type TranslationMap = { [key: string]: string | TranslationMap };

// UI 仅正式支持英文与简体中文。
export type Locale = "en" | "zh-CN";

export interface I18nConfig {
  locale: Locale;
  fallbackLocale: Locale;
  translations: Record<Locale, TranslationMap>;
}
