import styles from "@/styles/components/card.module.css";
import Heart from "@/public/heart.svg";
import Love from "@/public/love.svg";
import Image from "next/image";
import Link from "next/link";
import { MouseEventHandler, useEffect } from "react";
import Rating from "../rating/rating.comopnent";
import { useState } from "react";
import { FavoritesItem } from "../bigCard/bigCard.component";

export const toggleItemInLocalStorage = (key: string, item: FavoritesItem) => {
  let favorites = localStorage.getItem("favorites");
  if (!favorites) {
    localStorage.setItem(key, JSON.stringify({}));
    favorites = "{}";
  }
  let oldFavorites = JSON.parse(favorites);
  if (oldFavorites[item.id]) {
    delete oldFavorites[item.id];
    localStorage.setItem(key, JSON.stringify(oldFavorites));
  } else {
    let newFavorites = {
      ...oldFavorites,
      [item.id]: item,
    };
    localStorage.setItem(key, JSON.stringify(newFavorites));
  }
};
export type CardData = {
  poster_path: string;
  vote_average: number;
  title?: string;
  name: string;
  id: number;
};
type CardProps = {
  to: string;
  id: number;
  className?: string;
} & CardData;

const Card = ({
  poster_path,
  vote_average,
  title,
  name = "",
  id,
  to,
  className,
}: CardProps) => {
  const [isLoved, setIsLoved] = useState(false);
  useEffect(() => {
    const favorites = localStorage.getItem("favorites");
    if (!favorites) return;
    if (JSON.parse(favorites)[id]) {
      setIsLoved(true);
    } else {
      setIsLoved(false);
    }
  }, []);
  let itemTitle = title ? title : name;
  const toggleLoved: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    toggleItemInLocalStorage("favorites", {
      poster_path,
      vote_average,
      itemTitle,
      id,
      to,
    });
    setIsLoved((prev) => !prev);
  };
  return (
    <Link href={to} className={`${styles.cardLink} ${className}`}>
      <section className={styles.card}>
        <button className={styles.addToFavBtn} onClick={toggleLoved}>
          <Image
            src={Love}
            alt="remove-from-favorites-image (love)"
            className={`${styles.icon} ${
              isLoved ? styles.opened : styles.closed
            }`}
          />

          <Image
            src={Heart}
            alt="add-to-favorites-image (heart)"
            className={`${styles.icon} ${
              isLoved ? styles.closed : styles.opened
            }`}
          />
        </button>
        <Image
          src={`https://image.tmdb.org/t/p/original${poster_path}`}
          alt="card-image"
          className={styles.cardImage}
          width={200}
          height={300}
          priority={true}
        />
        <div className={styles.cardInfo}>
          <Rating rating={vote_average} />
          <h4>
            {itemTitle.length > 18 ? `${itemTitle.slice(0, 17)}...` : itemTitle}
          </h4>
        </div>
      </section>
    </Link>
  );
};
export default Card;
