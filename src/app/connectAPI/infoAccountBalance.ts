"use server"
import crypto from "crypto"
const apiUrl = 'https://api.binance.com/api'
import { cookies } from "next/headers";


export async function InfoAccountBalance() {
    const cookieStore = cookies()
    const contas = cookieStore.get('clients')

    let accountsBalance: object[] = []
    if (contas) {
        const contasParse = JSON.parse(contas.value)
        console.log(contasParse)
        await Promise.all(contasParse.map(async (contas: any) => {
            const AccountsBalance = await getInfoAccountBalance(contas.key.trim(), contas.secret.trim())
            accountsBalance.push({
                name: contas.name,
                balance: AccountsBalance
            })
        }))
        console.log('accountBalance em infoAccountBalance', accountsBalance)
        console.log('contas em infoAccountBalance', contas)

        return accountsBalance
    } else {
        return false
    }
}

async function getInfoAccountBalance(apiKey: string, apiSecret: string) {
    try {
        if (!apiSecret) {
            throw new Error('API secret is not defined!');
        }
        const timeRes = await fetch(`https://api.binance.com/api/v3/time`);
        const timeData = await timeRes.json();
        const timestamp = timeData.serverTime;

        const queryString = `timestamp=${timestamp}`;

        const signature = generateSignature(queryString, apiSecret);

        const result = await fetch(`${apiUrl}/v3/account?${queryString}&signature=${signature}`, {
            method: 'GET',
            headers: {
                'X-MBX-APIKEY': apiKey
            },
        });
        const res = await result.json()
        const filterBalance = res.balances.filter((balance: { asset: string; }) => balance.asset === 'USDT')

        return filterBalance[0].free
    } catch (err) {
        console.error(err)
    }
}

function generateSignature(queryString: string, apiSecret: string) {
    return crypto.createHmac('sha256', apiSecret).update(queryString).digest('hex');
}
