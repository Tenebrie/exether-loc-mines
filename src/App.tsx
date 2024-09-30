import { createTheme, ThemeProvider } from '@mui/material'
import './App.css'
import { HomePage } from './components/HomePage'

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
})

function App() {
    return (
        <>
            <ThemeProvider theme={darkTheme}>
                <HomePage />
            </ThemeProvider>
        </>
    )
}

export default App
