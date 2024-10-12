import FormControl from '@mui/material/FormControl'
import Box from '@mui/material/Box'
import { IconButton, TextField } from '@mui/material'
import { TranslationEntry } from '../utils/Translation'
import { useCallback, useEffect, useState } from 'react'
import Fuse from 'fuse.js'
import ContentCopy from '@mui/icons-material/ContentCopy'
import { PreferredEntry } from './HomePage'
import { makeFuse } from '../utils/Fuse'

type Props = {
    list: TranslationEntry[]
    inputText: string
    preferredList: PreferredEntry[]
}

export const TranslatedInput = ({ list, inputText, preferredList }: Props) => {
    const [text, setText] = useState<string>('')

    const [fuse, setFuse] = useState<Fuse<TranslationEntry>>(makeFuse(list))

    useEffect(() => {
        setFuse(makeFuse(list))
    }, [list])

    const translate = useCallback(
        (word: string) => {
            const results = fuse.search(word).map((item) => item.item)
            const applicablePreferredList = preferredList
                .filter((item) => item.sourceText === word)
                .map((item) => item.entry)
            results.sort((a, b) => {
                if (applicablePreferredList.includes(a) && !applicablePreferredList.includes(b)) {
                    return -1
                } else if (!applicablePreferredList.includes(a) && applicablePreferredList.includes(b)) {
                    return 1
                } else {
                    return 0
                }
            })
            return results[0]?.conlang ?? ''
        },
        [fuse, preferredList]
    )

    useEffect(() => {
        const text = inputText
            .split(' ')
            .map((word) => translate(word))
            .join('')
        setText(text.substring(0, 1).toUpperCase() + text.substring(1))
    }, [inputText, list, translate])

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <TextField
                    id="filled-basic"
                    label="Translated text"
                    disabled
                    variant="filled"
                    value={text}
                    slotProps={{
                        input: {
                            endAdornment: (
                                <IconButton onClick={() => navigator.clipboard.writeText(text)}>
                                    <ContentCopy />
                                </IconButton>
                            ),
                        },
                    }}
                />
            </FormControl>
        </Box>
    )
}
