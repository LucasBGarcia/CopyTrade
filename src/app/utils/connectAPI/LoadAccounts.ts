// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
"use server"
import api from '@/app/services/api';
import { cookies } from "next/headers";
import { NextResponse } from 'next/server';

export async function LoadAccountsAPI(keysMaster: string, keysClientes: string) {
    console.log('keys recebidas em cima', keysMaster, keysClientes)
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
        console.log(splitMaster[0].trim())
        console.log(splitMaster[1].trim())

        // if (splitMaster) {
            console.log('valores iniciais antes')
            try {
                const valoresIniciais = await api.post('/get-account-balance-usdt', {
                    apiKey: '4SYTGW0z943oiusiWL0NU89FWBkNAT9Fh7YaLSrhvmxeowQV8slnOVk5Ue5Qoxxo',
                    apiSecret: 'bbFwPoARmSK6Pq3L23NRzAY6Fji9BkjjSAuIy82bl43BZ8vwM2UE5hJmncBvZBiP',
                   
                    // apiKey: splitMaster[0].trim(),
                    // apiSecret: splitMaster[1].trim(),
                });
                console.log('Valores iniciais:', valoresIniciais.data);
                cookieStore.set({
                    name: "ValorInicialMaster",
                    value: JSON.stringify(valoresIniciais.data),
                    sameSite: 'strict'
                })
            } catch (err) {
                console.log(err)
            }
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
        try {
            console.log('listen key')

            const listenKey = await api.post('/take-listen-key', {
                apiKey: traderMaster.key
            })
            cookieStore.set({
                name: "listen",
                value: JSON.stringify(listenKey.data.listenKey),
                sameSite: 'strict'
            })
        } catch (err) {
            console.log(err)
        }
        // const listenKey = await TakeListenKey(traderMaster.key)

        // await Promise.all(objeto.map(async (contas) => {
        //     const AccountsBalance = await InfoAccountBalance()
        //     console.log('accountBalance em LoadAccounts', AccountsBalance)
        //     accountsBalance = AccountsBalance
        // }))

        try {
            console.log('accpimts ballance')
            const AccountsBalance = await api.post('/get-All-account-balance-usdt', {
                contasSTR: objeto
            })
            cookieStore.set({
                name: "accountBalances",
                value: JSON.stringify(AccountsBalance.data),
                sameSite: 'strict'
            })
            return AccountsBalance.data
        } catch (err) {
            console.log(err)
        }
        console.log('keys recebidas em baixo', keysMaster, keysClientes)

    } catch (e) {
        return NextResponse.json({ e })
    }
}

