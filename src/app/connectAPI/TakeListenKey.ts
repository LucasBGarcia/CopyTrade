// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
"use server"
const apiUrl = 'https://api.binance.com/api'
export async function TakeListenKey(apiKey: string) {
    try {
        if (!apiKey)
            throw new Error('Preencha corretamente sua API KEY e SECRET KEY');

        try {
            const result = await fetch(`${apiUrl}/v3/userDataStream`, {
                method: 'POST',
                headers: {
                    'X-MBX-APIKEY': apiKey
                },
            });
            const data = await result.json();
            return data;
        } catch (err) {
            console.error('Erro ao fazer a requisição:', err);
            return { error: 'Erro ao fazer a requisição' };
        }
    } catch (e) {
        console.error('Erro:', e);
        return { error: 'Erro interno' };
    }
}

