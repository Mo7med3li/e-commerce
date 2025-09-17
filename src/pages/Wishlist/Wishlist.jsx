import { useContext, useEffect } from "react";
import Loading from "../../components/Loading/Loading";
import { WishlistContext } from "../../context/Wishlist.context";
import { CartContext } from "../../context/Cart.context";
import { Helmet } from "react-helmet";

export default function Wishlist() {
  // Context
  let { listInfo, getWishList, deleteFromWishlist } =
    useContext(WishlistContext);
  let { addProductToCart } = useContext(CartContext);

  // Effects
  useEffect(() => {
    getWishList();
  }, []);
  return (
    <>
      <Helmet>
        <title>Wishlist</title>
        <meta name="description" content="FreshCart| Wishlist Component" />
      </Helmet>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              My Wishlist
            </h1>
            <p className="text-gray-600">Save your favorite items for later</p>
          </div>

          {listInfo === null ? (
            <Loading />
          ) : (
            <>
              {listInfo.length === 0 ? (
                <div className="text-center py-16">
                  <div className="bg-white rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <i className="fa-solid fa-heart text-4xl text-gray-300"></i>
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                    Your wishlist is empty
                  </h2>
                  <p className="text-gray-500 mb-6">
                    Start adding items you love to your wishlist
                  </p>
                  <button className="btn">
                    <i className="fa-solid fa-shopping-bag mr-2"></i>
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {listInfo.map((list) => {
                    return (
                      <div
                        key={list.id}
                        className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group"
                      >
                        <div className="relative">
                          <div className="aspect-square overflow-hidden">
                            <img
                              src={list.imageCover}
                              alt={list.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <button
                            className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-lg hover:bg-red-50 transition-colors duration-200"
                            onClick={() => {
                              deleteFromWishlist({ productId: list.id });
                            }}
                            title="Remove from wishlist"
                          >
                            <i className="fa-solid fa-heart text-red-500 text-lg"></i>
                          </button>
                        </div>

                        <div className="p-6">
                          <h2 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                            {list.title}
                          </h2>

                          <div className="flex items-center justify-between mb-4">
                            <span className="text-2xl font-bold text-primary-600">
                              {list.price} EGP
                            </span>
                          </div>

                          <button
                            className="w-full btn flex items-center justify-center space-x-2 hover:bg-primary-700 transition-colors duration-200"
                            onClick={() => {
                              addProductToCart({ productId: list.id });
                            }}
                          >
                            <i className="fa-solid fa-cart-plus"></i>
                            <span>Add to Cart</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
