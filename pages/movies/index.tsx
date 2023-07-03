// import CardsSlider from "@/components/cardsSlider/cards-slider.component";
import { FetchMyAPI } from "@/utils/fetch/fetch-data.utils";
import dynamic from "next/dynamic";
import Trending from "@/public/trending.svg";
import TopRated from "@/public/top-rated.svg";
import Popular from "@/public/popular.svg";
import { CardData } from "@/components/card/card.component";
import MainSlider from "@/components/main-slider/main-slider.component";
import { Categories } from "@/components/filter/fiilter.comoponent";
import styles from "@/styles/home.module.css";
import Head from "next/head";
const CardsSlider = dynamic(
  () => import("@/components/cardsSlider/cards-slider.component")
);
export type Item = {
  [key: string]: any;
  overview: string;
} & CardData;

type MoviesProps = {
  topRated: [Item];
  korean: [Item];
  trending: [Item];
};

export default function Movies({ topRated, trending, korean }: MoviesProps) {
  return (
    <>
      <Head>
        <title>Movies</title>
        <meta
          name="description"
          content="this page containes top-rated movies and trending movies and best korean movies"
        />
      </Head>
      <section className={styles.mainSection}>
        <MainSlider
          items={[topRated[0], topRated[1], trending[0], korean[0]]}
        />
        <CardsSlider
          header="Top-Rated"
          cards={topRated}
          icon={TopRated}
          to={`/movies/filtered?category=${Categories.TOP_RATED}`}
          location="movie"
        />
        <CardsSlider
          header="Trending"
          cards={trending}
          icon={Trending}
          location="movie"
          to={`/movies/filtered?category=${Categories.TRENDING}`}
        />
        <CardsSlider
          header="Best Korean"
          cards={korean}
          icon={Popular}
          location="movie"
          to={`/movies/filtered?category=${Categories.TOP_RATED}&country=KR_ko`}
        />
      </section>
    </>
  );
}
export async function getServerSideProps() {
  const topRatedMovies = await FetchMyAPI(
    `/movies?category=${Categories.TOP_RATED}`
  );
  const trendingMovies = await FetchMyAPI(
    `/movies?category=${Categories.TRENDING}`
  );
  const korean = await FetchMyAPI(
    `/movies?category=${Categories.TOP_RATED}&country=KR_ko`
  );
  return {
    props: {
      topRated: topRatedMovies.items,
      trending: trendingMovies.items,
      korean: korean.items,
    },
  };
}
