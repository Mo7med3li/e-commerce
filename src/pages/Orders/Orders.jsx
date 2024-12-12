import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../../context/User.context";
import { jwtDecode } from "jwt-decode";
import Loading from "../../components/Loading/Loading";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Orders() {
  const { token } = useContext(userContext);
  const { id } = jwtDecode(token);
  const [orders, setOrders] = useState(null);
  async function getOrders() {
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
      method: "GET",
    };
    let { data } = await axios.request(options);

    setOrders(data);
  }
  useEffect(() => {
    getOrders();
  }, []);
  return (
    <>
      <Helmet>
        <title>Orders</title>
        <meta name="description" content="FreshCart| Oreders Page" />
      </Helmet>
      {orders ? (
        <section>
          {orders.map((orders) => {
            return (
              <div
                key={orders.id}
                className="border-gray-400 rounded-lg border-2 border-opacity-25  p-3 space-y-3"
              >
                <header className="  flex justify-between items-center ">
                  <div>
                    <h2 className="text-gray-500 ">Order ID</h2>
                    <span className="texr-lg font-semibold text-gray-800">
                      #{orders.id}
                    </span>
                  </div>
                  <div className="space-x-3">
                    {orders.isPaid ? (
                      <span className="inline-block rounded-xl text-white font-semibold bg-lime-600 px-3 py-1">
                        Paid
                      </span>
                    ) : (
                      <span className="inline-block rounded-xl text-white font-semibold bg-red-600 px-3 py-1">
                        Not Paid
                      </span>
                    )}
                    {orders.isDelivered ? (
                      <span className="inline-block rounded-xl text-white font-semibold bg-lime-600 px-3 py-1">
                        DElivered
                      </span>
                    ) : (
                      <span className="inline-block rounded-xl text-white font-semibold bg-blue-600 px-3 py-1">
                        Under delivery
                      </span>
                    )}
                  </div>
                </header>
                <div className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 md:gap-4">
                  {orders.cartItems.map((products) => {
                    return (
                      <div
                        key={products._id}
                        className="product-item overflow-hidden border-2 rounded-lg border-gray-400 border-opacity-25"
                      >
                        <img
                          src={products.product.imageCover}
                          alt={products.product.title}
                          className="w-full object-cover"
                        />
                        <div className="p-3">
                          <h3 className="font-semibold text-lg text-gray-700 line-clamp-2">
                            <Link to={`/products/${products.product.id}`}>
                              {products.product.title}
                            </Link>
                          </h3>
                          <div className="flex  items-center justify-between mt-2">
                            <p>
                              <span className="font-bold ">Count: </span>
                              {products.count}
                            </p>
                            <span>{products.price} L.E</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <p>
                  Total Order Price is{" "}
                  <span className="text-primary-600 font-bold">
                    {orders.totalOrderPrice}
                  </span>{" "}
                  L.E
                </p>
              </div>
            );
          })}
        </section>
      ) : (
        <Loading />
      )}
    </>
  );
}
