"use client"

import { Box, Button, Card, CardActions, CardContent, CircularProgress, TextField, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from "react";
import ModalLoadMaster from "../utils/ModalLoadMaster";
import { InfoAccountBalance } from "../connectAPI/infoAccountBalance";
import { StartBot } from "../StartBot/StartBot";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  }
}));

export default function Home() {

  const [OpenModal, setOpenModal] = useState<boolean>(false)
  const [loading, setLoading] = useState(false)
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
    setLoading(true)
    try {
      const start = await StartBot()
      console.log('start', start)
    } catch (error) {
      console.error('Erro ao ativar bot:', error)
    }
    setLoading(false)
  }
  async function LoadAccountMaster() {
    setLoading(true)
    setOpenModal(true)
  }

  const handleModalClose = (response: any) => {
    setOpenModal(false);
    if (response) {
      setModalResponse(response);
      setLoading(false)
    }
  };

  return (
    <Box
      width='100%'
      height='100vh'
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
    >
      {
        !loading ?
          <>
            <Box width={'50%'}>

              {modalResponse ? (
                <TableContainer component={Paper}>
                  <Table aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell align="center">Nome</StyledTableCell>
                        <StyledTableCell align="center">Valores</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {modalResponse.map((row: any) => (
                        <StyledTableRow key={row.name}>
                          <StyledTableCell align="center" component="th" scope="row">
                            {row.name}
                          </StyledTableCell>
                          <StyledTableCell align="center">{row.balance}</StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : null}
            </Box>

            <Box
              display='flex'
              flexDirection='column'
              gap={2}
              width={450}
              alignItems='center' // Alinha os elementos filhos horizontalmente
            >
              <Button variant='contained' onClick={() => LoadAccountMaster()}>
                Carregar conta Master
              </Button>
              {modalResponse ?
                <Button variant='contained' onClick={() => AtivarBot()}>
                  Ativar bot
                </Button>
                : null
              }
            </Box>
          </>

          :
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
      }

      <ModalLoadMaster Open={OpenModal} onClose={handleModalClose} />
    </Box>

  );
}
