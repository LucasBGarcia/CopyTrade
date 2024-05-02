// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'
import { cookies } from "next/headers";
import { json } from 'stream/consumers';

type Data = {
    name: string
}

export async function POST(req: NextApiRequest, res: NextApiResponse<Data>) {
    try{
        const { keys } = req.body
        // const {keys} = req.body
        console.log('keys', keys)
        console.log('method', req.body)
    }catch(e){
        return NextResponse.json({e})
    }
 
    const cookieStore = cookies()
  
    return NextResponse.json(req)
}