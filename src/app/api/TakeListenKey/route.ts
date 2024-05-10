import { NextResponse } from 'next/server'
import { cookies } from 'next/headers';


type BinanceUserData = {
    message: any;
};

export async function POST(req: Request) {
    const apiUrl = 'https://api.binance.com/api';
    const keysMaster = await req.json()
    try {
    const key = keysMaster.key;
    if (!key) {
        return NextResponse.json({ message: 'Missing API KEY and SECRET KEY' },{status:400});
    }
    const result = await fetch(`${apiUrl}/v3/userDataStream`, {
        method: 'POST',
        headers: {
            'X-MBX-APIKEY': key,
        },
    });

    if (!result.ok) {
        throw new Error(`API request failed with status ${result.status}`);
    }
    const data = await result.json();
    return NextResponse.json({ data })
    } catch (error) {
        console.log('Error fetching data:', error);
        return {
            body: JSON.stringify({ message: 'Error fetching data' }),
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }
}