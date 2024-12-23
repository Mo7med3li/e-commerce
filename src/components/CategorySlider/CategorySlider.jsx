import { useContext, useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import { Autoplay } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import { CategoryContext } from "../../context/Category.context";

export default function CategorySlider() {
  let { data, isLoading } = useContext(CategoryContext);

  if (isLoading) return <Loading />;
  return (
    <>
      <section className="py-3">
        <h2 className="font-semibold text-lg text-slate-900 my-2">
          Shop Popular Categories
        </h2>

        <Swiper
          slidesPerView={1}
          loop={true}
          modules={[Autoplay]}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            300: {
              slidesPerView: 2,
            },
            640: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 4,
            },
            1024: {
              slidesPerView: 7,
            },
          }}
        >
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
