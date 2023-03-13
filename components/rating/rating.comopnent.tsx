import Image from "next/image";
import Star from "@/public/star.svg";
import styles from "@/styles/components/rating.module.css";
import { HTMLAttributes } from "react";
type RatingProps = {
  rating: number;
} & HTMLAttributes<HTMLDivElement>;
const Rating = ({ rating, ...other }: RatingProps) => {
  return (
    <div className={styles.ratingContainer} {...other}>
      <Image src={Star} alt="star" />
      <span className={styles.rating}>{rating}</span>
    </div>
  );
};
export default Rating;
