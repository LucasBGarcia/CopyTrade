"use server"
import { cookies } from "next/headers";
import { getInfoAccountBalance } from "../connectAPI/infoAccountBalance";
import WebSocket from 'ws'
import api from "@/app/services/api";

export async function StartBot(AtivaBot: boolean) {
    const cookieStore = cookies()
    return new Promise(async (resolve, reject) => {
        const listenKey = cookieStore.get('listen')
        try {
            
            if (listenKey) {
                const start = await api.post('start-bot', {
                    listenKey: listenKey.value,
                    AtivaBot: AtivaBot
                })
                console.log('start', start.data)
                resolve(start.data)
                // return start.data
            }
        } catch (err) {
            console.log(err)
            reject(err)
            // return ("Bot pausado")
        }
    })

}


// const BINANCE_WS_URL = 'wss://stream.binance.com:9443/ws'
// const cookieStore = cookies()

// return new Promise((resolve, reject) => {
//     try {
//         const listenKey = cookieStore.get('listen')
//         if (listenKey) {
//             const listenKeyParse = JSON.parse(listenKey.value)
//             const ws = new WebSocket(`${BINANCE_WS_URL}/${listenKeyParse.listenKey}`);
//             ws.onmessage = async (event: any) => {
//                 const trade = JSON.parse(event.data)
//                 resolve(trade);
//             }
//         }
//     } catch (err) {
//         reject(err);
//     }
// });}
