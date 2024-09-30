import { Language, TranslationEntry } from './Translation'
import draconic from '../assets/draconic.json'
import goblin from '../assets/goblin.json'

export const loadTranslations = (lang: Language): TranslationEntry[] => {
    if (lang === 'draconic') return draconic
    if (lang === 'goblin') return goblin
    throw new Error('Unknown language')
}
