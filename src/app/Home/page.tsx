"use client"

import { Box, Button, Card, CardActions, CardContent, CircularProgress, Container, LinearProgress, TextField, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from "react";
import ModalLoadMaster from "../components/ModalLoadMaster";
import { InfoAccount, InfoAccountBalance } from "../utils/connectAPI/infoAccountBalance";
import { StartBot } from "../utils/StartBot/StartBot";
import { Navbar } from "../components/Navbar";
import TableAccountBalance from "../components/TableAccoutBalance";
import { Trade } from "../utils/trade/trade";
import InfosTrade from "../components/InfosTrade";


export default function Home() {

  const [OpenModal, setOpenModal] = useState<boolean>(false)
  const [loading, setLoading] = useState(false)
  const [WaitingTrade, setWaitingTrade] = useState(false)

  const [modalResponse, setModalResponse] = useState<any>(null);
  const [TradeReceived, setTradeReceived] = useState<any>(null);



  async function carregaValores() {
    const valores = await InfoAccountBalance()
    if (valores) {
      setModalResponse(valores)
    }
    setLoading(false)
  }
  useEffect(() => {
    setLoading(true)

    carregaValores()
  }, [])

  async function AtivarBot() {
    setWaitingTrade(true)
    try {
      const trade = await StartBot()
      setTradeReceived(trade)
      const newTrade = await Trade(trade)
      console.log('trade', trade)
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

      const trade = await InfoAccount('eQaoMJdUfjXDHwDT3NT17ESKBK2dh2aoc9EIhjpNV23QjXlJE3GanPmnY0SBrlL5', 'LcDt9GIHnSEoCILPT86elqsODFxzAsRm9EK2SInAX0qZrzAY0boAks579ePpxSsy')
      console.log('trade', trade)
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
