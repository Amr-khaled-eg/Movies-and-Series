import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { Fetch } from "@/utils/fetch/fetch-data.utils";
import styles from "@/styles/item.module.css";
import Image from "next/image";
import Rating from "@/components/rating/rating.comopnent";
import CastMember from "@/components/castMemeber/castMember.component";
import SectionHeader from "@/components/sectionHeader/sectionHeader.component";
import CastIcon from "@/public/cast.svg";
import { v4 as uuidV4 } from "uuid";
import Review from "@/components/review/review.component";
import ReviewIcon from "@/public/star.svg";
import Link from "next/link";
import HeartIcon from "@/public/heart.svg";
import CardsSlider from "@/components/cardsSlider/cards-slider.component";
import Head from "next/head";
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
  reviews: any;
  similar: any;
};
const Item = ({ data, cast, reviews, similar }: ItemProps) => {
  const { query } = useRouter();
  return (
    <>
      <Head>
        <title>{data.title || data.name}</title>
        <meta name="description" content={data.overview} />
      </Head>
      <img
        className={styles.backdropImage}
        src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
        alt={data.title || ""}
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
        </div>
        <div>
          <span className={styles.types}>Adult</span>:&emsp;
          <span className={styles.typeValue}>{String(data.adult)}</span>
        </div>
      </section>
      <section>
        <SectionHeader
          header="Cast"
          icon={CastIcon}
          className={styles.sectionHeader}
        />
        <section className={`${styles.grid}`}>
          {cast.slice(0, 9).map((actor: any, i: number) => (
            <CastMember member={actor} key={uuidV4()} />
          ))}
        </section>
      </section>
      <section>
        <SectionHeader
          header="Reviews"
          icon={ReviewIcon}
          className={styles.sectionHeader}
        />

        {reviews.length > 0 ? (
          <section className={`${styles.grid} ${styles.reviews} `}>
            {reviews.slice(0, 3).map((review: any) => (
              <Review
                rating={review.author_details.rating}
                name={review.author}
                content={review.content}
                avatar={review.author_details.avatar_path}
                key={uuidV4()}
              />
            ))}
            <Link href="#">
              <div className={styles.more}>
                <h2>More...</h2>
              </div>
            </Link>
          </section>
        ) : (
          <div>
            <h2 className={`${styles.more} ${styles.noReviews}`}>
              No Reviews Found
            </h2>
          </div>
        )}
      </section>
      <section className={styles.similar}>
        {query.item && (
          <CardsSlider
            cards={similar}
            header="You May Also Like"
            icon={HeartIcon}
            location={query.item[0]}
          />
        )}
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
  const reviewData = await Fetch(
    `https://api.themoviedb.org/3/${query.item[0]}/${query.item[1]}/reviews?api_key=${process.env.API_KEY}`
  );
  const similarData = await Fetch(
    `https://api.themoviedb.org/3/${query.item[0]}/${query.item[1]}/recommendations?api_key=${process.env.API_KEY}`
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
      reviews: reviewData.results,
      similar: similarData.results,
    },
  };
}
