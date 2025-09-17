import axios from "axios";
import { useContext, useEffect, useState, useCallback } from "react";
import { userContext } from "../../context/User.context";
import { jwtDecode } from "jwt-decode";
import Loading from "../../components/Loading/Loading";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Orders() {
  // Context
  const { token } = useContext(userContext);

  // Token
  const { id } = jwtDecode(token);

  // States
  const [orders, setOrders] = useState(null);

  //functions
  const getOrders = useCallback(async () => {
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
      method: "GET",
    };
    let { data } = await axios.request(options);

    setOrders(data);
  }, [id]);

  // Effects
  useEffect(() => {
    getOrders();
  }, [getOrders]);
  return (
    <>
      <Helmet>
        <title>Orders</title>
        <meta name="description" content="FreshCart| Orders Page" />
      </Helmet>
      {orders ? (
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                My Orders
              </h1>
              <p className="text-gray-600">
                Track and manage your order history
              </p>
            </div>

            <div className="space-y-6">
              {orders.map((orders) => {
                return (
                  <div
                    key={orders.id}
                    className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="bg-gradient-to-r from-primary-50 to-primary-100 px-6 py-4 border-b border-gray-200">
                      <header className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                          <div className="bg-white rounded-lg p-3 shadow-sm">
                            <i className="fa-solid fa-receipt text-primary-600 text-xl"></i>
                          </div>
                          <div>
                            <h2 className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                              Order ID
                            </h2>
                            <span className="text-xl font-bold text-gray-900">
                              #{orders.id}
                            </span>
                          </div>
                        </div>
                        <div className="flex space-x-3">
                          {orders.isPaid ? (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                              <i className="fa-solid fa-check-circle mr-1"></i>
                              Paid
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                              <i className="fa-solid fa-times-circle mr-1"></i>
                              Not Paid
                            </span>
                          )}
                          {orders.isDelivered ? (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                              <i className="fa-solid fa-truck mr-1"></i>
                              Delivered
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                              <i className="fa-solid fa-clock mr-1"></i>
                              Under delivery
                            </span>
                          )}
                        </div>
                      </header>
                    </div>

                    <div className="p-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-6">
                        {orders.cartItems.map((products) => {
                          return (
                            <div
                              key={products._id}
                              className="group bg-gray-50 rounded-lg overflow-hidden border border-gray-200 hover:shadow-md transition-all duration-300 hover:border-primary-300"
                            >
                              <div className="aspect-square overflow-hidden">
                                <img
                                  src={products.product.imageCover}
                                  alt={products.product.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                              </div>
                              <div className="p-4">
                                <h3 className="font-semibold text-sm text-gray-800 line-clamp-2 mb-2 group-hover:text-primary-600 transition-colors">
                                  <Link
                                    to={`/products/${products.product.id}`}
                                    className="hover:underline"
                                  >
                                    {products.product.title}
                                  </Link>
                                </h3>
                                <div className="flex items-center justify-between text-sm">
                                  <div className="flex items-center space-x-1">
                                    <span className="text-gray-600 font-medium">
                                      Qty:
                                    </span>
                                    <span className="font-bold text-gray-900">
                                      {products.count}
                                    </span>
                                  </div>
                                  <span className="font-bold text-primary-600">
                                    {products.price} L.E
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <div className="bg-primary-50 rounded-lg p-4 border border-primary-200">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <i className="fa-solid fa-calculator text-primary-600"></i>
                            <span className="text-gray-700 font-medium">
                              Total Order Price:
                            </span>
                          </div>
                          <span className="text-2xl font-bold text-primary-600">
                            {orders.totalOrderPrice} L.E
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
