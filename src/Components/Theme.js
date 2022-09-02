import { createTheme } from '@mui/material/styles';

const Theme = createTheme({
    palette: {
        primary: {
            main: '#fff',
        },
        error: {
            main: '#1c1e21'
        },
        secondary: {
            main: '#e5322d'
        },
        field : {
            main : "000"
        }
    }
})

export default Theme