import { GetServerSidePropsContext } from "next";
import { Fetch } from "@/utils/fetch/fetch-data.utils";
import styles from "@/styles/item.module.css";
import Image from "next/image";
import Rating from "@/components/rating/rating.comopnent";
import CastMember from "@/components/castMemeber/castMember.component";
import { v4 as uuidV4 } from "uuid";
type ItemData = {
  vote_average: number;
  name?: string;
  title?: string;
  release_date?: string;
  first_air_date?: string;
  overview: string;
  original_language: string;
  adult: boolean;
  genres: any;
  production_countries: any;
  backdrop_path: string;
};
type ItemProps = {
  data: ItemData;
  cast: any;
};
const Item = ({ data, cast }: ItemProps) => {
  return (
    <>
      <Image
        className={styles.backdropImage}
        src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
        alt={data.title || ""}
        width={1900}
        height={1000}
      />
      <div className={styles.overlay}></div>
      <section className={styles.mainSection}>
        <Rating rating={data.vote_average} size="l" className={styles.rating} />
        <div>
          <h2>
            {data.title}
            <span className={styles.release_year}>
              {data.release_date?.split("-")[0]}
            </span>
          </h2>
          <p className={styles.story}>{data.overview}</p>
        </div>
      </section>
      <section className={styles.info}>
        <div>
          <span className={styles.types}>Country</span>:&emsp;
          <span className={styles.typeValue}>
            {data.production_countries.map((country: any, i: number) =>
              i !== 0 ? "," + country.iso_3166_1 : country.iso_3166_1
            )}
          </span>
        </div>
        <div>
          <span className={styles.types}>Gener</span>:&emsp;
          <span className={styles.typeValue}>
            {data.genres.map((gener: any, i: number) =>
              i !== 0 ? "," + gener.name : gener.name
            )}
          </span>
        </div>
        <div>
          <span className={styles.types}>Language</span>:&emsp;
          <span className={styles.typeValue}>{data.original_language}</span>
        </div>{" "}
        <div>
          <span className={styles.types}>Adult</span>:&emsp;
          <span className={styles.typeValue}>{String(data.adult)}</span>
        </div>
      </section>
      <section>
        <h1 className={styles.castHeader}>Cast</h1>
        <section className={styles.cast}>
          {cast.slice(0, 9).map((actor: any, i: number) => (
            <CastMember member={actor} key={uuidV4()} />
          ))}
        </section>
      </section>
    </>
  );
};

export default Item;
export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  if (!query.item) return;
  const itemData = await Fetch(
    `https://api.themoviedb.org/3/${query.item[0]}/${query.item[1]}?api_key=${process.env.API_KEY}`
  );
  const castData = await Fetch(
    `https://api.themoviedb.org/3/${query.item[0]}/${query.item[1]}/credits?api_key=${process.env.API_KEY}`
  );
  const {
    vote_average,
    name,
    title,
    release_date,
    first_air_date,
    overview,
    original_language,
    adult,
    genres,
    production_countries,
    backdrop_path,
  } = itemData;
  return {
    props: {
      data: {
        vote_average,
        title: title ? title : name,
        release_date: release_date ? release_date : first_air_date,
        overview,
        original_language,
        adult,
        genres,
        production_countries,
        backdrop_path,
      },
      cast: castData.cast,
    },
  };
}
