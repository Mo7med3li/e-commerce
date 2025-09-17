import { useContext, useEffect } from "react";
import { CartContext } from "../../context/Cart.context";
import Loading from "../../components/Loading/Loading";
import CartItem from "../../components/CartItem/CartItem";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Cart() {
  // Context
  const { getCartProducts, cartInfo, deleteCart } = useContext(CartContext);

  // Effects
  useEffect(() => {
    getCartProducts();
  }, []);
  return (
    <>
      <Helmet>
        <title>Cart </title>
        <meta name="description" content="FreshCart| Cart Page " />
      </Helmet>
      {cartInfo === null ? (
        <Loading />
      ) : (
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <div className="flex items-center space-x-4 mb-4">
                <div className="bg-primary-100 rounded-full p-3">
                  <i className="fa-solid fa-shopping-cart text-primary-600 text-2xl"></i>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    Shopping Cart
                  </h1>
                  <p className="text-gray-600">
                    Review your items before checkout
                  </p>
                </div>
              </div>
            </div>

            {cartInfo.numOfCartItems === 0 ? (
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-12 text-center">
                <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                  <i className="fa-solid fa-shopping-cart text-4xl text-gray-400"></i>
                </div>
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                  Your cart is empty
                </h2>
                <p className="text-gray-500 mb-8 max-w-md mx-auto">
                  Looks like you haven't added any items to your cart yet. Start
                  shopping to fill it up!
                </p>
                <Link to="/" className="btn inline-flex items-center space-x-2">
                  <i className="fa-solid fa-home"></i>
                  <span>Continue Shopping</span>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                    <div className="bg-gradient-to-r from-primary-50 to-primary-100 px-6 py-4 border-b border-gray-200">
                      <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                        <i className="fa-solid fa-list mr-2 text-primary-600"></i>
                        Cart Items ({cartInfo.numOfCartItems})
                      </h2>
                    </div>
                    <div className="p-6 space-y-4">
                      {cartInfo.data.products.map((products) => (
                        <CartItem productInfo={products} key={products._id} />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden sticky top-8">
                    <div className="bg-gradient-to-r from-primary-50 to-primary-100 px-6 py-4 border-b border-gray-200">
                      <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                        <i className="fa-solid fa-receipt mr-2 text-primary-600"></i>
                        Order Summary
                      </h2>
                    </div>

                    <div className="p-6 space-y-6">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">
                            Subtotal ({cartInfo.numOfCartItems} items)
                          </span>
                          <span className="font-semibold text-gray-900">
                            {cartInfo.data.totalCartPrice} L.E
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Shipping</span>
                          <span className="font-semibold text-green-600">
                            Free
                          </span>
                        </div>
                        <div className="border-t border-gray-200 pt-4">
                          <div className="flex justify-between items-center">
                            <span className="text-lg font-semibold text-gray-900">
                              Total
                            </span>
                            <span className="text-2xl font-bold text-primary-600">
                              {cartInfo.data.totalCartPrice} L.E
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Link
                          to="/checkout"
                          className="w-full btn flex items-center justify-center space-x-2 hover:bg-primary-700 transition-colors duration-200"
                        >
                          <i className="fa-solid fa-arrow-right"></i>
                          <span>Proceed to Checkout</span>
                        </Link>

                        <button
                          className="w-full bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
                          onClick={deleteCart}
                        >
                          <i className="fa-solid fa-trash"></i>
                          <span>Clear Cart</span>
                        </button>
                      </div>

                      <div className="text-center">
                        <Link
                          to="/"
                          className="text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
                        >
                          <i className="fa-solid fa-arrow-left mr-1"></i>
                          Continue Shopping
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
