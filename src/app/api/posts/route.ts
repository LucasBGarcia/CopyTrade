// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'

type Data = {
  name: string
}

export async function GET(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts`)

  if(!response.ok) throw new Error("problema com o fetch")

    const data = await response.json()

  // res.status(200).json({ name: 'John Doe' })
return NextResponse.json({ data})
}