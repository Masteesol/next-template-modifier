// utils/i18nUtils.ts

type TranslateFunction = (key: string) => string;

export function translateOrDefault(t: TranslateFunction, key: string, defaultText: string): string {
  const translation = t(key);
  return translation === key ? defaultText : translation;
}
