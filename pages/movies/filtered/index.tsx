import { FetchMyAPI } from "@/utils/fetch/fetch-data.utils";
import { GetServerSidePropsContext } from "next";
import { Item } from "..";
import Inventory from "@/components/inventory/inventory.component";
import Filter from "@/components/filter/fiilter.comoponent";
import { useRouter } from "next/router";
import { stringify } from "querystring";
type FlteredItemsProps = {
  initialItems: Item[];
};
const FetchMore = async (page: number, query: string): Promise<Item[]> => {
  const data = await FetchMyAPI(`/movies?page=${page}&${query}`);
  return data.items;
};
export default function FilteredMovies({ initialItems }: FlteredItemsProps) {
  const router = useRouter();

  return (
    <>
      <Filter />
      <Inventory FetchMore={FetchMore} initialItems={initialItems} />
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
