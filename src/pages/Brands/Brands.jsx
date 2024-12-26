import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { Helmet } from "react-helmet";
import Loading from "../../components/Loading/Loading";
import { useState } from "react";

export default function Brands() {
  let [isShown, setIsShown] = useState(false);
  let [specificBrand, setSpecificBrand] = useState(null);
  async function getBrands() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/brands",
      method: "GET",
    };
    return axios.request(options);
  }

  const { data, isLoading } = useQuery({
    queryKey: ["AllBrands"],
    queryFn: getBrands,
  });
  async function getSpecificBrand({ brandID }) {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/brands/${brandID}`
      );
      setSpecificBrand(data.data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  function hide() {
    setIsShown(false);
  }
  function show() {
    setIsShown(true);
  }

  if (isLoading) return <Loading />;
  return (
    <>
      <Helmet>
        <title>All Brands</title>
        <meta name="description" content="FreshCart| Brands Component" />
      </Helmet>
      <h2 className="text-2xl  font-semibold text-primary-700 w-fit mx-auto">
        All Brands
      </h2>
      <div className=" md:grid md:grid-cols-4 gap-12 py-7 relative cursor-pointer">
        {data.data.data.map((brands) => {
          return (
            <>
              <div
                key={brands.id}
                className="text-center border-2 rounded-lg overflow-hidden border-gray-300 hover:shadow-primary-400 hover:shadow-lg transition-shadow duration-400 "
                onClick={() => {
                  show();

                  getSpecificBrand({ brandID: brands._id });
                }}
              >
                <img
                  src={brands.image}
                  alt={brands.name}
                  className="w-full object-cover "
                />
                <h2 className=" font-bold py-7 text-xl">{brands.name}</h2>
              </div>
              {isShown &&
                (specificBrand === null ? (
                  <Loading />
                ) : (
                  <div
                    className=" layer h-screen w-screen fixed bg-black bg-opacity-5 inset-0 flex justify-center  z-50 p-10"
                    onClick={hide}
                  >
                    <div
                      className="  absolute w-1/2  bg-white p-4 "
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <i
                        className="fa-solid fa-x  hover:text-gray-700 transition-colors duration-300 text-2xl   "
                        onClick={hide}
                      ></i>
                      <div className="flex items-center justify-between border-b-2 ">
                        <h2 className=" brand-name text-2xl font-bold text-primary-700">
                          {specificBrand.name}
                        </h2>
                        <img
                          src={specificBrand.image}
                          className="w-36 img-brand"
                          alt=""
                        />
                      </div>
                      <button
                        className="btn mt-3 bg-gray-500 hover:bg-gray-700 "
                        onClick={hide}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                ))}
            </>
          );
        })}
      </div>
      {}
    </>
  );
}
