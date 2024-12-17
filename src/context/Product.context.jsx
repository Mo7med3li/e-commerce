import { createContext } from "react";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export let ProductContext = createContext(null);

export default function ProductProvider({ children }) {
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

  return (
    <ProductContext.Provider value={{ data, isLoading }}>
      {children}
    </ProductContext.Provider>
  );
}
