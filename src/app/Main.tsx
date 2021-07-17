import {createTheme, ThemeProvider} from '@material-ui/core'
import {Routes} from './Routes'

export const Main= () => {
    const theme = createTheme({
        palette: {
            type: 'dark'
        },
        overrides: {
            MuiFormLabel: {
                root: {
                    color: '#C8C8CA !important'
                }
            },
            MuiOutlinedInput: {
                notchedOutline: {
                    borderWidth: '1px',
                    borderColor: '#EFEFF0 !important'
                }
            },
        }
    })

    return (
        <ThemeProvider theme={theme}>
            <Routes/>
        </ThemeProvider>
    )
}