import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Loading from "../../components/Loading/Loading";
import { useParams } from "react-router-dom";
import { CartContext } from "../../context/Cart.context";
import ReactImageGallery from "react-image-gallery";

import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import Card from "../../components/Card/Card";

export default function ProductDetails() {
  let { id } = useParams();
  let { addProductToCart } = useContext(CartContext);
  let [productinfo, setProductInfo] = useState(null);
  let [relatedProduct, setRelatedProduct] = useState(null);
  async function getProductDetails() {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/products/${id}`,
        method: "GET",
      };
      let { data } = await axios.request(options);
      console.log(data.data);
      setProductInfo(data.data);
    } catch (error) {
      console.log(error);
    }
  }
  async function getRelatedProducts() {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/products?category[in]=${productinfo.category._id}`,
        method: "GET",
      };
      let { data } = await axios.request(options);
      console.log(data.data);
      setRelatedProduct(data.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getProductDetails();
  }, [id]);
  useEffect(() => {
    if (productinfo === null) return;
    getRelatedProducts();
  }, [productinfo]);

  return (
    <>
      {productinfo === null ? (
        <Loading />
      ) : (
        <>
          <section>
            <div className="grid grid-cols-12  gap-8">
              <div className="col-span-3">
                <ReactImageGallery
                  items={productinfo.images.map((image) => {
                    return {
                      original: image,
                      thumbnail: image,
                    };
                  })}
                  showPlayButton={false}
                  showNav={false}
                />
              </div>
              <div className="col-span-9 space-y-3">
                <div className="space-y-1">
                  <h2 className="text-gray-700 text-xl font-semibold">
                    {productinfo.title}
                  </h2>
                  <h3 className="text-primary-600 font-semibold">
                    {productinfo.category.name}
                  </h3>
                </div>
                <p className="text-gray-400 text-sm">
                  {productinfo.description}
                </p>
                <div className="flex justify-between">
                  <h4>
                    <span>{productinfo.price}</span> L.E
                  </h4>
                  <div>
                    <i className="fa-solid fa-star text-yellow-400 mr-2"></i>
                    <span>{productinfo.ratingsAverage}</span>
                  </div>
                </div>
                <button
                  className="btn w-full"
                  onClick={() => {
                    addProductToCart({ productId: id });
                  }}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-gray-600 my-8">
              Related Products
            </h2>
            {relatedProduct === null ? (
              <Loading />
            ) : (
              <Swiper slidesPerView={6} spaceBetween={15}>
                {relatedProduct.map((product) => (
                  <SwiperSlide key={product.id}>
                    <Card productInfo={product} />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </section>
        </>
      )}
    </>
  );
}
