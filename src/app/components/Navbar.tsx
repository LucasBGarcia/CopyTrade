"use client"
import { Box, Button, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import { ClearCookies } from "../utils/clearCookies/clearCookies";

export const Navbar = () => {
    const limparCookies = () => {
        const cleared = ClearCookies()
    }
    return (
        <Box bgcolor={'#606060'}>
            <Toolbar>
                <Typography>bot cripto</Typography>
                <Button onClick={(e) =>  limparCookies()}>Limpar cookies</Button>
            </Toolbar>
        </Box>
    )
}