import Card from "../card/card.component";
import { CardData } from "../card/card.component";
import styles from "@/styles/components/cards-slider.module.css";
import Left from "@/public/left.svg";
import Right from "@/public/right.svg";
import Image from "next/image";
import { useRef, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import SectionHeader from "../sectionHeader/sectionHeader.component";
import Link from "next/link";
type CardsSliderProps = {
  cards: [CardData];
  icon: string;
  header: string;
  location: string;
};

const CardsSlider = ({ cards, icon, header, location }: CardsSliderProps) => {
  const [pos, setPos] = useState(0);
  const [active, setActive] = useState({ left: false, right: true });
  const ref = useRef<HTMLDivElement>(null);
  const STEP = ref.current ? ref.current.offsetWidth : 400;
  const updatePos = (newPos: number) => {
    if (newPos < 0) {
      setPos(0);
      setActive({ right: true, left: false });
      return;
    }
    if (cards.length * 250 < ref.current.offsetWidth + newPos) {
      // ref.current.style.transform = `translateX(${(ref.current.getBoundingClientRect().right - ref.current?.lastChild.getBoundingClientRect().right)}px)`;
      setPos(
        (ref.current.getBoundingClientRect().right -
          ref.current?.lastChild.getBoundingClientRect().right) *
          -1
      );
      setActive({ left: true, right: false });
      return;
    }
    setActive({ left: true, right: true });
    setPos(newPos);
  };
  const sellAllLocation = location === "movie" ? "movies" : "seiers";
  return (
    <section className={styles.sliderContainer}>
      <div className={styles.sliderHeader}>
        <SectionHeader icon={icon} header={header} />
        <Link href={`${sellAllLocation}/filtered`} className={styles.seeAll}>
          See all
        </Link>
      </div>

      <div
        className={styles.slider}
        style={{ transform: `translateX(${pos * -1}px)` }}
        ref={ref}
      >
        {cards.map((card: CardData, i) => (
          <Card {...card} to={`/item/${location}/${card.id}`} key={uuidV4()} />
        ))}
      </div>
      <button
        className={`${styles.arrowBtn} ${styles.leftBtn} ${
          active.left && styles.active
        }`}
        onClick={() => updatePos(pos - STEP)}
      >
        <Image src={Left} alt="back" />
      </button>
      <button
        className={`${styles.arrowBtn} ${styles.rightBtn} ${
          active.right && styles.active
        }`}
        onClick={() => updatePos(pos + STEP)}
      >
        <Image src={Right} alt="next" />
      </button>
    </section>
  );
};
export default CardsSlider;
