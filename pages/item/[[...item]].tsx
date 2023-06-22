import { GetServerSidePropsContext } from "next";
import { Fetch } from "@/utils/fetch/fetch-data.utils";
import styles from "@/styles/item.module.css";
import Image from "next/image";
import Rating from "@/components/rating/rating.comopnent";
const Item = ({ data }: any) => {
  return (
    <>
      <Image
        className={styles.backdropImage}
        src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
        alt={data.title}
        width={1900}
        height={1000}
      />
      <div className={styles.overlay}></div>
      <section className={styles.mainSection}>
        <Rating rating={data.vote_average} size="l" className={styles.rating} />
        <div>
          <h2>
            {data.title || data.name}
            <span className={styles.release_year}>
              {data.release_date?.split("-")[0] ||
                data.first_air_date?.split("-")[0]}
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
    </>
  );
};

export default Item;
export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  if (!query.item) return;
  const data = await Fetch(
    `https://api.themoviedb.org/3/${query.item[0]}/${query.item[1]}?api_key=${process.env.API_KEY}`
  );

  return {
    props: {
      data: data,
    },
  };
}
