import { nanoid } from 'nanoid';

let urls = {};

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { url } = req.body;
    const id = nanoid(6);
    urls[id] = url;
    const shortUrl = `${process.env.BASE_URL}/${id}`;
    res.status(200).json({ shortUrl });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
