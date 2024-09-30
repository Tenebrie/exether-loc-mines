import Select from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import {
    AvailableLanguages,
    Language,
    languageToLabel,
} from '../utils/Translation'

export type Entry = {
    value: Language
    name: string
}

type Props = {
    selected: Entry
    setSelected: (val: Entry) => void
}

export const LanguageSelector = ({ selected, setSelected }: Props) => {
    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Language</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selected.value}
                    label="Language"
                    onChange={(event) => setSelected(event.target as Entry)}
                >
                    {AvailableLanguages.map((lang) => (
                        <MenuItem key={lang} value={lang}>
                            {languageToLabel(lang)}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    )
}
