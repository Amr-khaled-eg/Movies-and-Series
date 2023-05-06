// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Fetch } from "@/utils/fetch/fetch-data.utils";
type Data = {
  genres: [];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const genresdata = await Fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.API_KEY}`
  );

  res.status(200).json({ genres: genresdata.genres });
}
