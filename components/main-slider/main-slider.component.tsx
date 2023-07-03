import styles from "@/styles/components/main-slider.module.css";
import { CardData } from "@/components/card/card.component";
import Image from "next/image";
import Rating from "../rating/rating.comopnent";
import { useEffect, useState } from "react";
type SliderProps = {
  items: Array<CardData & { overview: string }>;
};
let timeOut: string | number | NodeJS.Timeout = 0;
const MainSlider = ({ items }: SliderProps) => {
  const [shownIndex, setShowIndex] = useState(10);
  useEffect(() => {
    setShowIndex(0);
  }, []);
  useEffect(() => {
    clearTimeout(timeOut);
    timeOut = setTimeout(() => {
      let index = shownIndex == 3 ? shownIndex - 3 : shownIndex + 1;
      setShowIndex(index);
    }, 7000);
  }, [shownIndex]);

  return (
    <section className={styles.sliderContainer}>
      <div className={styles.imagesContainer}>
        {items.map((item, i) => (
          <Image
            src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
            alt="cover image"
            className={`${styles.hide} ${styles.hideImg} ${
              shownIndex == i && styles.show
            } ${styles.sliderImage}`}
            width={500}
            height={700}
            quality={65}
            key={item.poster_path}
            sizes="(max-width: 500px) 100%, , 500px"
            priority={i === 0 ? true : false}
          />
        ))}
      </div>
      <div className={styles.infoContainer}>
        {items.map((item, i) => (
          <div
            className={`${styles.itemInfo} ${styles.hide} ${styles.hideInfo} ${
              shownIndex == i && styles.show
            }`}
            key={item.id}
          >
            <Rating rating={item.vote_average} className={""} />
            <h1 className={styles.title}>{item.title || item.name}</h1>
            <div className={styles.storyContainer}>
              <h3 className={styles.storyTitle}>story</h3>
              <p>{item.overview}</p>
            </div>
          </div>
        ))}
        <div className={styles.btnsContainer}>
          {items.map((item, i) => (
            <button
              className={styles.sliderBtn}
              onClick={() => setShowIndex(i)}
              key={i}
            >
              <div
                className={`${styles.sliderBtnOver} ${
                  i === shownIndex ? styles.showSliderBtnOver : ""
                }`}
              ></div>
              <Image
                src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                alt="cover image"
                width={70}
                height={100}
                quality={30}
                className={styles.btnImg}
              />
              <div className={styles.btnInfo}>
                <Rating rating={item.vote_average} />
                <h4 className={styles.btnHeading}>{item.title || item.name}</h4>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
export default MainSlider;
