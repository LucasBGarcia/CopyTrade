import Image from "next/image";
import styles from "./page.module.css";
import { Box, Card, CardContent, Typography, TextField, CardActions, Button } from "@mui/material";
import Link from "next/link";

export default function Home() {
  return (
    <Box width='100vw' height='100vh' display='flex' alignItems='center' justifyContent='center'>

      <Card>
        <CardContent>
          <Box display='flex' flexDirection='column' gap={2} width={250}>
            <Typography variant='h6' align='center'>Identifique-se</Typography>

            <TextField
              fullWidth
              type='email'
              label='Email'
            //   value={email}
            //   disabled={isLoading}
            // error={!!emailError}
            //   helperText={emailError}
            //   onKeyDown={() => setEmailError('')}
            //   onChange={e => setEmail(e.target.value)}
            />

            <TextField
              fullWidth
              label='Senha'
              type='password'
            //   value={password}
            //   disabled={isLoading}
            //   error={!!passwordError}
            //   helperText={passwordError}
            //   onKeyDown={() => setPasswordError('')}
            //   onChange={e => setPassword(e.target.value)}
            />
          </Box>
        </CardContent>
        <CardActions>
          <Box width='100%' display='flex' justifyContent='center'>

            {/* <Button
              variant='contained'
            //   disabled={isLoading}
            //   onClick={handleSubmit}
            //   endIcon={isLoading ? <CircularProgress variant='indeterminate' color='inherit' size={20} /> : undefined}

            >
              Entrar
            </Button> */}
            <Link
              href={'/Home'}
            >
              Entrar
            </Link>
          </Box>
        </CardActions>
      </Card>
    </Box>
  );
}
