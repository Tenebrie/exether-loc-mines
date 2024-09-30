import { useEffect, useState } from 'react'
import { Entry, LanguageSelector } from './LanguageSelector'
import {
    AvailableLanguages,
    languageToLabel,
    TranslationEntry,
} from '../utils/Translation'
import { loadTranslations } from '../utils/TranslationLoader'
import { TranslationList } from './TranslationList'
import { UserTextInput } from './UserTextInput'
import { TranslatedInput } from './TranslatedInput'
import { Box } from '@mui/material'

export type PreferredEntry = {
    entry: TranslationEntry
    sourceText: string
}

export const HomePage = () => {
    const [text, setText] = useState<string>('')
    const [data, setData] = useState<TranslationEntry[]>([])
    const [selected, setSelected] = useState<Entry>({
        value: AvailableLanguages[0],
        name: languageToLabel(AvailableLanguages[0]),
    })
    const [preferred, setPreferred] = useState<PreferredEntry[]>([])

    useEffect(() => {
        loadTranslations(selected.value).then((translations) => {
            setData(translations)
        })
    }, [selected])

    return (
        <Box gap={4} display="flex" flexDirection="column">
            <LanguageSelector selected={selected} setSelected={setSelected} />
            <UserTextInput text={text} setText={setText} />
            <TranslatedInput
                list={data}
                inputText={text}
                preferredList={preferred}
            />
            <TranslationList
                list={data}
                inputText={text}
                preferredList={preferred}
                addPreferred={(val, source) =>
                    setPreferred([
                        ...preferred.filter(
                            (item) => item.sourceText !== source
                        ),
                        { entry: val, sourceText: source },
                    ])
                }
                removePreferred={(val) =>
                    setPreferred(preferred.filter((item) => item.entry !== val))
                }
            />
        </Box>
    )
}
