import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { object, string } from "yup";

export default function ForgetPassword() {
  const navigate = useNavigate();
  let [emailError, setEmailError] = useState(null);
  const validationSchema = object({
    email: string().required("Email is required").email("Enter Valid Email"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values) => {
      forgetPasswordSubmit(values);
    },
    validationSchema,
  });
  async function forgetPasswordSubmit(values) {
    let toastId = toast.loading("sending your Email...");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        method: "POST",
        data: values,
      };
      let { data } = await axios.request(options);
      console.log(data);
      if (data.statusMsg === "success") {
        toast.success(data.message);
        setTimeout(() => {
          navigate("/verfiy-code");
        }, 2000);
      }
    } catch (error) {
      setEmailError(error.response.data.message);
      toast.error(error.response.data.message);
    } finally {
      toast.dismiss(toastId);
    }
  }
  return (
    <>
      <Helmet>
        <title>forget-password</title>
        <meta name="description" content="FreshCart| forget password" />
      </Helmet>
      <h1 className="font-semibold text-2xl">please enter your email</h1>
      <form action="" className="my-5" onSubmit={formik.handleSubmit}>
        <div className="py-4">
          <input
            type="email"
            className="form-controll w-full py-3"
            placeholder="Email"
            value={formik.values.email}
            name="email"
            onChange={formik.handleChange}
          />
        </div>
        {formik.errors.email && (
          <p className="pb-3 text-red-600 text-lg ">* {formik.errors.email}</p>
        )}
        {emailError && (
          <p className="pb-3 text-red-600 text-lg ">* {emailError}</p>
        )}
        <button type="submit" className="btn">
          Verfiy
        </button>
      </form>
    </>
  );
}
