import sliderImage1 from "../../assets/images/slider-image-1.jpeg";
import sliderImage2 from "../../assets/images/slider-image-2.jpeg";
import sliderImage3 from "../../assets/images/slider-image-3.jpeg";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
export default function HomeSlider() {
  return (
    <>
      <div className="grid grid-cols-12 mb-4">
        <div className=" col-span-8">
          <Swiper loop={true}>
            <SwiperSlide>
              <img
                src={sliderImage3}
                alt=""
                className="w-full object-cover h-full "
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={sliderImage3}
                alt=""
                className="w-full object-cover h-full "
              />
            </SwiperSlide>{" "}
            <SwiperSlide>
              <img
                src={sliderImage3}
                alt=""
                className="w-full object-cover h-full "
              />
            </SwiperSlide>
          </Swiper>
        </div>
        <div className=" col-span-4">
          <img src={sliderImage2} alt="" className="w-full " />
          <img src={sliderImage1} alt="" className="w-full " />
        </div>
      </div>
    </>
  );
}
