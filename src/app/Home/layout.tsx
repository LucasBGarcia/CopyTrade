"use client"
import { Box } from "@mui/material";
import { Navbar } from "../components/Navbar";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      width="100%"
      height="100vh"
    >
      <Navbar />
      <Box
        flex="1"
        display="flex"
        flexDirection="column"
      >
        {children}
      </Box>
    </Box>
  );
};
