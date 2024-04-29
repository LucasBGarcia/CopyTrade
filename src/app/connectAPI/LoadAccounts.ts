// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
"use server"
import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'
import { cookies } from "next/headers";
import { TakeListenKey } from './TakeListenKey';

export async function LoadAccountsAPI(keysMaster: string, keysClientes: string) {
    let objeto = []
    let traderMaster = {
        key:'',
        secret:''
    }
        try {

        const splitMaster = keysMaster.split(',')
        traderMaster= {
            key: splitMaster[0],
            secret: splitMaster[1]
        }
        const splitClientes = keysClientes.split(',')

        for (let i = 0; i < splitClientes.length; i += 3) {
            objeto.push({ 
                name: JSON.stringify(splitClientes[i]),
                key: splitClientes[i+1],
                secret:splitClientes[i+2]
             })
        }
        const cookieStore = cookies()
        cookieStore.set("clients", JSON.stringify(objeto))
        cookieStore.set("master", JSON.stringify(traderMaster))
       const listenKey= await TakeListenKey(traderMaster.key)
        console.log('retorno do listen key', listenKey)

    } catch (e) {
        return NextResponse.json({ e })
    }

    // cookieStore.delete('2')

    // const valor = [
    //  {
    // TRADER0_API_KEY: "4SYTGW0z943oiusiWL0NU89FWBkNAT9Fh7YaLSrhvmxeowQV8slnOVk5Ue5Qoxxo",
    // TRADER0_API_SECRET: "bbFwPoARmSK6Pq3L23NRzAY6Fji9BkjjSAuIy82bl43BZ8vwM2UE5hJmncBvZBiP",
    //  },
    //  {
    // TRADER1_NAME: "Bruno",
    // TRADER1_API_KEY: "LcDt9GIHnSEoCILPT86elqsODFxzAsRm9EK2SInAX0qZrzAY0boAks579ePpxSsy",
    // TRADER1_API_SECRET: "eQaoMJdUfjXDHwDT3NT17ESKBK2dh2aoc9EIhjpNV23QjXlJE3GanPmnY0SBrlL5",
    // TRADER1_FUTURES: "false",

    // TRADER2_NAME: "Renan",
    // TRADER2_API_KEY: "UmCrxrr94VHoni23Th0grNmaJhieJeaWieqjJW8ZJ84SlS6bxzmvQydHy104voqE",
    // TRADER2_API_SECRET: "PfVKPCAtu53EpuduqEkrF1NbBLq5onpllIM7ZtyZyTSCqMFwcanExRoZtLEVzIdD",
    // TRADER2_FUTURES: "false"
    //  }
    // ]
    // const valorString = JSON.stringify(valor)
    // console.log(valorString)
    // cookieStore.set({
    //     name: "Lucas",
    //     value: valorString
    // })


    // const getCookies = cookieStore.get('Lucas')
    // const response = await fetch(`https://jsonplaceholder.typicode.com/todos/1`)

    // if (!response.ok) throw new Error("problema com o fetch")

    // const data = await response.json()
    // console.log(getCookies)
    // // res.status(200).json({ name: 'John Doe' })
}

