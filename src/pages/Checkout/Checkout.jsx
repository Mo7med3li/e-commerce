import { useFormik } from "formik";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../context/User.context";
import axios from "axios";
import { CartContext } from "../../context/Cart.context";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

export default function Checkout() {
  // Contexts
  const { token } = useContext(userContext);
  const { cartInfo } = useContext(CartContext);

  // States
  const [paymentMethod, setPaymentMethod] = useState(null);

  // Navigation
  const navigate = useNavigate();

  // Formik
  const formik = useFormik({
    initialValues: {
      shippingAddress: {
        details: "",
        phone: "",
        city: "",
      },
    },

    // Submit Handler
    onSubmit: (values) => {
      if (paymentMethod === "cash") {
        createCashOrder(values);
      } else createOnlineOrder(values);
    },
  });

  // Functions
  async function createCashOrder(values) {
    const toastId = toast.loading("Creating the order....");
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/${cartInfo.cartId}`,
        method: "POST",
        headers: {
          token,
        },
        data: values,
      };
      let { data } = await axios.request(options);
      if (data.status === "success") {
        toast.success("Order is Created");
        setTimeout(() => {
          navigate("/allorders");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(toastId);
    }
  }

  async function createOnlineOrder(values) {
    const toastId = toast.loading("Creating the order....");

    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartInfo.cartId}?url=${location.origin}`,
        method: "POST",
        headers: { token },
        data: values,
      };
      let { data } = await axios.request(options);

      if (data.status === "success") {
        toast.success("Order is Created");
        setTimeout(() => {
          toast.loading("Going to payment ");
          location.href = data.session.url;
        }, 2000);
      }
    } catch (error) {
    } finally {
      toast.dismiss(toastId);
    }
  }
  return (
    <>
      <Helmet>
        <title>Checkout </title>
        <meta name="description" content="FreshCart| Checkout Page" />
      </Helmet>

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Checkout
              </h1>
              <p className="text-gray-600">
                Complete your order with shipping details
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-primary-50 to-primary-100 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="bg-white rounded-lg p-2 shadow-sm">
                    <i className="fa-solid fa-truck text-primary-600 text-lg"></i>
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      Shipping Address
                    </h2>
                    <p className="text-sm text-gray-600">
                      Enter your delivery information
                    </p>
                  </div>
                </div>
              </div>

              <form className="p-6 space-y-6" onSubmit={formik.handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      <i className="fa-solid fa-city mr-2 text-primary-600"></i>
                      City
                    </label>
                    <input
                      type="text"
                      className="form-controll w-full"
                      placeholder="Enter your city"
                      value={formik.values.shippingAddress.city}
                      name="shippingAddress.city"
                      onChange={formik.handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      <i className="fa-solid fa-phone mr-2 text-primary-600"></i>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="form-controll w-full"
                      placeholder="Enter your phone number"
                      value={formik.values.shippingAddress.phone}
                      name="shippingAddress.phone"
                      onChange={formik.handleChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    <i className="fa-solid fa-map-marker-alt mr-2 text-primary-600"></i>
                    Address Details
                  </label>
                  <textarea
                    className="form-controll w-full min-h-[100px] resize-none"
                    placeholder="Enter your complete address details"
                    value={formik.values.shippingAddress.details}
                    name="shippingAddress.details"
                    onChange={formik.handleChange}
                  ></textarea>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <i className="fa-solid fa-credit-card mr-2 text-primary-600"></i>
                    Payment Method
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      type="submit"
                      className="group flex items-center justify-center space-x-3 p-4 border-2 border-blue-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all duration-200"
                      onClick={() => {
                        setPaymentMethod("cash");
                      }}
                    >
                      <div className="bg-blue-100 rounded-full p-2 group-hover:bg-blue-200 transition-colors duration-200">
                        <i className="fa-solid fa-money-bill text-blue-600"></i>
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-gray-900">
                          Cash on Delivery
                        </div>
                        <div className="text-sm text-gray-600">
                          Pay when you receive
                        </div>
                      </div>
                    </button>

                    <button
                      type="submit"
                      className="group flex items-center justify-center space-x-3 p-4 border-2 border-primary-200 rounded-lg hover:border-primary-400 hover:bg-primary-50 transition-all duration-200"
                      onClick={() => {
                        setPaymentMethod("online");
                      }}
                    >
                      <div className="bg-primary-100 rounded-full p-2 group-hover:bg-primary-200 transition-colors duration-200">
                        <i className="fa-solid fa-credit-card text-primary-600"></i>
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-gray-900">
                          Online Payment
                        </div>
                        <div className="text-sm text-gray-600">
                          Pay securely online
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
