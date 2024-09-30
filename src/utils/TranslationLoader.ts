import { Language, TranslationEntry } from './Translation'

export const loadTranslations = async (
    lang: Language
): Promise<TranslationEntry[]> => {
    const json = await import(`../assets/${lang}.json`)
    return json.default
}
