import { useContext, useState } from "react";

import Loading from "../../components/Loading/Loading";

import { CategoryContext } from "../../context/Category.context";
import { Helmet } from "react-helmet";

export default function Categories() {
  let { getCategories, getSubcategories, subcategories, data, isLoading } =
    useContext(CategoryContext);
  let [categoryName, setCategoryName] = useState(null);
  if (isLoading) return <Loading />;
  getCategories();

  return (
    <>
      <Helmet>
        <title>Categories</title>
        <meta name="description" content="FreshCart| Categories Component" />
      </Helmet>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12  ">
        {data.data.data.map((categories) => {
          return (
            <>
              <div
                key={categories._id}
                onClick={() => {
                  getSubcategories(categories._id);

                  setCategoryName(categories.name);
                }}
                className=" border-2 rounded-lg overflow-hidden border-gray-300 hover:shadow-primary-400 hover:shadow-lg transition-shadow duration-400 cursor-pointer"
              >
                <div className="text-center">
                  <img
                    src={categories.image}
                    alt={categories.name}
                    className="w-full object-cover h-96"
                  />
                  <h2 className="text-primary-500 font-bold py-7 text-xl">
                    {categories.name}
                  </h2>
                </div>
              </div>
            </>
          );
        })}
      </div>
      {subcategories && (
        <div className="py-7">
          <h2 className="text-xl font-semibold text-primary-800 w-fit mx-auto">
            {categoryName} subcategories
          </h2>
          <div className="flex flex-wrap flex-row mt-5 ">
            {subcategories === null ? (
              <Loading />
            ) : (
              subcategories.map((sub) => {
                return (
                  <h2
                    key={sub._id}
                    className="border-2 p-3 font-semibold m-3 hover:shadow-primary-400 hover:shadow-lg transition-shadow duration-400"
                  >
                    {sub.name}
                  </h2>
                );
              })
            )}
          </div>
        </div>
      )}
    </>
  );
}
