import { FetchMyAPI } from "@/utils/fetch/fetch-data.utils";
import { GetServerSidePropsContext } from "next";
import { Item } from "@/pages/movies/index";
import Inventory from "@/components/inventory/inventory.component";
import Filter from "@/components/filter/fiilter.comoponent";
import { stringify } from "querystring";
type FlteredItemsProps = {
  initialItems: Item[];
};
const FetchMore = async (page: number, query: string): Promise<Item[]> => {
  const data = await FetchMyAPI(`/series?page=${page}&${query}`);
  return data?.items;
};
export default function FilteredMovies({ initialItems }: FlteredItemsProps) {
  return (
    <>
      <Filter />
      <Inventory
        location="tv"
        FetchMore={FetchMore}
        initialItems={initialItems}
      />
    </>
  );
}
export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  const initialItems = await FetchMore(1, stringify(query));

  return {
    props: {
      initialItems: initialItems,
    },
  };
}
