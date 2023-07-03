import CardsSlider from "@/components/cardsSlider/cards-slider.component";
import { FetchMyAPI } from "@/utils/fetch/fetch-data.utils";
import Trending from "@/public/trending.svg";
import TopRated from "@/public/top-rated.svg";
import Popular from "@/public/popular.svg";
import { CardData } from "@/components/card/card.component";
import { Categories } from "@/components/filter/fiilter.comoponent";
import MainSlider from "@/components/main-slider/main-slider.component";
import styles from "@/styles/home.module.css";
import Head from "next/head";
import { CategoryProps } from "../movies";

export default function Seires({ topRated, trending, korean }: CategoryProps) {
  return (
    <>
      <Head>
        <title>Seires</title>
        <meta
          name="description"
          content="this page containes top-rated seires and trending seires and best korean seires"
        />
      </Head>
      <section className={styles.mainSection}>
        <MainSlider
          items={[topRated[0], topRated[1], trending[0], korean[0]]}
        />
        {topRated && (
          <CardsSlider
            header="Top-Rated"
            cards={topRated}
            icon={TopRated}
            location="tv"
            to={`/seires/filtered?category=${Categories.TOP_RATED}`}
          />
        )}
        {trending && (
          <CardsSlider
            header="Trending"
            cards={trending}
            icon={Trending}
            location="tv"
            to={`/seires/filtered?category=${Categories.TRENDING}`}
          />
        )}
        {korean && (
          <CardsSlider
            header="Best Korean"
            cards={korean}
            icon={Popular}
            location="tv"
            to={`/seires/filtered?category=${Categories.TOP_RATED}&country=KR_ko`}
          />
        )}
      </section>
    </>
  );
}
export async function getServerSideProps() {
  const topRated = await FetchMyAPI(`/series?category=${Categories.TOP_RATED}`);
  const trending = await FetchMyAPI(`/series?category=${Categories.TRENDING}`);
  const korean = await FetchMyAPI(
    `/series?category=${Categories.TOP_RATED}&country=KR_ko`
  );
  return {
    props: {
      topRated: topRated?.items,
      trending: trending?.items,
      korean: korean?.items,
    },
  };
}
