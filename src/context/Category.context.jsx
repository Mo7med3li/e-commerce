import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createContext, useState } from "react";

export let CategoryContext = createContext(null);

export default function CategoryProvider({ children }) {
  let [subcategories, setSubcaegories] = useState(null);

  let [subcategoriesTitle, setSubcaegoriesTitle] = useState(null);
  async function getCategories() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/categories",
      method: "GET",
    };
    return axios.request(options);
  }
  let { data, isLoading } = useQuery({
    queryKey: ["categoriesItems"],
    queryFn: getCategories,
  });

  async function getSubcategories(id) {
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`,
      method: "GET",
    };

    let { data } = await axios.request(options);

    setSubcaegories(data.data);
  }

  return (
    <CategoryContext.Provider
      value={{
        getCategories,
        getSubcategories,
        subcategories,
        data,
        isLoading,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
}
