import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import CardsSlider from "@/components/cardsSlider/cards-slider.component";
import { CardData } from "@/components/card/card.component";
import Trending from "@/public/trending.svg";
import MainSlider from "@/components/main-slider/main-slider.component";
const inter = Inter({ subsets: ["latin"] });

// const Cards: [CardData] = [
//   {
//     imagePath: "/8SRUfRUi6x4O68n0VCbDNRa6iGL.jpg",
//     title: "Cinema Paradiso",
//     rating: 8.5,
//   },
//   {
//     imagePath: "/8SRUfRUi6x4O68n0VCbDNRa6iGL.jpg",
//     title: "Cinema Paradiso",
//     rating: 8.5,
//   },
//   {
//     imagePath: "/8SRUfRUi6x4O68n0VCbDNRa6iGL.jpg",
//     title: "Cinema Paradiso",
//     rating: 8.5,
//   },
//   {
//     imagePath: "/8SRUfRUi6x4O68n0VCbDNRa6iGL.jpg",
//     title: "Cinema Paradiso",
//     rating: 8.5,
//   },
//   {
//     imagePath: "/8SRUfRUi6x4O68n0VCbDNRa6iGL.jpg",
//     title: "Cinema Paradiso",
//     rating: 8.5,
//   },
//   {
//     imagePath: "/8SRUfRUi6x4O68n0VCbDNRa6iGL.jpg",
//     title: "Cinema Paradiso",
//     rating: 8.5,
//   },
//   {
//     imagePath: "/8SRUfRUi6x4O68n0VCbDNRa6iGL.jpg",
//     title: "Cinema Paradiso",
//     rating: 8.5,
//   },
//   {
//     imagePath: "/8SRUfRUi6x4O68n0VCbDNRa6iGL.jpg",
//     title: "Cinema Paradiso",
//     rating: 8.5,
//   },
//   {
//     imagePath: "/8SRUfRUi6x4O68n0VCbDNRa6iGL.jpg",
//     title: "Cinema Paradiso",
//     rating: 8.5,
//   },
//   {
//     imagePath: "/8SRUfRUi6x4O68n0VCbDNRa6iGL.jpg",
//     title: "Cinema Paradiso",
//     rating: 8.5,
//   },
//   {
//     imagePath: "/8SRUfRUi6x4O68n0VCbDNRa6iGL.jpg",
//     title: "Cinema Paradiso",
//     rating: 8.5,
//   },
//   {
//     imagePath: "/8SRUfRUi6x4O68n0VCbDNRa6iGL.jpg",
//     title: "Cinema Paradiso",
//     rating: 8.5,
//   },
// ];
const SliderContent: CardData & { story: string } = {
  imagePath: "/8SRUfRUi6x4O68n0VCbDNRa6iGL.jpg",
  title: "Cinema Paradiso",
  rating: 8.5,
  story: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea quod at voluptatibus ipsum saepe nostrum consectetur libero et perspiciatis accusantium, 
    reprehenderit accusamus nemo, delectus nobis sint unde quaerat, neque cupiditate`,
};
const SliderContent2: CardData & { story: string } = {
  imagePath: "/mfnkSeeVOBVheuyn2lo4tfmOPQb.jpg",
  title: "Cinema Paradiso",
  rating: 8.5,
  story: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea quod at voluptatibus ipsum saepe nostrum consectetur libero et perspiciatis accusantium, 
    reprehenderit accusamus nemo, delectus nobis sint unde quaerat, neque cupiditate`,
};
export default function Home() {
  return (
    <MainSlider
      items={[SliderContent, SliderContent2, SliderContent, SliderContent2]}
    />
  );
  // return <CardsSlider cards={Cards} icon={Trending} />;
}
