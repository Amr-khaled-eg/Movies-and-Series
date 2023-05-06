// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Fetch } from "@/utils/fetch/fetch-data.utils";
import { Item } from "../movies";
import { certifications } from "@/public/countries";
type Data = {
  items: Item[];
};
// `https://api.themoviedb.org/3/movie/top_rated?api_key=${
//   process.env.API_KEY
// }&page=${page}&adult=false&${type && "genre=" + type}&${
//   country && "region=" + country
// }`
//api.themoviedb.org/3/discover/movie?api_key=API_KEY&sort_by=popularity.desc&vote_average.gte=8&with_genres=28

const createLink = ({
  page = 1,
  type,
  country,
  year,
  category,
}: {
  [key: string]: any;
}) => {
  const certification =
    certifications[country?.split("_")[0] as keyof typeof certifications];
  console.log(
    `https://api.themoviedb.org/3/discover/tv?api_key=${
      process.env.API_KEY
    }&sort_by=popularity.desc${category ? "&" + category : ""}${
      type ? "&with_genres=" + type : ""
    }${
      country
        ? "&with_original_language=" +
          country.split("_")[1] +
          "&region=" +
          country.split("_")[0]
        : ""
    }${
      year ? "&primary_release_year=" + year : ""
    }&page=${page}&include_adult=false${
      certification
        ? "&certification_country=" +
          country.split("_")[0] +
          "&certification.lte=" +
          certification
        : ""
    }`
  );
  return `https://api.themoviedb.org/3/discover/tv?api_key=${
    process.env.API_KEY
  }&sort_by=popularity.desc${category ? "&" + category : ""}${
    type ? "&with_genres=" + type : ""
  }${
    country
      ? "&with_original_language=" +
        country.split("_")[1] +
        "&region=" +
        country.split("_")[0]
      : ""
  }${
    year ? "&primary_release_year=" + year : ""
  }&page=${page}&include_adult=false${
    certification
      ? "&certification_country=" +
        country.split("_")[0] +
        "&certification.lte=" +
        certification
      : ""
  }`;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data = await Fetch(createLink(req.query));
  res.status(200).json({ items: data.results });
}
