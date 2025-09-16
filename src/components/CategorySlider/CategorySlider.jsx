import { useContext } from "react";
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
      <section className="py-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-xl text-slate-900">
            Shop Popular Categories
          </h2>
          <span className="text-sm text-slate-500">Explore by interests</span>
        </div>

        <Swiper
          slidesPerView={1}
          loop={true}
          modules={[Autoplay]}
          autoplay={{
            delay: 2200,
            disableOnInteraction: false,
          }}
          breakpoints={{
            300: {
              slidesPerView: 2,
              spaceBetween: 12,
            },
            640: {
              slidesPerView: 3,
              spaceBetween: 14,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 16,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 18,
            },
          }}
        >
          {data.data.data.map((category) => (
            <SwiperSlide key={category._id}>
              <div className="group rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 bg-white">
                <div className="h-44 md:h-48 lg:h-52 relative">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-3 text-center">
                  <h3 className="text-slate-800 font-semibold line-clamp-1">
                    {category.name}
                  </h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </>
  );
}
