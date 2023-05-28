// utils/translatePath.ts
type TranslatePath = (segment: string, t: (key: string) => string, locale: string) => string;

const translatePath: TranslatePath = (segment, t, locale) => {
  const translation = t(`paths.${segment}`);
  // Check if the translation exists and is not the same as the translation key
  if (translation && translation !== `paths.${segment}`) {
    return translation;
  }
  // If the translation doesn't exist, return the default segment
  return segment.charAt(0).toUpperCase() + segment.slice(1);
};

export default translatePath;
