import Rating from "../rating/rating.comopnent";
import styles from "@/styles/components/review.module.css";
import Image from "next/image";
import Avatar from "@/public/avatar.svg";
type ReviewProps = {
  rating: number;
  name: string;
  content: string;
  avatar: string;
};
const Review = ({ rating, name, content, avatar }: ReviewProps) => {
  return (
    <div className={styles.review}>
      <Rating rating={rating} />
      <div className={styles.user}>
        <Image
          className={styles.avatar}
          src={avatar ? `https://image.tmdb.org/t/p/original${avatar}` : Avatar}
          alt={name}
          width={40}
          height={40}
          quality={40}
        />
        <p className={styles.name}>{name}</p>
      </div>
      <p className={styles.content}>{content.slice(0, 350)}...</p>
    </div>
  );
};
export default Review;
