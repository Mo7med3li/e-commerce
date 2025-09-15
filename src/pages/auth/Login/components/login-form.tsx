import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { userContext } from "../../../../context/User.context";

const LoginForm = () => {
  // Context
  let { setToken } = useContext(userContext);

  //Navigation
  const navigate = useNavigate();

  // States
  const [emailPaswordError, setEmailPasswordError] = useState(null);

  // Schema
  const validationSchema = object({
    email: string().required("Email is required"),
    password: string().required("Password is required"),
  });

  // Submit handler
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

  // Form
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: sendLoginData,
    validationSchema,
  });

  return (
    <form className="space-y-6" onSubmit={formik.handleSubmit}>
      {/* Email Field */}
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-slate-700"
        >
          Email Address
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <i className="fa-regular fa-envelope text-slate-400"></i>
          </div>
          <input
            id="email"
            type="email"
            placeholder="Enter your email address"
            className="form-controll w-full pl-10 pr-4 py-3 text-base border-2 border-slate-200 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all duration-200"
            value={formik.values.email}
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        {formik.errors.email && formik.touched.email && (
          <div className="flex items-center space-x-1 text-red-600 text-sm">
            <i className="fa-solid fa-exclamation-circle text-xs"></i>
            <span>{formik.errors.email}</span>
          </div>
        )}
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-slate-700"
        >
          Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <i className="fa-solid fa-lock text-slate-400"></i>
          </div>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            className="form-controll w-full pl-10 pr-4 py-3 text-base border-2 border-slate-200 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all duration-200"
            value={formik.values.password}
            onChange={formik.handleChange}
            name="password"
            onBlur={formik.handleBlur}
          />
        </div>
        {formik.errors.password && formik.touched.password && (
          <div className="flex items-center space-x-1 text-red-600 text-sm">
            <i className="fa-solid fa-exclamation-circle text-xs"></i>
            <span>{formik.errors.password}</span>
          </div>
        )}
        {emailPaswordError && (
          <div className="flex items-center space-x-1 text-red-600 text-sm">
            <i className="fa-solid fa-exclamation-circle text-xs"></i>
            <span>{emailPaswordError}</span>
          </div>
        )}
      </div>

      {/* Forgot Password Link */}
      <div className="flex justify-end">
        <Link
          to="/forget-password"
          className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors duration-200 hover:underline"
        >
          Forgot your password?
        </Link>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 shadow-lg hover:shadow-xl"
      >
        <span className="flex items-center justify-center space-x-2">
          <span>Sign In</span>
          <i className="fa-solid fa-arrow-right text-sm"></i>
        </span>
      </button>
    </form>
  );
};

export default LoginForm;
