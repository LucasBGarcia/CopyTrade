"use client"

import { Box, Button, Card, CardActions, CardContent, TextField, Typography } from "@mui/material";

import { useState } from "react";
import ModalLoadMaster from "../utils/ModalLoadMaster";

export default function Home() {

  const [OpenModal, setOpenModal] = useState<boolean>(false)
  const [loading, setLoading] = useState(false)

  async function AtivarBot() {
    setLoading(true)

    const response = await fetch("http://localhost:3000/api/posts")
    const data = await response.json()
    console.log(data)
    console.log("caindo aqui")
  }

  async function LoadAccountMaster() {
    setLoading(true)
    setOpenModal(true)
  }


  return (
    <Box width='100vw' height='100vh' display='flex' alignItems='center' justifyContent='center'>

      <Box>
        <Box display='flex' flexDirection='column' gap={2} width={450}>
          <Button
            variant='contained'
            onClick={() => LoadAccountMaster()}
          >
            Carregar conta Master
          </Button>


        </Box>
        <Box width='100%' display='flex' justifyContent='center'>

          <Button
            disabled={true}
            variant='contained'
            onClick={() => AtivarBot()}
          >
            Ativar bot
          </Button>

        </Box>
      </Box>
      <ModalLoadMaster Open={OpenModal}  setOpen={setOpenModal}/>
    </Box>
  );
}
