"use server"
import { cookies } from "next/headers";
import { getInfoAccountBalance } from "../connectAPI/infoAccountBalance";
import WebSocket from 'ws'

export async function StartBot() {
    const BINANCE_WS_URL = 'wss://stream.binance.com:9443/ws'
    const cookieStore = cookies()

    return new Promise((resolve, reject) => {
        try {
            const listenKey = cookieStore.get('listen')
            if (listenKey) {
                const listenKeyParse = JSON.parse(listenKey.value)
                const ws = new WebSocket(`${BINANCE_WS_URL}/${listenKeyParse.listenKey}`);
                ws.onmessage = async (event: any) => {
                    const trade = JSON.parse(event.data)
                    resolve(trade); 
                }
            }
        } catch (err) {
            reject(err); 
        }
    });
}
