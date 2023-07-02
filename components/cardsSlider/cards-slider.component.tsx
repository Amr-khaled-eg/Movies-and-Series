import { CardData } from "../card/card.component";
import SectionHeader from "../sectionHeader/sectionHeader.component";
import styles from "@/styles/components/cards-slider.module.css";
import Card from "../card/card.component";
import Link from "next/link";
import Glider from "react-glider";
import "glider-js/glider.min.css";
import Left from "@/public/left.svg";
import Right from "@/public/right.svg";
import Image from "next/image";
import { v4 as uuidV4 } from "uuid";
type CardsSliderProps = {
  cards: [CardData];
  icon: string;
  header: string;
  location: string;
};

const CardsSlider = ({ cards, icon, header, location }: CardsSliderProps) => {
  const sellAllLocation = location === "movie" ? "movies" : "seires";

  return (
    <section className={styles.sliderContainer}>
      <div className={styles.sliderHeader}>
        <SectionHeader icon={icon} header={header} />
        <Link href={`${sellAllLocation}/filtered`} className={styles.seeAll}>
          See all
        </Link>
      </div>
      <Glider
        draggable
        exactWidth={true}
        hasArrows={true}
        arrows={{
          prev: `#${header.slice(0, 2)}b`,
          next: `#${header.slice(0, 2)}n`,
        }}
        slidesToScroll={"auto"}
        slidesToShow={"auto"}
        itemWidth={230}
        dragVelocity={1.2}
      >
        {cards.map((card: CardData, i) => (
          <Card {...card} to={`/item/${location}/${card.id}`} key={uuidV4()} />
        ))}
      </Glider>
      <button
        className={`${styles.arrowBtn} ${styles.leftBtn}`}
        id={`${header.slice(0, 2)}b`}
      >
        <Image src={Left} alt="back" />
      </button>
      <button
        className={`${styles.arrowBtn} ${styles.rightBtn}`}
        id={`${header.slice(0, 2)}n`}
      >
        <Image src={Right} alt="next" />
      </button>
    </section>
  );
};

export default CardsSlider;
