import { useEffect, useState, useRef } from "react";
import styles from "@/styles/inventory.module.css";
import Card from "../card/card.component";
import { Item } from "@/pages/movies";
import { useRouter } from "next/router";
import { stringify } from "querystring";
import { v4 as uuidv4 } from "uuid";
type InventroyProps = {
  initialItems: Item[];
  FetchMore: (pages: number, query: string) => Promise<Item[]>;
  location: string;
};
const Inventory = ({ initialItems, FetchMore, location }: InventroyProps) => {
  const lastDiv = useRef(null);
  const [loadedPages, setLoadedPages] = useState(1);
  const [loadedItems, setLoadedItems] = useState<Item[]>(initialItems);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setLoadedPages((prev) => prev + 1);
        }
      });
    });
    if (lastDiv.current) {
      observer.observe(lastDiv.current);
    }
    return (): void => {
      lastDiv.current && observer.unobserve(lastDiv.current);
    };
  }, []);
  useEffect(() => {
    console.log(loadedPages);

    if (loadedPages === 1) return;
    const updateItems = async () => {
      setIsLoading(true);
      const newItems: Item[] = await FetchMore(
        loadedPages,
        stringify(router.query)
      );
      setIsLoading(false);
      setLoadedItems((lastLoadedItems) => [...lastLoadedItems, ...newItems]);
    };
    updateItems();
  }, [loadedPages]);
  useEffect(() => console.log(isLoading), [isLoading]);
  useEffect(() => {
    setLoadedItems(initialItems);
    setLoadedPages(1);
  }, [initialItems]);
  return (
    <>
      <section className={styles.grid}>
        {loadedItems.map((card, i) => (
          <Card {...card} to={`/item/${location}/${card.id}`} key={uuidv4()} />
        ))}
      </section>
      <div className={styles.lastDiv} ref={lastDiv}></div>
    </>
  );
};
export default Inventory;
