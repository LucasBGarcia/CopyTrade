// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
"use server"
import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'
import { cookies } from "next/headers";
import { TakeListenKey } from './TakeListenKey';
import strict from 'assert/strict';
import { InfoAccountBalance } from './infoAccountBalance';

export async function LoadAccountsAPI(keysMaster: string, keysClientes: string) {
    let objeto = []
    let traderMaster = {
        key: '',
        secret: ''
    }

    let accountsBalance: any = []
    try {

        const splitMaster = keysMaster.split(',')
        traderMaster = {
            key: splitMaster[0],
            secret: splitMaster[1]
        }
        const splitClientes = keysClientes.split(',')

        for (let i = 0; i < splitClientes.length; i += 3) {
            objeto.push({
                name: JSON.stringify(splitClientes[i]),
                key: splitClientes[i + 1],
                secret: splitClientes[i + 2]
            })
        }
        const cookieStore = cookies()
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
        const listenKey = await TakeListenKey(traderMaster.key)
        cookieStore.set({
            name: "listen",
            value: JSON.stringify(listenKey),
            sameSite: 'strict'
        })

        await Promise.all(objeto.map(async (contas) => {
            const AccountsBalance = await InfoAccountBalance()
            console.log('accountBalance em LoadAccounts', AccountsBalance)
            accountsBalance = AccountsBalance
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

