import { createTheme } from "@mui/material";

export const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            // small
            sm: 600,
            // medium
            md: 900,
            // large
            lg: 1200,
            // extra-large
            xl: 1536,
        }
    }
})