import styles from "@/styles/components/bigCard.module.css";
import Rating from "../rating/rating.comopnent";
import Image from "next/image";
import Link from "next/link";
import redX from "@/public/redX.svg";
import { toggleItemInLocalStorage } from "../card/card.component";
import { MouseEventHandler } from "react";
export type FavoritesItem = {
  poster_path: string;
  vote_average: number;
  itemTitle: string;
  id: number;
  to: string;
};
type BigCardProps = {
  item: FavoritesItem;
  remove: (id: number) => void;
};
const BigCard = ({ item, remove }: BigCardProps) => {
  const { poster_path, vote_average, itemTitle, id, to } = item;
  const toggle: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    toggleItemInLocalStorage("favorites", item);
    remove(id);
  };

  return (
    <div className={styles.bigCard}>
      <Link href={to}>
        <div className={styles.info}>
          <Rating size="m" rating={vote_average} />
          <h3>
            {itemTitle.length > 18 ? `${itemTitle.slice(0, 22)}...` : itemTitle}
          </h3>
        </div>
        <Image
          alt="movie poster"
          width={400}
          height={560}
          src={`https://image.tmdb.org/t/p/original${poster_path}`}
          className={styles.poster}
        />
        <button className={styles.removeBtn} onClick={toggle}>
          <Image src={redX} alt="remove" className={styles.redX} />
        </button>
      </Link>
    </div>
  );
};
export default BigCard;
