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
import { InfoAccountBalance } from "../utils/connectAPI/infoAccountBalance";
import { StartBot } from "../utils/StartBot/StartBot";
import { Navbar } from "../components/Navbar";
import TableAccountBalance from "../components/TableAccoutBalance";


export default function Home() {

  const [OpenModal, setOpenModal] = useState<boolean>(false)
  const [loading, setLoading] = useState(false)
  const [WaitingTrade, setWaitingTrade] = useState(false)

  const [modalResponse, setModalResponse] = useState<any>(null);


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
      const start = await StartBot()
      console.log('start', start)
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
    }else{
      carregaValores()
      setLoading(false)
    }
  };

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
                    width={'80%'}
                  >
                    <TableAccountBalance modalResponse={modalResponse} />
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
      {
        WaitingTrade ?
          <Box sx={{ width: '100%' }}>
            <LinearProgress />
          </Box> :
          null
      }

      <ModalLoadMaster Open={OpenModal} onClose={handleModalClose} />
    </Box >

  );
}
