import axios from "axios";
import Card from "../../components/Card/Card";
import Loading from "../../components/Loading/Loading";
import HomeSlider from "../../components/HomeSlider/HomeSlider";
import CategorySlider from "../../components/CategorySlider/CategorySlider";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { ProductContext } from "../../context/Product.context";
import { useFormik } from "formik";

export default function Home() {
  const formik = useFormik({
    initialValues: {
      searchInput: "",
    },
  });
  let { data, isLoading, searchProduct, productSearch } =
    useContext(ProductContext);
  if (isLoading) return <Loading />;

  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="FreshCart| Home Page" />
      </Helmet>
      <HomeSlider />
      <CategorySlider />
      <div className="py-5">
        <input
          type="search"
          placeholder="search...."
          name="searchInput"
          value={formik.values.searchInput}
          className="py-1 my-6 form-controll w-full search"
          onChange={(e) => {
            formik.handleChange(e);
            searchProduct(e.target.value);
          }}
        />
      </div>
      <div className="grid sm:grid-cols-2 sm:gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {productSearch === null
          ? data.data.data.map((products) => (
              <Card productInfo={products} key={products.id} />
            ))
          : productSearch.map((products) => (
              <Card productInfo={products} key={products.id} />
            ))}
      </div>
    </>
  );
}
