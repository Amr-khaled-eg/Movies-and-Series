import Image from "next/image";
import styles from "@/styles/components/searchResult.module.css";
import Link from "next/link";
export type SearchData = {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  to: string;
};

const SearchResult = ({
  id,
  title,
  poster_path,
  release_date,
  to,
}: SearchData) => {
  console.log(to);

  return (
    <Link href={`/item/${to}/${id}`} className={styles.resultLink}>
      <div className={styles.result}>
        <Image
          src={`https://image.tmdb.org/t/p/original${poster_path}`}
          alt={title}
          width={65}
          height={100}
          className={styles.resultImage}
        />
        <div className={styles.resultInfo}>
          <h4>{title}</h4>
          <h4>{release_date?.split("-")[0]}</h4>
        </div>
      </div>
    </Link>
  );
};
export default SearchResult;
