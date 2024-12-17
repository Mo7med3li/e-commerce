import React, { useContext } from "react";
import Home from "../Home/Home";
import { ProductContext } from "../../context/Product.context";
import Card from "../../components/Card/Card";
import Loading from "../../components/Loading/Loading";

export default function Products() {
  let { data, isLoading } = useContext(ProductContext);
  if (isLoading) return <Loading />;
  return (
    <>
      <div className="grid sm:grid-cols-2 sm:gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {data.data.data.map((products) => (
          <Card productInfo={products} key={products.id} />
        ))}
      </div>
    </>
  );
}
