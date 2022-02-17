import type { NextApiRequest, NextApiResponse } from 'next'
import { movies } from '../../../lib/db'

type Data = {
  ok: boolean
  movie: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'GET') {
    const randomIndex = Math.floor(Math.random() * movies.length)

    return res.status(200).json({
      ok: true,
      movie: movies[randomIndex].toLowerCase(),
    })
  }
}
