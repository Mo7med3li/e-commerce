import axios from "axios";
import { useContext, useEffect, useState, useCallback } from "react";
import Loading from "../../components/Loading/Loading";
import { useParams } from "react-router-dom";
import { CartContext } from "../../context/Cart.context";
import ReactImageGallery from "react-image-gallery";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import Card from "../../components/Card/Card";
import UseOnline from "../../hooks/UseOnline";
import { Helmet } from "react-helmet";
import { Autoplay } from "swiper/modules";

export default function ProductDetails() {
  // Hooks
  const isOnline = UseOnline();

  // Params
  let { id } = useParams();

  // Context
  let { addProductToCart } = useContext(CartContext);

  // States
  let [productInfo, setProductInfo] = useState(null);
  let [relatedProduct, setRelatedProduct] = useState(null);

  // Functions
  const getProductDetails = useCallback(async () => {
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
  }, [id]);

  const getRelatedProducts = useCallback(async () => {
    if (!productInfo?.category?._id) return;
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/products?category[in]=${productInfo.category._id}`,
        method: "GET",
      };
      let { data } = await axios.request(options);
      console.log(data.data);
      setRelatedProduct(data.data);
    } catch (error) {
      console.log(error);
    }
  }, [productInfo?.category?._id]);
  useEffect(() => {
    getProductDetails();
  }, [getProductDetails]);
  useEffect(() => {
    getRelatedProducts();
  }, [getRelatedProducts]);

  return (
    <>
      <Helmet>
        <title>Product Details</title>
        <meta
          name="description"
          content="FreshCart| Product Details Page - Detailed information about the product"
        />
      </Helmet>
      {productInfo === null ? (
        <Loading />
      ) : (
        <>
          <Helmet>
            <title>{productInfo.title}</title>
          </Helmet>

          {/* Main Product Section */}
          <section className="py-8 bg-gradient-to-br from-slate-50 to-white">
            <div className="container">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                {/* Product Images */}
                <div className="lg:col-span-5">
                  <div className="bg-white rounded-3xl shadow-xl p-6 border border-slate-100">
                    <ReactImageGallery
                      items={productInfo.images.map((image) => {
                        return {
                          original: image,
                          thumbnail: image,
                        };
                      })}
                      showPlayButton={false}
                      showNav={false}
                      showThumbnails={true}
                      thumbnailPosition="bottom"
                      showFullscreenButton={true}
                      useBrowserFullscreen={false}
                    />
                  </div>
                </div>

                {/* Product Information */}
                <div className="lg:col-span-7">
                  <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100 h-fit">
                    {/* Category Badge */}
                    <div className="mb-4">
                      <span className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                        {productInfo.category.name}
                      </span>
                    </div>

                    {/* Product Title */}
                    <h1 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4 leading-tight">
                      {productInfo.title}
                    </h1>

                    {/* Rating */}
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="flex items-center space-x-1 bg-gradient-to-r from-yellow-50 to-yellow-100 px-4 py-2 rounded-full border border-yellow-200">
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <i
                              key={i}
                              className={`fa-solid fa-star text-sm ${
                                i < Math.floor(productInfo.ratingsAverage)
                                  ? "text-yellow-400"
                                  : "text-slate-300"
                              }`}
                            ></i>
                          ))}
                        </div>
                        <span className="text-sm font-bold text-slate-700 ml-2">
                          {productInfo.ratingsAverage}
                        </span>
                      </div>
                      <span className="text-sm text-slate-500">
                        ({productInfo.ratingsQuantity} reviews)
                      </span>
                    </div>

                    {/* Price */}
                    <div className="mb-6">
                      <div className="flex items-center space-x-2">
                        <span className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                          {productInfo.price}
                        </span>
                        <span className="text-lg text-slate-500 font-medium">
                          EGP
                        </span>
                      </div>
                      <p className="text-sm text-slate-500 mt-1">
                        Price includes all taxes and fees
                      </p>
                    </div>

                    {/* Description */}
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-slate-800 mb-3">
                        Description
                      </h3>
                      <p className="text-slate-600 leading-relaxed">
                        {productInfo.description}
                      </p>
                    </div>

                    {/* Product Features */}
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-slate-800 mb-4">
                        Features
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                          <i className="fa-solid fa-truck text-primary-600"></i>
                          <span className="text-sm font-medium text-slate-700">
                            Free Shipping
                          </span>
                        </div>
                        <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                          <i className="fa-solid fa-shield-check text-green-500"></i>
                          <span className="text-sm font-medium text-slate-700">
                            Secure Payment
                          </span>
                        </div>
                        <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                          <i className="fa-solid fa-undo text-blue-500"></i>
                          <span className="text-sm font-medium text-slate-700">
                            Easy Returns
                          </span>
                        </div>
                        <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                          <i className="fa-solid fa-headset text-purple-500"></i>
                          <span className="text-sm font-medium text-slate-700">
                            24/7 Support
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Add to Cart Button */}
                    {isOnline ? (
                      <button
                        className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 shadow-lg hover:shadow-xl flex items-center justify-center space-x-3"
                        onClick={() => {
                          addProductToCart({ productId: id });
                        }}
                      >
                        <i className="fa-solid fa-cart-shopping text-lg"></i>
                        <span>Add to Cart</span>
                      </button>
                    ) : (
                      <div className="w-full bg-slate-200 text-slate-500 font-bold py-4 px-6 rounded-2xl text-center">
                        <i className="fa-solid fa-wifi text-lg mr-2"></i>
                        Offline - Cannot add to cart
                      </div>
                    )}

                    {/* Additional Info */}
                    <div className="mt-6 pt-6 border-t border-slate-200">
                      <div className="flex items-center justify-between text-sm text-slate-500">
                        <div className="flex items-center space-x-2">
                          <i className="fa-solid fa-check-circle text-green-500"></i>
                          <span>In Stock</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <i className="fa-solid fa-clock text-blue-500"></i>
                          <span>Usually ships within 24 hours</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Related Products Section */}
          <section className="py-12 bg-gradient-to-br from-white to-slate-50">
            <div className="container">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
                  Related Products
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  Discover more amazing products from the same category
                </p>
              </div>

              {relatedProduct === null ? (
                <div className="flex justify-center">
                  <Loading />
                </div>
              ) : (
                <div className="relative">
                  <Swiper
                    slidesPerView={1}
                    spaceBetween={20}
                    modules={[Autoplay]}
                    autoplay={{
                      delay: 3000,
                      disableOnInteraction: false,
                    }}
                    breakpoints={{
                      640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                      },
                      768: {
                        slidesPerView: 3,
                        spaceBetween: 24,
                      },
                      1024: {
                        slidesPerView: 4,
                        spaceBetween: 24,
                      },
                      1280: {
                        slidesPerView: 4,
                        spaceBetween: 24,
                      },
                    }}
                    className="related-products-swiper"
                  >
                    {relatedProduct.map((product) => (
                      <SwiperSlide key={product.id}>
                        <Card productInfo={product} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              )}
            </div>
          </section>
        </>
      )}
    </>
  );
}
