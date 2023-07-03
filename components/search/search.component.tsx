import styles from "@/styles/components/search.module.css";
import SearchIcon from "@/public/search.svg";
import whiteX from "@/public/whiteX.svg";
import {
  ChangeEventHandler,
  InputHTMLAttributes,
  useState,
  useEffect,
  useRef,
} from "react";
import Image from "next/image";
import { FetchMyAPI } from "@/utils/fetch/fetch-data.utils";
import SearchResult, {
  SearchData,
} from "@/components/searchResult/searchResult.component";
import { v4 as uuidV4 } from "uuid";
import { useRouter } from "next/router";
type SearchProps = {
  icon?: boolean;
  show?: boolean;
  toggleShow?: () => void;
} & InputHTMLAttributes<HTMLInputElement>;

const Search = ({ icon, show, toggleShow, ...otherProps }: SearchProps) => {
  const [isAutoCompleteShown, setIsAutoCompleteShown] = useState(false);
  const [searchResult, setSearchResult] = useState<SearchData[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);
  const currentPath = useRouter().asPath.split("/");
  const getSearchGategory = () => {
    if (currentPath[1] == "movies" || currentPath[2] == "movie") return "movie";
    if (currentPath[1] == "seires" || currentPath[2] == "tv") return "tv";
    return "movie";
  };
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.value.trim() != "") {
      setIsAutoCompleteShown(true);
    } else {
      setIsAutoCompleteShown(false);
    }
    setSearchValue(e.target.value);
  };
  useEffect(() => {
    if (searchValue.trim() == "") return;

    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }
    timeoutIdRef.current = setTimeout(async () => {
      try {
        setIsLoading(true);

        const result = await FetchMyAPI(
          `/search?searchTirm=${searchValue}&type=${getSearchGategory()}`
        );
        console.log("called with new data");

        setSearchResult(result.data);
      } catch (err: any) {
        console.error(err.message);
      }
      setIsLoading(false);
    }, 300);
    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, [searchValue]);

  return (
    <div
      className={
        show
          ? `${styles.searchContainer} ${styles.searchContainerOpened}`
          : styles.searchContainer
      }
    >
      {icon && (
        <Image
          src={SearchIcon}
          alt="search-icon"
          className={styles.searchIcon}
        />
      )}
      <input
        type="search"
        placeholder={`Search ${
          getSearchGategory() == "movie" ? "Movies" : "Series"
        }`}
        value={searchValue}
        className={styles.searchInput}
        onChange={handleChange}
        {...otherProps}
      />
      {show && (
        <Image
          src={whiteX}
          alt="exit-icon"
          className={` ${styles.Xicon}`}
          onClick={toggleShow}
        />
      )}
      <div
        className={`${styles.autoComplete} ${
          isAutoCompleteShown ? styles.show : styles.hide
        }`}
      >
        {searchResult?.map((item: SearchData) => (
          <SearchResult key={uuidV4()} {...item} to={getSearchGategory()} />
        ))}
      </div>
    </div>
  );
};
export default Search;
