// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'
import { cookies } from "next/headers";
import { json } from 'stream/consumers';

type Data = {
    name: string
}
export async function GET(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    const cookiesStore = cookies()

    const keys = cookiesStore.get("master")
    if (keys) {
        const keysParse = JSON.parse(keys.value)
        console.log(keysParse)
        // const data = await keysParse.json()
    
        // res.status(200).json({ name: 'John Doe' })
        return NextResponse.json({ keysParse })
    }

    const response = await fetch(`https://jsonplaceholder.typicode.com/posts`)

    if (!response.ok) throw new Error("problema com o fetch")

}