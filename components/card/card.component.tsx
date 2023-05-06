import styles from "@/styles/components/card.module.css";
import Heart from "@/public/heart.svg";
import Image from "next/image";
import Link from "next/link";
import Rating from "../rating/rating.comopnent";
export type CardData = {
  poster_path: string;
  vote_average: number;
  title?: string;
  name: string;
};
type CardProps = {
  to: string;
} & CardData;
const Card = ({
  poster_path,
  vote_average,
  title,
  name = "",
  to,
}: CardProps) => {
  let itemTitle = title ? title : name;
  return (
    <Link href={to} className={styles.cardLink}>
      <section className={styles.card}>
        <button className={styles.addToFavBtn}>
          <Image src={Heart} alt="add-to-favorites-image (heart)" />
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
