// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
"use server"
import api from '@/app/services/api';
import { cookies } from "next/headers";
import { NextResponse } from 'next/server';

export async function LoadAccountsAPI(keysMaster: string, keysClientes: string) {
    const cookieStore = cookies();

    console.log('keys recebidas em cima', keysMaster, keysClientes);
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
        console.log(splitMaster[0].trim());
        console.log(splitMaster[1].trim());

        // // if (splitMaster) {
        //     console.log('valores iniciais antes');
        //     const retValoresIniciaisMaster = await returnValoresIniciaisMaster(splitMaster[0].trim(), splitMaster[1].trim());
        //     console.log('Valores iniciais:', retValoresIniciaisMaster);
        //     cookieStore.set({
        //         name: "ValorInicialMaster",
        //         value: JSON.stringify(retValoresIniciaisMaster),
        //         sameSite: 'strict'
        //     });
        // // }

        const splitClientes = keysClientes.split(',');

        for (let i = 0; i < splitClientes.length; i += 3) {
            objeto.push({
                name: JSON.stringify(splitClientes[i]),
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

        // const retListenKey = await returnListenKey(traderMaster.key);
        // console.log(retListenKey);
        // cookieStore.set({
        //     name: "listen",
        //     value: JSON.stringify(retListenKey.listenKey),
        //     sameSite: 'strict'
        // });

        // const retAccountBalances = await returnBalances(objeto);
        // console.log('retAccountBalances', retAccountBalances);
        // cookieStore.set({
        //     name: "accountBalances",
        //     value: JSON.stringify(retAccountBalances),
        //     sameSite: 'strict'
        // });
        const data = [
            { name: '"Renan teste"', balance: '"365.90153910"' },
            { name: '"Bruno"', balance: '"565.54007698"' }
        ]
        return JSON.stringify(data);
    } catch (e) {
        console.error('Error:', e);
        return NextResponse.json({ error: e });
    }
}

async function returnListenKey(tradermasterKey: string) {
    try {
        console.log('listen key');
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
        console.log('Valores iniciais:', valoresIniciais.data);
        return valoresIniciais.data;
    } catch (err) {
        console.error(err);
    }
}

async function returnBalances(objeto: any) {
    try {
        console.log('accpimts ballance');
        const AccountsBalance = await api.post('/get-All-account-balance-usdt', {
            contasSTR: objeto
        });
        console.log(AccountsBalance.data);
        return AccountsBalance.data;
    } catch (err) {
        console.error(err);
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

//     console.log('keys recebidas em cima', keysMaster, keysClientes)
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
//         console.log(splitMaster[0].trim())
//         console.log(splitMaster[1].trim())

//         if (splitMaster) {

//             console.log('valores iniciais antes')
//             const retValoresIniciaisMaster = await returnValoresIniciaisMaster(splitMaster[0].trim(), splitMaster[1].trim())
//             console.log('Valores iniciais:', retValoresIniciaisMaster);
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
//             //     console.log('Valores iniciais:', valoresIniciais.data);
//             //     cookieStore.set({
//             //         name: "ValorInicialMaster",
//             //         value: JSON.stringify(valoresIniciais.data),
//             //         sameSite: 'strict'
//             //     })
//             // } catch (err) {
//             //     console.log(err)
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
//         console.log(retListenKey)
//         cookieStore.set({
//             name: "listen",
//             value: JSON.stringify(retListenKey.listenKey),
//             sameSite: 'strict'
//         })
//         // try {
//         //     console.log('listen key')

//         //     const listenKey = await api.post('/take-listen-key', {
//         //         apiKey: traderMaster.key
//         //     })
//         //     cookieStore.set({
//         //         name: "listen",
//         //         value: JSON.stringify(listenKey.data.listenKey),
//         //         sameSite: 'strict'
//         //     })
//         // } catch (err) {
//         //     console.log(err)
//         // }

//         const retAccountBalances = await returnBalances(objeto)
//         console.log('retAccountBalances', returnBalances)
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
//         //     console.log('accpimts ballance')
//         //     cookieStore.set({
//         //         name: "accountBalances",
//         //         value: JSON.stringify(AccountsBalance.data),
//         //         sameSite: 'strict'
//         //     })
//         //     return AccountsBalance.data
//         // } catch (err) {
//         //     console.log(err)
//         // }

//     } catch (e) {
//         return NextResponse.json({ e })
//     }
// }


// async function returnListenKey(tradermasterKey: string) {

//     try {
//         console.log('listen key')

//         const listenKey = await api.post('/take-listen-key', {
//             apiKey: tradermasterKey
//         })
//         return listenKey.data
//     } catch (err) {
//         console.log(err)
//     }


// }


// async function returnValoresIniciaisMaster(tradermasterKey: string, tradermasterSecret: string) {
//     try {
//         const valoresIniciais = await api.post('/get-account-balance-usdt', {
//             apiKey: tradermasterKey,
//             apiSecret: tradermasterSecret,
//         });
//         console.log('Valores iniciais:', valoresIniciais.data);
//         return valoresIniciais.data
//     } catch (err) {
//         console.log(err)
//     }
// }


// async function returnBalances(objeto: any) {
//     try {
//         console.log('accpimts ballance')
//         const AccountsBalance = await api.post('/get-All-account-balance-usdt', {
//             contasSTR: objeto
//         })
//         console.log(AccountsBalance.data)
//         return AccountsBalance.data
//     } catch (err) {
//         console.log(err)
//     }

// }