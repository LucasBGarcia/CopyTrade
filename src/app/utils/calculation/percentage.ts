"use server"
import { encontrarPrimeiroNaoZero } from "../FindFirstNotZero/FindFirstNotZero";
import { getInfoAccountBalance } from "../connectAPI/infoAccountBalance";
import { cookies } from "next/headers";


export async function tradePorcentageMaster() {
    const cookieStore = cookies()
    const keysMasterSTR = cookieStore.get('master')
    const ValorTotalMasterSpotSTR = cookieStore.get('ValorInicialMaster')
    const ValorTotalMasterSpot = ValorTotalMasterSpotSTR ? JSON.parse(ValorTotalMasterSpotSTR.value) : 0
    if (keysMasterSTR) {
        const keysMasterParse = JSON.parse(keysMasterSTR.value)
        const ValueAfterTrade = await getInfoAccountBalance(keysMasterParse.key, keysMasterParse.secret);
        const valorgasto = ValorTotalMasterSpot - ValueAfterTrade;
        const porcentagem = (valorgasto / ValorTotalMasterSpot) * 100;
        return porcentagem.toFixed(2);
    }
}

export async function calcularValorPorPorcentagem(valorCarteira:any, porcentagem:any, tradeq:any, valorAtual:any, apiName:any) {
    const quantidadeNumber = Number(tradeq);
    const valor = await encontrarPrimeiroNaoZero(Number(quantidadeNumber.toFixed(8)));
    const valorReferentePorcentagem = (porcentagem / 100) * valorCarteira;
    const result = valorReferentePorcentagem / valorAtual;
    console.log('calcula valor por porcentagem valorCARTEIRA', valorCarteira)
    console.log(`${apiName} - Valor gasto: USDT ${valorReferentePorcentagem}`);
    console.log('retorno do calculovvalorPorPorcentagem', result.toFixed(valor))
    return result.toFixed(valor);
}

