import axios from "axios";
import { useEffect, useState } from "react";
import sliderImage3 from "../../assets/images/slider-image-3.jpeg";
import Loading from "../Loading/Loading";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";

export default function CategorySlider() {
  const [categories, setCategories] = useState(null);
  async function getCategories() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/categories",
      method: "GET",
    };
    let { data } = await axios.request(options);
    console.log(data.data);
    setCategories(data.data);
  }
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <>
      <section className="py-3">
        <h2 className="font-semibold text-lg text-slate-900 my-2">
          Shop Popular Categories
        </h2>
        {!categories ? (
          <Loading />
        ) : (
          <Swiper slidesPerView={6} loop={true}>
            {categories.map((categories) => (
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
        )}
      </section>
    </>
  );
}
