import { Box, Typography } from "@mui/material"

export default function InfosTrade(dados: any) {
    console.log('dados', dados.dados)
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
                <Typography>Mercado/Limit: <strong>{dados.dados.o}</strong></Typography>
                <Typography>Par de moeda: <strong>{dados.dados.s}</strong></Typography>
                <Typography>Buy/Sell: <strong>{dados.dados.S}</strong></Typography>
                <Typography>New/Canceled: <strong>{dados.dados.X}</strong></Typography>
            </Box>
        </Box>
    )
}