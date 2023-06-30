import CardsSlider from "@/components/cardsSlider/cards-slider.component";
import { FetchMyAPI } from "@/utils/fetch/fetch-data.utils";
import Trending from "@/public/trending.svg";
import TopRated from "@/public/top-rated.svg";
import Popular from "@/public/popular.svg";
import { CardData } from "@/components/card/card.component";
import { Categories } from "@/components/filter/fiilter.comoponent";
import MainSlider from "@/components/main-slider/main-slider.component";
import styles from "@/styles/home.module.css";
export type Item = {
  [key: string]: any;
  overview: string;
} & CardData;

type MoviesProps = {
  topRated: [Item];
  korean: [Item];
  trending: [Item];
};

export default function Seires({ topRated, trending, korean }: MoviesProps) {
  return (
    <section className={styles.mainSection}>
      <MainSlider items={[topRated[0], topRated[1], trending[0], korean[0]]} />
      <CardsSlider
        header="Top-Rated"
        cards={topRated}
        icon={TopRated}
        location="tv"
      />
      <CardsSlider
        header="Trending"
        cards={trending}
        icon={Trending}
        location="tv"
      />
      <CardsSlider
        header="Best Korean"
        cards={korean}
        icon={Popular}
        location="tv"
      />
    </section>
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
      topRated: topRated.items,
      trending: trending.items,
      korean: korean.items,
    },
  };
}
