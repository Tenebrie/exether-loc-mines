export type Language = (typeof AvailableLanguages)[number]

export type TranslationEntry = {
    conlang: string
    english: string
    pronounciation: string
}

export const AvailableLanguages = [
    'anwarthi',
    'darkelf',
    'draconic',
    'dwarf',
    'giant',
    'gnoll',
    'gnome',
    'goblin',
    'highelf',
    'naga',
    'namkhazen',
    'ocelian',
    'orcish',
    'praksian',
    'saltwaste',
    'simian',
    'thalorian',
    'woodelf',
    'yokoybian',
] as const

const languageToLabelMap: Record<Language, string> = {
    anwarthi: 'Anwarthi/Luoydan',
    darkelf: 'Dark-Elf/Luian',
    draconic: 'Draconic/Strachi',
    dwarf: 'Dwarf/Dôrbian',
    giant: 'Giant/Glordian',
    gnoll: 'Gnoll/Pimbhuian',
    gnome: 'Gnome/Kwichti',
    goblin: 'Goblin/Dur̈amish',
    highelf: 'High-Elf/Cardarish',
    naga: 'Naga/Tilsozian',
    namkhazen: 'Namkhazen/Saukian',
    ocelian: 'Ocelian',
    orcish: 'Orcish/Dvunokhi',
    praksian: 'Praksian/Khussite',
    saltwaste: 'Salt Waste Creole/Lutati',
    simian: 'Simian/Tuksen',
    thalorian: 'Thalorian/Fradgian',
    woodelf: 'Wood Elf/Jelci',
    yokoybian: 'Yokoybian/Ch’in',
}

export const languageToLabel = (lang: Language) => {
    return languageToLabelMap[lang]
}
