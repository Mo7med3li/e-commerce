import axios from "axios";
import Card from "../../components/Card/Card";
import Loading from "../../components/Loading/Loading";
import { useEffect, useState } from "react";
import HomeSlider from "../../components/HomeSlider/HomeSlider";
import CategorySlider from "../../components/CategorySlider/CategorySlider";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  async function getProducts() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/products",
      method: "GET",
    };
    return axios.request(options);
  }
  let { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    staleTime: 6 * 60 * 60 * 100,
  });
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
