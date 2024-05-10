// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
"use server"
import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'
import { cookies } from "next/headers";
import { TakeListenKey } from './TakeListenKey';
import strict from 'assert/strict';
import { InfoAccountBalance, getInfoAccountBalance } from './infoAccountBalance';
import api from '@/app/services/api';

export async function LoadAccountsAPI(keysMaster: string, keysClientes: string) {
    let objeto = []
    let traderMaster = {
        key: '',
        secret: ''
    }
    const cookieStore = cookies()


    let accountsBalance: any = []
    try {

        const splitMaster = keysMaster.split(',')
        traderMaster = {
            key: splitMaster[0],
            secret: splitMaster[1]
        }

        let valoresIniciais;
        // if (splitMaster) {
        //     valoresIniciais = await getInfoAccountBalance(splitMaster[0].trim(), splitMaster[1].trim())
        //     cookieStore.set({
        //         name: "ValorInicialMaster",
        //         value: JSON.stringify(valoresIniciais),
        //         sameSite: 'strict'
        //     })
        // }

        const splitClientes = keysClientes.split(',')

        for (let i = 0; i < splitClientes.length; i += 3) {
            objeto.push({
                name: JSON.stringify(splitClientes[i]),
                key: splitClientes[i + 1],
                secret: splitClientes[i + 2]
            })
        }
        cookieStore.set({
            name: "clients",
            value: JSON.stringify(objeto),
            sameSite: 'strict'
        })
        cookieStore.set({
            name: "master",
            value: JSON.stringify(traderMaster),
            sameSite: 'strict'
        })
        console.log('testetstestes')
        const listenKeyResponse = await api.post('/TakeListenKey',  JSON.stringify(traderMaster))
           console.log('listekey loadAccounnt', listenKeyResponse.data.data.listenKey)
        cookieStore.set({
            name: "listen",
            value: JSON.stringify(listenKeyResponse.data.data.listenKey),
            sameSite: 'strict'
        })

        const accBal = [
            {
            name: 'Bruno',
            balance: '15111'
        },
        {
            name:'Renan',
            balance: '15555'
        }
    ]

        await Promise.all(objeto.map(async (contas) => {
            // const AccountsBalance = await InfoAccountBalance()
            // console.log('accountBalance em LoadAccounts', AccountsBalance)
            accountsBalance = accBal
        }))

        cookieStore.set({
            name: "accountBalances",
            value: JSON.stringify(accountsBalance),
            sameSite: 'strict'
        })
        return accountsBalance

    } catch (e) {
        return NextResponse.json({ e })
    }
}


