"use client"
import { Box, Button, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import { ClearCookies } from "../utils/clearCookies/clearCookies";

export const Navbar = () => {
    const limparCookies = () => {
        const cleared = ClearCookies()
        window.location.reload();
    }
    return (
        <Box bgcolor={'#606060'}>
            <Toolbar>
                <Typography>bot cripto</Typography>
                <Button  style={{fontWeight:'bold', marginLeft:3}} variant="outlined" color="success" onClick={(e) =>  limparCookies()}>Limpar cookies</Button>
            </Toolbar>
        </Box>
    )
}