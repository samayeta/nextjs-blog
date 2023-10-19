import type { NextApiRequest, NextApiResponse } from 'next'
 
export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    const character = await fetch(`https://rickandmortyapi.com/api/character?page=${req.query.curPage}`).then(res => res.json());
    res.status(200).json({character});
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' });
  }
}