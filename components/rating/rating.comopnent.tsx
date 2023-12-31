import Image from "next/image";
import Star from "@/public/star.svg";
import styles from "@/styles/components/rating.module.css";
import { HTMLAttributes } from "react";
type RatingProps = {
  rating: number;
  size?: string;
  className?: string;
} & HTMLAttributes<HTMLDivElement>;
const Rating = ({ rating, size, className, ...other }: RatingProps) => {
  const customeSizeRating = size && styles[size];
  const customeSizeStar = size && styles[size + "Star"];
  return (
    <div
      className={`${styles.ratingContainer} ${className ? className : ""}`}
      {...other}
    >
      <Image
        src={Star}
        alt="star"
        className={`${styles.star} ${customeSizeStar}`}
      />
      <span className={`${styles.rating} ${customeSizeRating}`}>
        {rating?.toFixed(1)}
      </span>
    </div>
  );
};
export default Rating;
