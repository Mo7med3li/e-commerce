import React, { useContext, useEffect, useState } from "react";
import Home from "../Home/Home";
import { ProductContext } from "../../context/Product.context";
import Card from "../../components/Card/Card";
import Loading from "../../components/Loading/Loading";
import { Helmet } from "react-helmet";
import axios from "axios";
import { useFormik } from "formik";

export default function Products() {
  let { data, isLoading, searchProduct, productSearch } =
    useContext(ProductContext);
  const formik = useFormik({
    initialValues: {
      searchInput: "",
    },
  });

  if (isLoading) return <Loading />;

  return (
    <>
      <Helmet>
        <title>Products</title>
        <meta name="description" content="FreshCart| All products" />
      </Helmet>
      <div className="py-6">
        <input
          type="search"
          placeholder="search...."
          name="searchInput"
          value={formik.values.searchInput}
          className="py-1  form-controll w-full search"
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
