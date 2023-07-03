import SectionHeader from "@/components/sectionHeader/sectionHeader.component";
import styles from "@/styles/favorites.module.css";
import Love from "@/public/love.svg";
import { useState, useEffect } from "react";
import BigCard, { FavoritesItem } from "@/components/bigCard/bigCard.component";
import Head from "next/head";
import { v4 as uuidV4 } from "uuid";
const Favorites = () => {
  const [favorites, setFavorites] = useState<FavoritesItem[]>([]);
  useEffect(() => {
    const favorites = localStorage.getItem("favorites");
    if (!favorites) return;
    const parsedFavorites = JSON.parse(favorites);
    const state = Object.keys(parsedFavorites).reduce(
      (acc: any[], key: string) => {
        return [...acc, parsedFavorites[key]];
      },
      []
    );
    setFavorites(state);
  }, []);
  const remove = (id: number) => {
    setFavorites((prev) => prev.filter((item) => item.id !== id));
  };
  return (
    <>
      <Head>
        <title>Favorites</title>
        <meta name="description" content="Your favorite movies and tv shows" />
      </Head>
      <section className={styles.favoritesSection}>
        <SectionHeader
          icon={Love}
          header="Favorites"
          className={styles.header}
        />
        {favorites?.map((item) => (
          <BigCard key={uuidV4()} item={item} remove={remove} />
        ))}
      </section>
    </>
  );
};
export default Favorites;
