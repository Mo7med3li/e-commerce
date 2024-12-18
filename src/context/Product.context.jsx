import { createContext, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export let ProductContext = createContext(null);

export default function ProductProvider({ children }) {
  let [productSearch, setProductSearch] = useState(null);

  async function getProducts() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/products",
      method: "GET",
    };
    return axios.request(options);
  }
  let { data, isLoading } = useQuery({
    queryKey: ["AllProducts"],
    queryFn: getProducts,
    staleTime: 6 * 60 * 60 * 100,
  });
  function searchProduct(value) {
    const allProduct = data.data.data;

    const productFilter = allProduct.filter((products) => {
      return products.title.toLowerCase().includes(value.toLowerCase());
    });

    setProductSearch(productFilter);
  }
  return (
    <ProductContext.Provider
      value={{ data, isLoading, searchProduct, productSearch }}
    >
      {children}
    </ProductContext.Provider>
  );
}
