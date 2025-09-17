import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Helmet } from "react-helmet";
import Loading from "../../components/Loading/Loading";
import { useState } from "react";
import { getBrands } from "./api/get-brands";

export default function Brands() {
  // States
  let [isShown, setIsShown] = useState(false);
  let [specificBrand, setSpecificBrand] = useState(null);

  // queries
  const { data, isLoading } = useQuery({
    queryKey: ["AllBrands"],
    queryFn: getBrands,
  });

  // Fetch
  async function getSpecificBrand({ brandID }) {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/brands/${brandID}`
      );
      setSpecificBrand(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  // Functions
  function hide() {
    setIsShown(false);
  }
  function show() {
    setIsShown(true);
  }

  // Handle loading
  if (isLoading) return <Loading />;
  return (
    <>
      <Helmet>
        <title>All Brands</title>
        <meta name="description" content="FreshCart| Brands Component" />
      </Helmet>

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              All Brands
            </h1>
            <p className="text-gray-600">
              Discover products from your favorite brands
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data.data.data.map((brands) => {
              return (
                <div
                  key={brands.id}
                  className="group bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer hover:border-primary-300"
                  onClick={() => {
                    show();
                    getSpecificBrand({ brandID: brands._id });
                  }}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={brands.image}
                      alt={brands.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6 text-center">
                    <h2 className="text-xl font-bold text-gray-800 group-hover:text-primary-600 transition-colors duration-200">
                      {brands.name}
                    </h2>
                    <div className="mt-3">
                      <span className="inline-flex items-center text-sm text-gray-500 group-hover:text-primary-500 transition-colors duration-200">
                        <i className="fa-solid fa-arrow-right mr-1"></i>
                        View Brand
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Enhanced Modal */}
      {isShown && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            {specificBrand === null ? (
              <div className="flex items-center justify-center h-64">
                <Loading />
              </div>
            ) : (
              <>
                <div className="bg-gradient-to-r from-primary-50 to-primary-100 px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-white rounded-lg p-2 shadow-sm">
                        <i className="fa-solid fa-star text-primary-600 text-lg"></i>
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">
                          {specificBrand.name}
                        </h2>
                        <p className="text-sm text-gray-600">
                          Brand Information
                        </p>
                      </div>
                    </div>
                    <button
                      className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors duration-200"
                      onClick={hide}
                    >
                      <i className="fa-solid fa-times text-gray-600"></i>
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-center mb-6">
                    <img
                      src={specificBrand.image}
                      alt={specificBrand.name}
                      className="w-32 h-32 object-contain rounded-lg border border-gray-200"
                    />
                  </div>

                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {specificBrand.name}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Explore our collection of products from{" "}
                      {specificBrand.name}. Quality and innovation you can
                      trust.
                    </p>

                    <div className="flex space-x-4 justify-center">
                      <button
                        className="btn flex items-center space-x-2"
                        onClick={hide}
                      >
                        <i className="fa-solid fa-check"></i>
                        <span>Continue Shopping</span>
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
