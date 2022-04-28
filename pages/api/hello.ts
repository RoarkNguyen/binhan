// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

type textRandomData = {
  textRandom: string
}

export function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: 'John Doe' })
}

export function getTextRandom(
  req: number,
  res: NextApiResponse<textRandomData>
) {
  res.status(200).json({ textRandom: 'This is awesome' })
}
