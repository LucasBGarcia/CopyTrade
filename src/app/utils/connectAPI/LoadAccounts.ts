// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
"use server"
import api from '@/app/services/api';
import { cookies } from "next/headers";
import { NextResponse } from 'next/server';

export async function LoadAccountsAPI(keysMaster: string, keysClientes: string) {
    const cookieStore = cookies();

    let objeto = [];
    let traderMaster = {
        key: '',
        secret: ''
    };

    try {
        const splitMaster = keysMaster.split(',');
        traderMaster = {
            key: splitMaster[0],
            secret: splitMaster[1]
        };

        if (splitMaster) {
            // returnValoresIniciaisMaster(splitMaster[0].trim(), splitMaster[1].trim())
            //     .then(data => {
            //         console.log('Data:', data);
            //         cookieStore.set({
            //             name: "ValorInicialMaster",
            //             value: JSON.stringify(data),
            //             sameSite: 'strict'
            //         });
            //     })
            //     .catch(err => {
            //         console.error('Error:', err);
            //     });
            try {
                const retValoresIniciaisMaster = await returnValoresIniciaisMaster(splitMaster[0].trim(), splitMaster[1].trim());
                cookieStore.set({
                    name: "ValorInicialMaster",
                    value: JSON.stringify(retValoresIniciaisMaster),
                    sameSite: 'strict'
                });

            } catch (err) {
                console.log('erro aqui no valores iniciais', err)
            }
        }

        const splitClientes = keysClientes.split(',');

        for (let i = 0; i < splitClientes.length; i += 3) {
            objeto.push({
                name: splitClientes[i],
                key: splitClientes[i + 1],
                secret: splitClientes[i + 2]
            });
        }

        cookieStore.set({
            name: "clients",
            value: JSON.stringify(objeto),
            sameSite: 'strict'
        });
        cookieStore.set({
            name: "master",
            value: JSON.stringify(traderMaster),
            sameSite: 'strict'
        });
        try {
            const retListenKey = await returnListenKey(traderMaster.key);
            cookieStore.set({
                name: "listen",
                value: retListenKey.listenKey,
                sameSite: 'strict'
            });
        } catch (err) {
            console.log('erro aqui no return listen key', err)
        }

        // returnBalances(objeto)
        //     .then(data => {
        //         cookieStore.set({
        //             name: "accountBalances",
        //             value: JSON.stringify(data),
        //             sameSite: 'strict'
        //         });
        //         return JSON.stringify(data);
        //     })
        //     .catch(err => {
        //         console.log(err)
        //     })

        try {
            const retAccountBalances = await returnBalances(objeto);
            cookieStore.set({
                name: "accountBalances",
                value: JSON.stringify(retAccountBalances),
                sameSite: 'strict'
            });

            return JSON.stringify(retAccountBalances);
        } catch (err) {
            console.log('erro aqui account balance', err)
        }
    } catch (e) {
        console.error('Error:', e);
        return NextResponse.json({ error: e });
    }
}

async function returnListenKey(tradermasterKey: string) {
    try {
        const listenKey = await api.post('/take-listen-key', {
            apiKey: tradermasterKey
        });
        return listenKey.data;
    } catch (err) {
        console.error(err);
    }
}

async function returnValoresIniciaisMaster(tradermasterKey: string, tradermasterSecret: string) {
    try {
        const valoresIniciais = await api.post('/get-account-balance-usdt', {
            apiKey: tradermasterKey,
            apiSecret: tradermasterSecret,
        });
        return valoresIniciais.data;
    } catch (err) {
        console.log('erro aqui', err);

        return null
    }
}

export async function returnBalancesToHome() {
    const cookieStore = cookies()
    const clientsSTR = cookieStore.get('clients')
    if (clientsSTR) {
        const clientsParse = JSON.parse(clientsSTR.value)
        const ret = await returnBalances(clientsParse)

        return ret
    } else {
        return null
    }
}

async function returnBalances(objeto: any) {
    try {
        // console.log('objeto', objeto)
        const AccountsBalance = await api.post('/get-All-account-balance-usdt', {
            contasSTR: objeto
        });
        console.log('RETORNO ACCOUNTS BALANCE', AccountsBalance.data)
        return AccountsBalance.data;
    } catch (err) {
        console.log('erro aqui', err);
        return null
    }
}




// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// "use server"
// import api from '@/app/services/api';
// import { cookies } from "next/headers";
// import { NextResponse } from 'next/server';
// const cookieStore = cookies()

// export async function LoadAccountsAPI(keysMaster: string, keysClientes: string) {
//     const cookieStore = cookies()

//     let objeto = []
//     let traderMaster = {
//         key: '',
//         secret: ''
//     }


//     let accountsBalance: any = []
//     try {

//         const splitMaster = keysMaster.split(',')
//         traderMaster = {
//             key: splitMaster[0],
//             secret: splitMaster[1]
//         }

//         if (splitMaster) {

//             const retValoresIniciaisMaster = await returnValoresIniciaisMaster(splitMaster[0].trim(), splitMaster[1].trim())
//             cookieStore.set({
//                 name: "ValorInicialMaster",
//                 value: JSON.stringify(retValoresIniciaisMaster),
//                 sameSite: 'strict'
//             })
//             // try {
//             //     const valoresIniciais = await api.post('/get-account-balance-usdt', {
//             //         // apiKey: '4SYTGW0z943oiusiWL0NU89FWBkNAT9Fh7YaLSrhvmxeowQV8slnOVk5Ue5Qoxxo',
//             //         // apiSecret: 'bbFwPoARmSK6Pq3L23NRzAY6Fji9BkjjSAuIy82bl43BZ8vwM2UE5hJmncBvZBiP',

//             //         apiKey: splitMaster[0].trim(),
//             //         apiSecret: splitMaster[1].trim(),
//             //     });
//             //     cookieStore.set({
//             //         name: "ValorInicialMaster",
//             //         value: JSON.stringify(valoresIniciais.data),
//             //         sameSite: 'strict'
//             //     })
//             // } catch (err) {
//             // }
//         }

//         const splitClientes = keysClientes.split(',')

//         for (let i = 0; i < splitClientes.length; i += 3) {
//             objeto.push({
//                 name: JSON.stringify(splitClientes[i]),
//                 key: splitClientes[i + 1],
//                 secret: splitClientes[i + 2]
//             })
//         }
//         cookieStore.set({
//             name: "clients",
//             value: JSON.stringify(objeto),
//             sameSite: 'strict'
//         })
//         cookieStore.set({
//             name: "master",
//             value: JSON.stringify(traderMaster),
//             sameSite: 'strict'
//         })
//         const retListenKey = await returnListenKey(traderMaster.key)
//         cookieStore.set({
//             name: "listen",
//             value: JSON.stringify(retListenKey.listenKey),
//             sameSite: 'strict'
//         })
//         // try {

//         //     const listenKey = await api.post('/take-listen-key', {
//         //         apiKey: traderMaster.key
//         //     })
//         //     cookieStore.set({
//         //         name: "listen",
//         //         value: JSON.stringify(listenKey.data.listenKey),
//         //         sameSite: 'strict'
//         //     })
//         // } catch (err) {
//         // }

//         const retAccountBalances = await returnBalances(objeto)
//         cookieStore.set({
//             name: "accountBalances",
//             value: JSON.stringify(retAccountBalances),
//             sameSite: 'strict'
//         })
//         return JSON.stringify(retAccountBalances)
//         // try {
//         //     const AccountsBalance = await api.post('/get-All-account-balance-usdt', {
//         //         contasSTR: objeto
//         //     })
//         //     cookieStore.set({
//         //         name: "accountBalances",
//         //         value: JSON.stringify(AccountsBalance.data),
//         //         sameSite: 'strict'
//         //     })
//         //     return AccountsBalance.data
//         // } catch (err) {
//         // }

//     } catch (e) {
//         return NextResponse.json({ e })
//     }
// }


// async function returnListenKey(tradermasterKey: string) {

//     try {

//         const listenKey = await api.post('/take-listen-key', {
//             apiKey: tradermasterKey
//         })
//         return listenKey.data
//     } catch (err) {
//     }


// }


// async function returnValoresIniciaisMaster(tradermasterKey: string, tradermasterSecret: string) {
//     try {
//         const valoresIniciais = await api.post('/get-account-balance-usdt', {
//             apiKey: tradermasterKey,
//             apiSecret: tradermasterSecret,
//         });
//         return valoresIniciais.data
//     } catch (err) {
//     }
// }


// async function returnBalances(objeto: any) {
//     try {
//         const AccountsBalance = await api.post('/get-All-account-balance-usdt', {
//             contasSTR: objeto
//         })
//         return AccountsBalance.data
//     } catch (err) {
//     }

// }