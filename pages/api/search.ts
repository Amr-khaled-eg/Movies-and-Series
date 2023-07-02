// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Fetch } from "@/utils/fetch/fetch-data.utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { searchTirm, type = "movie" },
  } = req;
  try {
    const searchResult = await Fetch(
      `https://api.themoviedb.org/3/search/${type}?api_key=${process.env.API_KEY}&query=${searchTirm}`
    );
    res.status(200).json({
      data: searchResult.results.map((item: any) => ({
        id: item.id,
        poster_path: item.poster_path,
        title: item.title || item.name,
        release_date: item.release_date || item.first_air_date,
      })),
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
