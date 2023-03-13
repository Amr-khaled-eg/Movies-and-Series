import styles from "@/styles/components/card.module.css";
import Heart from "@/public/heart.svg";
import Image from "next/image";
import Link from "next/link";
import Rating from "../rating/rating.comopnent";
export type CardData = {
  imagePath: string;
  rating: number;
  title: string;
};
type CardProps = {
  to: string;
} & CardData;
const Card = ({ imagePath, rating, title, to }: CardProps) => {
  return (
    <Link href={to} className={styles.cardLink}>
      <section className={styles.card}>
        <button className={styles.addToFavBtn}>
          <Image src={Heart} alt="add-to-favorites-image (heart)" />
        </button>
        <Image
          src={`https://image.tmdb.org/t/p/original${imagePath}`}
          alt="card-image"
          className={styles.cardImage}
          width={200}
          height={300}
        />
        <div className={styles.cardInfo}>
          <Rating rating={8.5} />
          <h4>{title.length > 18 ? `${title.slice(0, 17)}...` : title}</h4>
        </div>
      </section>
    </Link>
  );
};
export default Card;
