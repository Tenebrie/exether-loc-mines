import FormControl from '@mui/material/FormControl'
import Box from '@mui/material/Box'
import { debounce, IconButton, TextField } from '@mui/material'
import { useMemo, useState } from 'react'
import { Close } from '@mui/icons-material'

type Props = {
    text: string
    setText: (val: string) => void
}

export const UserTextInput = ({ text, setText }: Props) => {
    const [internalText, setInternalText] = useState<string>(text)
    const debouncedSetText = useMemo(() => debounce(setText, 500), [setText])

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <TextField
                    id="filled-basic"
                    label="Source text"
                    variant="filled"
                    value={internalText}
                    onChange={(event) => {
                        setInternalText(event.target.value)
                        debouncedSetText(event.target.value)
                    }}
                    slotProps={{
                        input: {
                            endAdornment: (
                                <IconButton
                                    disabled={!internalText}
                                    onClick={() => {
                                        setText('')
                                        setInternalText('')
                                    }}
                                >
                                    <Close />
                                </IconButton>
                            ),
                        },
                    }}
                />
            </FormControl>
        </Box>
    )
}
