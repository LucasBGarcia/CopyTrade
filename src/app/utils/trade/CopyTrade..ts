"use server"
import WebSocket from 'ws'
import { InfoAccount, getInfoAccountBalance } from '../connectAPI/infoAccountBalance';
import { calcularValorPorPorcentagem } from '../calculation/percentage';
import { encontrarPrimeiroNaoZero } from '../FindFirstNotZero/FindFirstNotZero';

const BINANCE_WS_URL = 'wss://stream.binance.com:9443/ws'

function buscaValor(symbol: any) {
    return new Promise((resolve, reject) => {
        const wsPrice = new WebSocket(`${BINANCE_WS_URL}/${symbol.toLowerCase()}@ticker`);
        wsPrice.onmessage = (event: any) => {
            const obj = JSON.parse(event.data);
            const currentPrice = parseFloat(obj.a);
            resolve(currentPrice);
        };
        wsPrice.onerror = (error) => {
            reject(error);
        };
    });
}
async function PegaMoedar(apiSecret: string, moeda: string, apiKey: string) {
    const ValorCarteiraCliente = await InfoAccount(apiSecret, apiKey);
    const moedaSplitCliente = moeda.split('USD');
    console.log('ValorCarteiraCliente', ValorCarteiraCliente)
    console.log('moedaSplitCliente', moedaSplitCliente)
    if (ValorCarteiraCliente) {
        const moedaCliente = ValorCarteiraCliente.spot.filter((pares: { asset: string; }) => pares.asset === moedaSplitCliente[0]);
        return (moedaCliente);
    }
}

export async function copyTrade(trade: any, apiSecret: string, apiKey: string, apiName: string, PorcentagemMaster: any) {
    let CompraCliente;
    let VendaCliente;
    const valorAtual = await buscaValor(trade.s);
    if (trade.S == 'BUY') {
        const ValorCarteiraCliente = await getInfoAccountBalance(apiKey, apiSecret);
        CompraCliente = await calcularValorPorPorcentagem(ValorCarteiraCliente, PorcentagemMaster, trade.q, valorAtual, apiName);
    }
    if (trade.S == 'SELL') {
        console.log('ta caindo no sell')
        const posicZero = encontrarPrimeiroNaoZero(trade.q);
        const ValorCarteiraCliente = await PegaMoedar(apiSecret, trade.s, apiKey);
        const valor = Number(ValorCarteiraCliente[0].free);
        const fator = Math.pow(10, await posicZero);
        const arredonda = Math.floor(valor * fator) / fator;
        VendaCliente = arredonda.toFixed(await posicZero);
    }
    const data = {
        symbol: trade.s,
        side: trade.S,
        type: trade.o
    } as { symbol: any; side: any; type: any; quantity?: any, price?: any, timeInForce?: any, stopPrice?: any };;
    if (trade.q && parseFloat(trade.q)) {
        if (CompraCliente) {
            data.quantity = Math.abs(Number(CompraCliente)).toString();
        } else if (VendaCliente) {
            data.quantity = Math.abs(Number(VendaCliente)).toString();
        } else {
            data.quantity = trade.q;
        }
    }
    if (trade.p && parseFloat(trade.p)) {
        data.price = trade.p;
        data.timeInForce = trade.f;
    }
    if (trade.f && trade.f !== "GTC") {
        data.timeInForce = trade.f;
    }
    if (trade.P && parseFloat(trade.P)) {
        data.stopPrice = trade.P;
    }
    return data;
}