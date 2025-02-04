import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { userContext } from "../../context/User.context";
import { Helmet } from "react-helmet";

export default function Login() {
  let { setToken } = useContext(userContext);
  const navigate = useNavigate();
  const [emailPaswordError, setEmailPasswordError] = useState(null);
  const validationSchema = object({
    email: string().required("Email is required"),
    password: string().required("Password is required"),
  });
  async function sendLoginData(values) {
    let loadingToast = toast.loading("waiting");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signin",
        method: "POST",
        data: values,
      };
      const { data } = await axios.request(options);

      if (data.message === "success") {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        toast.success("Login Completed");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      setEmailPasswordError(error.response.data.message);
      toast.error(error.response.data.message);
    } finally {
      toast.dismiss(loadingToast);
    }
  }
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: sendLoginData,
    validationSchema,
  });
  return (
    <>
      <Helmet>
        <title>Login </title>
        <meta name="description" content="FreshCart| Login Page" />
      </Helmet>
      <h3 className=" text-xl font-semibold text-slate-700">
        <i className="fa-regular fa-user mr-2"></i>
        Welcome Back
      </h3>
      <form className="space-y-4 py-4" onSubmit={formik.handleSubmit}>
        <div className="email space-y-2">
          <h3>email:</h3>
          <input
            type="email"
            placeholder="Type your email address"
            className=" form-controll w-full"
            value={formik.values.email}
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        {formik.errors.email && formik.touched.email && (
          <p className="text-red-600">*{formik.errors.email}</p>
        )}

        <div className="password space-y-2 ">
          <h3>password:</h3>
          <input
            type="password"
            placeholder="Type your password"
            className=" form-controll w-full"
            value={formik.values.password}
            onChange={formik.handleChange}
            name="password"
            onBlur={formik.handleBlur}
          />
          {formik.errors.password && formik.touched.password && (
            <p className="text-red-600">*{formik.errors.password}</p>
          )}
          {emailPaswordError && (
            <p className="text-red-600">*{emailPaswordError}</p>
          )}
        </div>
        <div>
          <Link
            to="/forget-password"
            className="font-semibold text-lg hover:text-primary-600 transition-colors duration-500"
          >
            forget your password ?
          </Link>
        </div>
        <button type="submit" className="btn w-full">
          login
        </button>
      </form>
    </>
  );
}
