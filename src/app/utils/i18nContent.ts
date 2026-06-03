import { Language } from '../context/LanguageProvider';

/**
 * Multilingual content is stored as JSON: {"en":"...","fr":"...","sw":"..."}
 * If the value is a plain string (legacy), it's treated as the default language.
 */

export type MultiLangString = string | { en?: string; fr?: string; sw?: string };

/** Get the translated value for the current language */
export function getLocalizedValue(value: string | undefined | null, language: Language): string {
  if (!value) return '';
  try {
    const parsed = JSON.parse(value);
    if (typeof parsed === 'object' && parsed !== null) {
      return parsed[language] || parsed.en || parsed.fr || parsed.sw || '';
    }
  } catch {
    // Not JSON — return as-is (legacy plain string)
  }
  return value;
}

/** Set a value for a specific language, preserving other languages */
export function setLocalizedValue(currentValue: string | undefined | null, language: Language, newText: string): string {
  let obj: Record<string, string> = { en: '', fr: '', sw: '' };
  if (currentValue) {
    try {
      const parsed = JSON.parse(currentValue);
      if (typeof parsed === 'object' && parsed !== null) {
        obj = { en: parsed.en || '', fr: parsed.fr || '', sw: parsed.sw || '' };
      } else {
        // Was a plain string — put it in 'en' as default
        obj.en = currentValue;
      }
    } catch {
      // Plain string — put it in 'en'
      obj.en = currentValue;
    }
  }
  obj[language] = newText;
  return JSON.stringify(obj);
}

/** Check if a value is multilingual JSON */
export function isMultiLang(value: string | undefined | null): boolean {
  if (!value) return false;
  try {
    const parsed = JSON.parse(value);
    return typeof parsed === 'object' && parsed !== null && ('en' in parsed || 'fr' in parsed || 'sw' in parsed);
  } catch {
    return false;
  }
}

/** Get all language values from a stored string */
export function getAllLanguageValues(value: string | undefined | null): { en: string; fr: string; sw: string } {
  const result = { en: '', fr: '', sw: '' };
  if (!value) return result;
  try {
    const parsed = JSON.parse(value);
    if (typeof parsed === 'object' && parsed !== null) {
      result.en = parsed.en || '';
      result.fr = parsed.fr || '';
      result.sw = parsed.sw || '';
      return result;
    }
  } catch {}
  // Plain string — treat as English
  result.en = value;
  return result;
}
