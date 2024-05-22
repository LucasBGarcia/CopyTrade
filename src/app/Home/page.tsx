"use client"

import { Box, Button, CircularProgress, LinearProgress, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import InfosTrade from "../components/InfosTrade";
import ModalLoadMaster from "../components/ModalLoadMaster";
import TableAccountBalance from "../components/TableAccoutBalance";
import api from "../services/api";
import { StartBot } from "../utils/StartBot/StartBot";
import { returnBalancesToHome } from "../utils/connectAPI/LoadAccounts";
import { Trade } from "../utils/trade/trade";

export default function Home() {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [OpenModal, setOpenModal] = useState<boolean>(false)
  const [loading, setLoading] = useState(false)
  const [WaitingTrade, setWaitingTrade] = useState(false)

  const [modalResponse, setModalResponse] = useState<any>(null);
  const [TradeReceived, setTradeReceived] = useState<any>(null);



  async function carregaValores() {
    const valores = await returnBalancesToHome()
    if (valores) {
      setModalResponse(valores)
    }
    setLoading(false)
  }
  useEffect(() => {
    setLoading(true)

    carregaValores()
  }, [])

  async function AtivarBot(pausarBot: boolean) {
    setWaitingTrade(true)
    try {
      if (!pausarBot) {
        const tradeSTR = await StartBot(true)
        if(tradeSTR){
          // const trade = await tradeSTR.json()
          console.log('trade na home', tradeSTR)
          setTradeReceived(tradeSTR)
          const newTrade = await Trade(tradeSTR)
          console.log('Trade', tradeSTR)
          console.log('newTrade', newTrade)
        }
      } else {
        console.log('aqui no else')
          StartBot(false)
        }
    } catch (error) {
      console.error('Erro ao ativar bot:', error)
    }
    setWaitingTrade(false)
  }

  async function LoadAccountMaster() {
    setLoading(true)
    setOpenModal(true)
  }

  const handleModalClose = (response: any) => {
    setOpenModal(false);
    console.log('response na page', response)

    if (response && response.name) {
      setModalResponse(response);
      setLoading(false)
    } else {
      carregaValores()
      setLoading(false)
    }
  };



  async function Funcaoteste() {
    setWaitingTrade(true)
    try {

      // const trade = await api.get('/take-listen-key')
      // console.log('trade', trade)
    } catch (error) {
      console.error('Erro ao ativar bot:', error)
    }
    setWaitingTrade(false)
  }
  return (
    // <ThemeProvider theme={theme}>

    //   <Responsive>
    <Box
      marginTop={'5px'}
      width='100%'
      height='100vh'
    // display='flex'
    // flexDirection='column'
    // alignItems='center'
    // justifyContent='center'
    >
      {
        !loading ?
          <>
            <Box width='100%'
              display='flex'
              flexDirection={isMobile ? 'column' : 'row'}
              alignItems='center'
              justifyContent='center'
            >
              <Box
                display='flex'
                flexDirection='column'
                width={'100%'}
                alignItems='center'
              >
                {modalResponse ? (
                  <Box
                    display='flex'
                    flexDirection='column'
                    width={'80%'}
                  >
                    <TableAccountBalance  modalResponse={modalResponse} />
                    {TradeReceived ?
                      <Box
                        display='flex'
                        flexDirection='column'
                        gap={2}
                        width={'80%'}
                        marginTop={1}
                        alignItems='center'
                      >
                        <InfosTrade dados={TradeReceived} />
                        <Typography>Efetuando trade na conta dos clientes</Typography>
                        <Box width="100%">
                          <LinearProgress />
                        </Box>
                      </Box>

                      : null
                    }
                  </Box>
                ) :
                  <Box
                    display='flex'
                    flexDirection='column'
                    width={'100%'}
                    alignItems='center'
                    marginTop={1}
                  >
                    <Typography >Nenhuma conta carregada</Typography>
                  </Box>
                }
              </Box>

              <Box
                display='flex'
                flexDirection='column'
                gap={2}
                width={'100%'}
                alignItems='center'
                marginTop={1} // Alinha os elementos filhos horizontalmente
              >
                <Button variant='contained' onClick={() => LoadAccountMaster()}>
                  Carregar contas
                </Button>
                {(modalResponse) ?
                  <>
                    {
                      !WaitingTrade ?
                        <Button variant='contained' onClick={() => AtivarBot(false)}>
                          Ativar bot
                        </Button>
                        :
                        <Button variant='contained' onClick={() => AtivarBot(true)}>
                          Pausar
                        </Button>
                    }
                  </>
                  : null
                }

                {/* <Button variant='contained' onClick={() => Funcaoteste()}>
                  botao para testes de retornos
                </Button> */}
                {
                  WaitingTrade ?
                    <Box
                      display='flex'
                      flexDirection='column'
                      gap={2}
                      width={'80%'}
                      marginTop={1}
                      alignItems='center' // Centraliza verticalmente os elementos filhos
                    >
                      <Typography>Aguardando trade</Typography>
                      <Box width="100%">
                        <LinearProgress />
                      </Box>
                    </Box>
                    :
                    null
                }
              </Box>

            </Box>
          </>

          :
          <Box
            width='100%'
            height='100vh'
            display='flex'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
          >
            <Typography>Carregando informações</Typography>
            <CircularProgress />
          </Box>

      }
      <ModalLoadMaster Open={OpenModal} onClose={handleModalClose} />
    </Box >
    //   </Responsive>

    // </ThemeProvider>
  );
}
