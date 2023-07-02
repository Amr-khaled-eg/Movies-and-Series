import { FetchMyAPI } from "@/utils/fetch/fetch-data.utils";
import { GetServerSidePropsContext } from "next";
import { Item } from "..";
import Inventory from "@/components/inventory/inventory.component";
import Filter from "@/components/filter/fiilter.comoponent";
import { stringify } from "querystring";
type FlteredItemsProps = {
  initialItems: Item[];
};
const FetchMore = async (page: number, query: string): Promise<Item[]> => {
  console.log(page + " hhhhh");
  try {
    const data = await FetchMyAPI(`/movies?page=${page}&${query}`);
    return data.items;
  } catch (e: any) {
    console.error(e.message);
    return [];
  }
};
export default function FilteredMovies({ initialItems }: FlteredItemsProps) {
  return (
    <>
      <Filter />
      <Inventory
        location="movie"
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
