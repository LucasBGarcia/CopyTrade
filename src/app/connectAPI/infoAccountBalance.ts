import crypto from "crypto"
const apiUrl = 'https://api.binance.com/api'
export async function InfoAccountBalance(apiKey:string,apiSecret:string ) {

    try {
        if (!apiSecret) {
            throw new Error('API secret is not defined!');
        }
        const timeRes = await fetch(`https://api.binance.com/api/v3/time`);
        const timeData = await timeRes.json();
        const timestamp = timeData.serverTime;

        const queryString = `timestamp=${timestamp}`;

        const signature = generateSignature(queryString, apiSecret);

        const result = await fetch(`${apiUrl}/v3/account?${queryString}&signature=${signature}`,{
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
function generateSignature(queryString:string, apiSecret:string) {
    return crypto.createHmac('sha256', apiSecret).update(queryString).digest('hex');
}
