import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "../components/Navbar";


export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <Navbar/>
        {children}
    </>
  );
}
