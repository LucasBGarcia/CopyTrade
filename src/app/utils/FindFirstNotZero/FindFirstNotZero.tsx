"use server"
export async function encontrarPrimeiroNaoZero(numero: number) {
    const string = numero.toFixed(8).toString();
    console.log('numero', numero)
    console.log('string', string)
    let valorSplit = string.split('.');
    console.log('valorSplit', valorSplit)
    let valor = valorSplit[1] ? valorSplit[1]: valorSplit[0] 
    let contador = 0;
    console.log('valor',valor)
    for (let i = valor.length - 1; i >= 0; i--) {
        contador++;
        if (valor[i] !== '0') {
            console.log('retorno de encontrar primeiro nao zero', valor.length - contador + 1)
            return valor.length - contador + 1;
        }
    }
    console.log("retorno do primeiro nao zero retorno 0")
    return 0; // Retorna 0 se todos os dígitos forem zeros
}