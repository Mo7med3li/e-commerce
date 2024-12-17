import axios from "axios";
import Card from "../../components/Card/Card";
import Loading from "../../components/Loading/Loading";
import HomeSlider from "../../components/HomeSlider/HomeSlider";
import CategorySlider from "../../components/CategorySlider/CategorySlider";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { ProductContext } from "../../context/Product.context";

export default function Home() {
  let { data, isLoading } = useContext(ProductContext);
  if (isLoading) return <Loading />;

  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="FreshCart| Home Page" />
      </Helmet>
      <HomeSlider />
      <CategorySlider />

      <div className="grid sm:grid-cols-2 sm:gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {data.data.data.map((products) => (
          <Card productInfo={products} key={products.id} />
        ))}
      </div>
    </>
  );
}
