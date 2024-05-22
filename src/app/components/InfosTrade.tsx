import { Box, Typography } from "@mui/material"

export default function InfosTrade(dados: any) {
    return (
        <Box width='100%'
            display='flex'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'>
            <Box>
                <Typography> Novo trade efetuado na conta master:</Typography>
            </Box>
            <Box>
                <Typography>Mercado/Limit: <strong>{dados.dados.value.o}</strong></Typography>
                <Typography>Par de moeda: <strong>{dados.dados.value.s}</strong></Typography>
                <Typography>Buy/Sell: <strong>{dados.dados.value.S}</strong></Typography>
                <Typography>New/Canceled: <strong>{dados.dados.value.X}</strong></Typography>
            </Box>
        </Box>
    )
}