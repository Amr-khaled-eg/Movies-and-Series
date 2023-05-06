import styles from "@/styles/components/filter.module.css";
import Link from "next/link";
import FilterIcon from "@/public/filter.svg";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { FetchMyAPI } from "@/utils/fetch/fetch-data.utils";
import { countries } from "@/public/countries.js";

type genre = {
  id: number;
  name: string;
  [key: string]: any;
};
type country = {
  name: string;
  languageCode: string;
  countryCode: string;
};
type FilterOptions = {
  genres: [genre];
  countries: country[];
};
export type Query = {
  country?: string;
  type?: number;
  year?: number;
  category?: string;
};
const getYears = (): number[] => {
  const years: number[] = [];
  for (
    let currentYear = new Date().getFullYear();
    currentYear >= 1961;
    currentYear--
  ) {
    years.push(currentYear);
  }
  return years;
};
// https://api.themoviedb.org/3/discover/movie?api_key=YOUR_API_KEY&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.gte=2023-01-01&primary_release_date.lte=2023-12-31&vote_average.gte=7
let currentYear = new Date().getFullYear();

export const Categories = {
  TOP_RATED: "vote_average.gte=8",
  POPULAR: "",
  TRENDING: `primary_release_year.gte=${currentYear}&primary_release_year.lte=${
    currentYear + 1
  }`,
};
const Filter = () => {
  const [filterOptions, setFilterOptions] = useState<FilterOptions | null>(
    null
  );
  const [filters, setFilters] = useState<Query>({});
  const updateFilters = (event: ChangeEvent<HTMLSelectElement>) => {
    setFilters({ ...filters, [event.target.name]: event.target.value });
  };
  useEffect(() => {
    function setItemWithExpiration(
      key: string,
      value: any,
      expirationDays: number
    ): void {
      const expirationMS = expirationDays * 24 * 60 * 60 * 1000;
      const record = {
        value: value,
        expiration: new Date().getTime() + expirationMS,
      };
      localStorage.setItem(key, JSON.stringify(record));
    }
    function getItemWithExpiration(key: string): any {
      const record = JSON.parse(localStorage.getItem(key) as string);
      if (!record) {
        return null;
      }

      return new Date().getTime() < record.expiration ? record.value : null;
    }
    const setOptionsFromLS = (): boolean => {
      const options = getItemWithExpiration("filterOptions");

      if (options) {
        setFilterOptions({
          ...options,
          countries: Object.keys(countries).map((country: string) => ({
            ...countries[country as keyof typeof countries],
            countryCode: country,
          })),
        });
        return true;
      }
      return false;
    };
    const setOptionsFromAPI = async () => {
      const options = await FetchMyAPI("/filterOptions");
      if (options) {
        setFilterOptions({
          ...options,
          countries: Object.keys(countries).map((country: string) => ({
            ...countries[country as keyof typeof countries],
            countryCode: country,
          })),
        });
        setItemWithExpiration("filterOptions", options, 7);
      }
    };
    if (!setOptionsFromLS()) setOptionsFromAPI();
  }, []);
  return (
    <section className={styles.filterSection}>
      <select
        name="category"
        className={styles.filterSelect}
        onChange={updateFilters}
        defaultValue={filters.category ? filters.category : "default"}
      >
        <option value="default" disabled>
          Category
        </option>
        <option value={Categories.TOP_RATED}>Top-Rated</option>
        <option value={Categories.POPULAR}>Popular</option>
        <option value={Categories.TRENDING}>Trending</option>
      </select>
      <select
        name="country"
        className={styles.filterSelect}
        onChange={updateFilters}
        defaultValue={filters.country ? filters.country : "default"}
      >
        <option value="default" disabled>
          Country
        </option>

        {filterOptions &&
          filterOptions.countries.map((item, i) => {
            return (
              <option
                value={item.countryCode + "_" + item.languageCode}
                className={styles.filterSelect}
                key={i + item.name}
              >
                {item.name}
              </option>
            );
          })}
      </select>
      <select
        name="type"
        className={styles.filterSelect}
        onChange={updateFilters}
        defaultValue={filters.type ? filters.type : "default"}
      >
        <option value="default" disabled>
          Type
        </option>
        {filterOptions &&
          filterOptions.genres.map((item, i) => {
            return (
              <option
                value={item.id}
                className={styles.filterSelect}
                key={i + item.name}
              >
                {item.name}
              </option>
            );
          })}
      </select>
      <select
        name="year"
        className={styles.filterSelect}
        onChange={updateFilters}
        defaultValue={filters.year ? filters.year : "default"}
      >
        <option value="default" disabled>
          Year
        </option>
        {getYears().map((year, i) => (
          <option value={year} className={styles.filterSelect} key={i * year}>
            {year}
          </option>
        ))}
      </select>
      <Link
        href={{
          pathname: "",
          query: filters,
        }}
        className={styles.filterLink}
      >
        Filter
        <Image src={FilterIcon} alt="filter" className={styles.filterIcon} />
      </Link>
    </section>
  );
};
export default Filter;
