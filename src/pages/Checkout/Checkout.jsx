import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { userContext } from "../../context/User.context";
import axios from "axios";
import { CartContext } from "../../context/Cart.context";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

export default function Checkout() {
  const { token } = useContext(userContext);
  const { cartInfo } = useContext(CartContext);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      shippingAddress: {
        details: "",
        phone: "",
        city: "",
      },
    },
    onSubmit: (values) => {
      if (paymentMethod === "cash") {
        createCashOrder(values);
      } else createOnlineOrder(values);
    },
  });
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
      <section>
        <h1 className="text-gray-600 font-semibold text-xl">
          Shipping Address
        </h1>
        <form className="space-y-6 py-5" onSubmit={formik.handleSubmit}>
          <div className="city">
            <input
              type="text"
              className="form-controll w-full"
              placeholder="City"
              value={formik.values.shippingAddress.city}
              name="shippingAddress.city"
              onChange={formik.handleChange}
            />
          </div>
          <div className="phone">
            <input
              type="tel"
              className="form-controll w-full"
              placeholder="Phone"
              value={formik.values.shippingAddress.phone}
              name="shippingAddress.phone"
              onChange={formik.handleChange}
            />
          </div>
          <div className="details">
            <textarea
              id=""
              className="form-controll w-full"
              placeholder="Details"
              value={formik.values.shippingAddress.details}
              name="shippingAddress.details"
              onChange={formik.handleChange}
            ></textarea>
          </div>
          <div className="space-x-3">
            <button
              type="submit"
              className="btn bg-blue-500 hover:bg-blue-800"
              onClick={() => {
                setPaymentMethod("cash");
              }}
            >
              Cash Order
            </button>

            <button
              type="submit"
              className="btn"
              onClick={() => {
                setPaymentMethod("online");
              }}
            >
              Online Payment
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
