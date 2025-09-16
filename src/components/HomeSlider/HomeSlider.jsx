import sliderImage1 from "../../assets/images/slider-image-1.jpeg";
import sliderImage2 from "../../assets/images/slider-image-2.jpeg";
import sliderImage3 from "../../assets/images/slider-image-3.jpeg";
import sliderImage4 from "../../assets/images/shop-now.png";
import splach from "../../assets/images/splash.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

export default function HomeSlider() {
  return (
    <>
      <section className="mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Main hero slider */}
          <div className="lg:col-span-8">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-100">
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                loop={true}
                autoplay={{ delay: 2200 }}
                navigation
                pagination={{ clickable: true }}
                className="h-full"
              >
                {[
                  sliderImage4,
                  splach,
                  sliderImage3,
                  sliderImage2,
                  sliderImage1,
                ].map((img, idx) => (
                  <SwiperSlide key={idx}>
                    <img
                      src={img}
                      alt={`hero-${idx + 1}`}
                      className="w-full h-[260px] md:h-[360px] lg:h-[420px] object-cover"
                      loading="lazy"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              {/* subtle gradient overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>
          </div>

          {/* Side promos */}
          <div className="lg:col-span-4 grid grid-rows-2 gap-4">
            <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-100">
              <img
                src={splach}
                alt="promo-1"
                className="w-full h-[160px] md:h-[172px] lg:h-[202px] object-cover object-center"
                loading="lazy"
              />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-100">
              <img
                src={sliderImage1}
                alt="promo-2"
                className="w-full h-[160px] md:h-[172px] lg:h-[202px] object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
