export type Language = keyof typeof LanguageSources

export type TranslationEntry = {
    conlang: string
    english: string
    pronounciation: string
}

export const LanguageSources = {
    draconic: 'draconic.json',
    goblin: 'goblin.json',
}

export const AvailableLanguages = Object.keys(LanguageSources) as Language[]

export const languageToLabel = (lang: Language) => {
    return lang
}
