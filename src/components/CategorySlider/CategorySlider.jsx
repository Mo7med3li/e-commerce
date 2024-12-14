import axios from "axios";
import { useEffect, useState } from "react";
import sliderImage3 from "../../assets/images/slider-image-3.jpeg";
import Loading from "../Loading/Loading";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import { useQuery } from "@tanstack/react-query";

export default function CategorySlider() {
  async function getCategories() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/categories",
      method: "GET",
    };
    return axios.request(options);
  }

  let { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 60 * 60 * 100,
  });
  if (isLoading) return <Loading />;
  return (
    <>
      <section className="py-3">
        <h2 className="font-semibold text-lg text-slate-900 my-2">
          Shop Popular Categories
        </h2>

        <Swiper slidesPerView={6} loop={true}>
          {data.data.data.map((categories) => (
            <SwiperSlide key={categories._id}>
              <div className="h-64 ">
                <img
                  src={categories.image}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="mt-2">{categories.name}</h3>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </>
  );
}
