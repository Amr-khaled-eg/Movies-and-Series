import styles from "@/styles/components/filter.module.css";
import Link from "next/link";
import FilterIcon from "@/public/filter.svg";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { FetchMyAPI } from "@/utils/fetch/fetch-data.utils";
import { countries } from "@/public/countries.js";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
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
let currentYear = new Date().getFullYear();

export const Categories = {
  TOP_RATED: "vote_average.gte=8",
  BestKorean: `vote_average.gte=8&with_original_language=ko&region=KR`,
  TRENDING: `primary_release_year.gte=${currentYear}`,
};
const Filter = () => {
  const [filterOptions, setFilterOptions] = useState<FilterOptions | null>(
    null
  );
  const [filters, setFilters] = useState<Query>({});
  const router = useRouter();
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
          countries: Object.keys(countries)?.map((country: string) => ({
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
          countries: Object.keys(countries)?.map((country: string) => ({
            ...countries[country as keyof typeof countries],
            countryCode: country,
          })),
        });
        setItemWithExpiration("filterOptions", options, 7);
      }
    };
    if (!setOptionsFromLS()) setOptionsFromAPI();

    setFilters(router.query as Query);
  }, []);
  return (
    <section className={styles.filterSection}>
      <select
        name="category"
        className={styles.filterSelect}
        onChange={updateFilters}
        defaultValue={filters.category ? filters.category : ""}
        value={filters.category}
      >
        <option value="">Category</option>
        <option value={Categories.TOP_RATED}>Top-Rated</option>
        <option value={Categories.TRENDING}>Trending</option>
      </select>
      <select
        name="country"
        className={styles.filterSelect}
        onChange={updateFilters}
        defaultValue={filters.country ? filters.country : ""}
        value={filters.country}
      >
        <option value="">Country</option>

        {filterOptions &&
          filterOptions.countries?.map((item, i) => {
            return (
              <option
                value={item.countryCode + "_" + item.languageCode}
                className={styles.filterSelect}
                key={uuidv4()}
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
        defaultValue={filters.type ? filters.type : ""}
        value={filters.type}
      >
        <option value="">Type</option>
        {filterOptions &&
          filterOptions.genres?.map((item, i) => {
            return (
              <option
                value={item.id}
                className={styles.filterSelect}
                key={uuidv4()}
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
        defaultValue={filters.year ? filters.year : ""}
        value={filters.year}
      >
        <option value="">Year</option>
        {getYears()?.map((year, i) => (
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
