"use client"

import { Box, Button, CircularProgress, LinearProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import InfosTrade from "../components/InfosTrade";
import ModalLoadMaster from "../components/ModalLoadMaster";
import TableAccountBalance from "../components/TableAccoutBalance";
import { StartBot } from "../utils/StartBot/StartBot";
import { InfoAccount, InfoAccountBalance } from "../utils/connectAPI/infoAccountBalance";
import { Trade } from "../utils/trade/trade";
import api from "../services/api";


export default function Home() {

  const [OpenModal, setOpenModal] = useState<boolean>(false)
  const [loading, setLoading] = useState(false)
  const [WaitingTrade, setWaitingTrade] = useState(false)

  const [modalResponse, setModalResponse] = useState<any>(null);
  const [TradeReceived, setTradeReceived] = useState<any>(null);



  // async function carregaValores() {
  //   const valores = await InfoAccountBalance()
  //   if (valores) {
  //     setModalResponse(valores)
  //   }
  //   setLoading(false)
  // }
  // useEffect(() => {
  //   setLoading(true)

  //   carregaValores()
  // }, [])

  async function AtivarBot() {
    setWaitingTrade(true)
    try {
      const trade = await StartBot()
      setTradeReceived(trade)
      console.log( 'trade na home', trade)
      // const newTrade = await Trade(trade)
      // console.log('trade', trade)
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
      // carregaValores()
      setLoading(false)
    }
  };



  async function Funcaoteste() {
    setWaitingTrade(true)
    try {
      const valoresIniciais = await api.post('/get-account-balance-usdt', {
        apiKey: '4SYTGW0z943oiusiWL0NU89FWBkNAT9Fh7YaLSrhvmxeowQV8slnOVk5Ue5Qoxxo',
        apiSecret:'bbFwPoARmSK6Pq3L23NRzAY6Fji9BkjjSAuIy82bl43BZ8vwM2UE5hJmncBvZBiP',
    });
    console.log('Valores iniciais:', valoresIniciais.data);

      // const trade = await api.get('/take-listen-key')
      // console.log('trade', trade)
    } catch (error) {
      console.error('Erro ao ativar bot:', error)
    }
    setWaitingTrade(false)
  }
  return (
    <Box
      width='100%'
      height='100vh'
      display='flex'
    // flexDirection='column'
    // alignItems='center'
    // justifyContent='center'
    >
      {
        !loading ?
          <>
            <Box width='100%'
              height='100vh'
              display='flex'
              flexDirection='row'
              // alignItems='center'
              justifyContent='center'
            >

              <Box
                display='flex'
                flexDirection='column'
                width={'100%'}
                alignItems='center'
                marginTop={1}
              >

                {modalResponse ? (
                  <Box
                    display='flex'
                    flexDirection='column'
                    width={'80%'}
                  >
                    <TableAccountBalance modalResponse={modalResponse} />
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
                {(modalResponse && !WaitingTrade) ?
                  <Button variant='contained' onClick={() => AtivarBot()}>
                    Ativar bot
                  </Button>

                  : null
                }
                <Button variant='contained' onClick={() => Funcaoteste()}>
                  botao para testes de retornos
                </Button>
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

  );
}
