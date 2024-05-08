'use server'
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { tradePorcentageMaster } from "../calculation/percentage";
import { copyTrade } from "./CopyTrade.";

export async function Trade(trade: any) {
    const cookieStore = cookies()
    const oldOrdersStringfy = cookieStore.get('oldOrders')
    let oldOrders;
    let accountsSTR = cookieStore.get('clients')
    let accountsParse = accountsSTR ? JSON.parse(accountsSTR.value) : [{}]

    try {
        if (oldOrdersStringfy) {
            console.log("já existe oldOrders")
            oldOrders = JSON.parse(oldOrdersStringfy.value)
        } else {
            console.log("ta caindo no else oldOrders")
            oldOrders = []
        }
        console.log('Trade em trade', trade)
        console.log('oldOrders em oldOrders', oldOrders)

        if (trade.e === 'executionReport') {

            const verifyOld = oldOrders.filter((old: any) => old === trade.i)


            console.log('verifyOld', verifyOld)
            if (trade.o === 'LIMIT' && trade.x === 'CANCELED') {
                oldOrders.push(trade.i)

                cookieStore.set('oldOrders', JSON.stringify(oldOrders))
            }

            if (verifyOld.length == 0) {
                oldOrders.push(trade.i)
                const porcentagemMaster = await tradePorcentageMaster()
                await handleNewOrders(trade, accountsParse, porcentagemMaster)
                cookieStore.set('oldOrders', JSON.stringify(oldOrders))
            }
        }

    } catch (err) {
        return NextResponse.json({ err })
    }
}

async function handleNewOrders(trade: any, accounts: any, PorcentagemMaster: any) {
    const pr = accounts.map(async (acc: any) => {
        console.log('acc enviada', acc)
        const data = await copyTrade(trade, acc.secret, acc.key, acc.name, PorcentagemMaster);
        console.log('data recebida', data)
        // return api.newOrder(data, acc.apiKey, acc.apiSecret, acc.Name);
    });

    // await handlePromise(pr);
}