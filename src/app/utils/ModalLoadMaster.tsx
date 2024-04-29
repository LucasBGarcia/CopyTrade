import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { FormEvent } from 'react'
import { LoadAccountsAPI } from '../connectAPI/LoadAccounts';

const style = {
  position: 'absolute' as 'absolute',
  color: 'black',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: '#fafaff',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px'
};

interface ModalLoadMasterProps {
  Open: boolean,
  setOpen: React.Dispatch<boolean>
}

export default function ModalLoadMaster({ Open, setOpen }: ModalLoadMasterProps) {
  const [keysMaster, setKeysMaster] = React.useState<any>('')
  const [keysClientes, setKeysClientes] = React.useState<any>('')

  const handleClose = () => setOpen(false)

  async function handleSaveMaster() {
    // setKeysArray(JSON.parse(keys))
console.log(keysMaster)
console.log(keysClientes)

    const response = await LoadAccountsAPI(keysMaster, keysClientes)


    // const data = await response.json()
    // console.log("response lado cliente", data)
  }


  return (
    <div>
      <Modal
        open={Open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box >

            <Typography id="modal-modal-title" variant="h6" component="h2">
              Envie os dados do Trade Master
            </Typography>
          </Box>
          <Box sx={{ width: '100%', justifyContent: 'center', alignItems: 'center', display: 'flex' }} >

            <TextField
              id="outlined-multiline-flexible"
              label="KEY Master"
              multiline
              maxRows={20}
              sx={{ width: '80%' }}
              onChange={(e) => setKeysMaster(e.target.value)}
            />

          </Box>
          <Box sx={{ width: '100%', justifyContent: 'center', alignItems: 'center', display: 'flex' }} >

            <TextField
              id="outlined-multiline-flexible"
              label="KEYS clientes"
              multiline
              maxRows={20}
              sx={{ width: '80%' }}
              onChange={(e) => setKeysClientes(e.target.value)}
            />

          </Box>
          <Button variant='contained' color="success" onClick={handleSaveMaster}>Enviar</Button>
          <Button variant='contained' color="error" onClick={handleClose}>close</Button>


        </Box>


      </Modal>
    </div >
  );
}
