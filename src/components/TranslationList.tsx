import Box from '@mui/material/Box'
import { ListChildComponentProps, FixedSizeList } from 'react-window'
import { TranslationEntry } from '../utils/Translation'
import { ListItem, ListItemButton, ListItemText } from '@mui/material'
import Fuse from 'fuse.js'
import { useCallback, useEffect, useRef, useState } from 'react'
import { PreferredEntry } from './HomePage'

function renderRow(props: ListChildComponentProps<RowProps[]>) {
    const { index, style } = props
    const data = props.data[index]

    return (
        <ListItem style={style} key={index} component="div" disablePadding>
            <ListItemButton selected={data?.selected}>
                <ListItemText
                    primary={`${data?.conlang} ${data?.pronounciation}`}
                    secondary={`${data?.english}`}
                    onClick={data?.onClick}
                />
            </ListItemButton>
        </ListItem>
    )
}

type Props = {
    list: TranslationEntry[]
    inputText: string
    preferredList: PreferredEntry[]
    addPreferred: (entry: TranslationEntry, source: string) => void
    removePreferred: (entry: TranslationEntry) => void
}

type RowProps = TranslationEntry & {
    onClick: () => void
    selected: boolean
}

export const TranslationList = ({ list, inputText, preferredList, addPreferred, removePreferred }: Props) => {
    const fuse = useRef<Fuse<TranslationEntry>>(
        new Fuse(list, {
            keys: ['english'],
        })
    )

    const generateList = useCallback((): RowProps[] => {
        const words = inputText.split(' ')
        const lastWord = words[words.length - 1]
        const baseList = inputText.length > 2 ? fuse.current.search(lastWord).map((item) => item.item) : list

        const applicablePreferredList = preferredList
            .filter((item) => item.sourceText === lastWord)
            .map((item) => item.entry)

        baseList.sort((a, b) => {
            if (applicablePreferredList.includes(a) && !applicablePreferredList.includes(b)) {
                return -1
            } else if (!applicablePreferredList.includes(a) && applicablePreferredList.includes(b)) {
                return 1
            } else {
                return 0
            }
        })

        return baseList.map((item) => ({
            ...item,
            onClick: () => {
                if (preferredList.map((item) => item.entry).includes(item)) {
                    removePreferred(item)
                } else {
                    addPreferred(item, lastWord)
                }
            },
            selected: applicablePreferredList.includes(item),
        }))
    }, [addPreferred, inputText, list, preferredList, removePreferred])

    const [renderedList, setRenderedList] = useState(generateList())

    useEffect(() => {
        fuse.current = new Fuse(list, {
            keys: ['english'],
        })
    }, [list])

    useEffect(() => {
        setRenderedList(generateList())
    }, [generateList, inputText, list])

    return (
        <Box
            sx={{
                width: '100%',
                height: 400,
                maxWidth: 360,
                bgcolor: 'background.paper',
            }}
        >
            <FixedSizeList
                itemData={renderedList}
                height={400}
                width={360}
                itemSize={72}
                itemCount={renderedList.length}
                overscanCount={5}
            >
                {renderRow}
            </FixedSizeList>
        </Box>
    )
}
