"use server"
import { cookies } from "next/headers";

export async function ClearCookies() {
    const cookieStore = cookies()
    cookieStore.delete('clients')
    cookieStore.delete('master')
    cookieStore.delete('listen')
    cookieStore.delete('accountBalances')
    cookieStore.delete('ValorInicialMaster')
    return true
}