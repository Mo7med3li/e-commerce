import { ProductContext } from "../../context/Product.context";
import Card from "../../components/Card/Card";
import Loading from "../../components/Loading/Loading";
import { Helmet } from "react-helmet";
import { useFormik } from "formik";
import { useContext } from "react";

export default function Products() {
  // Context
  let { data, isLoading, searchProduct, productSearch } =
    useContext(ProductContext);

  // Formik
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
      <div className="grid sm:grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 ">
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
