import { useContext, useState } from "react";

import Loading from "../../components/Loading/Loading";

import { CategoryContext } from "../../context/Category.context";
import { Helmet } from "react-helmet";

export default function Categories() {
  // COntext
  let { getCategories, getSubcategories, subcategories, data, isLoading } =
    useContext(CategoryContext);

  // State
  let [categoryName, setCategoryName] = useState(null);

  // Handle Loading
  if (isLoading) return <Loading />;
  getCategories();

  return (
    <>
      <Helmet>
        <title>Categories</title>
        <meta name="description" content="FreshCart| Categories Component" />
      </Helmet>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Categories
            </h1>
            <p className="text-gray-600">Browse products by category</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {data.data.data.map((categories) => {
              return (
                <div
                  key={categories._id}
                  onClick={() => {
                    getSubcategories(categories._id);
                    setCategoryName(categories.name);
                  }}
                  className="group bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer hover:border-primary-300"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={categories.image}
                      alt={categories.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6 text-center">
                    <h2 className="text-xl font-bold text-gray-800 group-hover:text-primary-600 transition-colors duration-200">
                      {categories.name}
                    </h2>
                  </div>
                </div>
              );
            })}
          </div>

          {subcategories && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
              <div className="text-center mb-8">
                <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <i className="fa-solid fa-tags text-primary-600 text-2xl"></i>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {categoryName} Subcategories
                </h2>
                <p className="text-gray-600">Choose from these subcategories</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {subcategories === null ? (
                  <div className="col-span-full flex justify-center">
                    <Loading />
                  </div>
                ) : (
                  subcategories.map((sub) => {
                    return (
                      <div
                        key={sub._id}
                        className="group bg-gray-50 rounded-lg p-4 text-center hover:bg-primary-50 hover:border-primary-300 border border-gray-200 transition-all duration-200 cursor-pointer"
                      >
                        <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary-100 transition-colors duration-200">
                          <i className="fa-solid fa-tag text-primary-600"></i>
                        </div>
                        <h3 className="font-semibold text-gray-800 group-hover:text-primary-600 transition-colors duration-200">
                          {sub.name}
                        </h3>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
