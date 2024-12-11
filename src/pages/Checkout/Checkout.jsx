import { useFormik } from "formik";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { object, string } from "yup";
import { userContext } from "../../context/User.context";
import axios from "axios";

export default function Checkout() {
  const { token } = useContext(userContext);
  const formik = useFormik({
    initialValues: {
      shippingAddress: {
        details: "",
        phone: "",
        city: "",
      },
    },
  });

  return (
    <>
      <section>
        <h1 className="text-gray-600 font-semibold text-xl">
          Shipping Address
        </h1>
        <form className="space-y-6 py-5">
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
            <button type="submit" className="btn bg-blue-500 hover:bg-blue-800">
              Cash Order
            </button>

            <button type="submit" className="btn">
              Online Payment
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
