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

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              All Products
            </h1>
            <p className="text-gray-600">
              Browse our complete collection of products
            </p>
          </div>

          {/* Search Section */}
          <div className="mb-8">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-primary-100 rounded-full p-2">
                  <i className="fa-solid fa-search text-primary-600"></i>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Search Products
                  </h2>
                  <p className="text-sm text-gray-600">
                    Find exactly what you&apos;re looking for
                  </p>
                </div>
              </div>

              <div className="relative">
                <input
                  type="search"
                  placeholder="Search for products..."
                  name="searchInput"
                  value={formik.values.searchInput}
                  className="form-controll w-full pl-12 pr-4 py-3 text-lg"
                  onChange={(e) => {
                    formik.handleChange(e);
                    searchProduct(e.target.value);
                  }}
                />
                <i className="fa-solid fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              </div>

              {productSearch !== null && (
                <div className="mt-4 flex items-center space-x-2 text-sm text-gray-600">
                  <i className="fa-solid fa-info-circle"></i>
                  <span>
                    {productSearch.length} product
                    {productSearch.length !== 1 ? "s" : ""} found
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Products Grid */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {productSearch === null ? "All Products" : "Search Results"}
                </h2>
                <p className="text-gray-600">
                  {productSearch === null
                    ? `Showing ${data.data.data.length} products`
                    : `Found ${productSearch.length} product${
                        productSearch.length !== 1 ? "s" : ""
                      }`}
                </p>
              </div>

              {productSearch !== null && (
                <button
                  className="text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
                  onClick={() => {
                    formik.setFieldValue("searchInput", "");
                    searchProduct("");
                  }}
                >
                  <i className="fa-solid fa-times mr-1"></i>
                  Clear Search
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {productSearch === null ? (
                data.data.data.map((products) => (
                  <Card productInfo={products} key={products.id} />
                ))
              ) : productSearch.length > 0 ? (
                productSearch.map((products) => (
                  <Card productInfo={products} key={products.id} />
                ))
              ) : (
                <div className="col-span-full">
                  <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-12 text-center">
                    <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                      <i className="fa-solid fa-search text-4xl text-gray-400"></i>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                      No products found
                    </h3>
                    <p className="text-gray-500 mb-6">
                      Try adjusting your search terms
                    </p>
                    <button
                      className="btn"
                      onClick={() => {
                        formik.setFieldValue("searchInput", "");
                        searchProduct("");
                      }}
                    >
                      <i className="fa-solid fa-refresh mr-2"></i>
                      Clear Search
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
