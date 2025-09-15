import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { object, ref, string } from "yup";
const SignupForm = () => {
  // Navigation
  const navigate = useNavigate();

  // States
  const [accountExistError, setAccountExistError] = useState(null);

  // Regex
  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
  const phoneRegex = /^(02)?01[0125][0-9]{8}$/;

  // Schemas
  const validationSchema = object({
    name: string()
      .required("Name is required")
      .min(3, "Name should be at least 3 characters")
      .max(20, "Name should be less than 20 characters"),
    email: string().required("Email is required").email("Email is invalid"),
    password: string()
      .required("Password is required")
      .matches(
        passwordRegex,
        "Password should be minimum eight characters, at least one upper case, one lower case English letter, one number and one special character"
      ),
    rePassword: string()
      .required("Confirm password is required ")
      .oneOf([ref("password")], "should be the same of the password "),
    phone: string()
      .required("Phone number is required")
      .matches(phoneRegex, " Accept only Egyption Numbers "),
  });

  //Function
  async function registerData(values) {
    const loadingToastId = toast.loading("Waiting");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signup",
        method: "POST",
        data: values,
      };
      let { data } = await axios.request(options);
      console.log(data);
      if (data.message == "success") {
        toast.success("User Created Sucessfully");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (errors) {
      setAccountExistError(errors.response.data.message);

      toast.error(errors.response.data.message);
    } finally {
      toast.dismiss(loadingToastId);
    }
  }

  // Formik
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: registerData,
  });

  return (
    <form className="space-y-5" onSubmit={formik.handleSubmit}>
      {/* Name Field */}
      <div className="space-y-2">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-slate-700"
        >
          Full Name
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <i className="fa-regular fa-user text-slate-400"></i>
          </div>
          <input
            id="name"
            type="text"
            placeholder="Enter your full name"
            className="form-controll w-full pl-10 pr-4 py-3 text-base border-2 border-slate-200 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all duration-200"
            value={formik.values.name}
            onChange={formik.handleChange}
            name="name"
            onBlur={formik.handleBlur}
          />
        </div>
        {formik.errors.name && formik.touched.name && (
          <div className="flex items-center space-x-1 text-red-600 text-sm">
            <i className="fa-solid fa-exclamation-circle text-xs"></i>
            <span>{formik.errors.name}</span>
          </div>
        )}
      </div>

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
            onChange={formik.handleChange}
            name="email"
            onBlur={formik.handleBlur}
          />
        </div>
        {formik.errors.email && formik.touched.email && (
          <div className="flex items-center space-x-1 text-red-600 text-sm">
            <i className="fa-solid fa-exclamation-circle text-xs"></i>
            <span>{formik.errors.email}</span>
          </div>
        )}
        {accountExistError && (
          <div className="flex items-center space-x-1 text-red-600 text-sm">
            <i className="fa-solid fa-exclamation-circle text-xs"></i>
            <span>{accountExistError}</span>
          </div>
        )}
      </div>

      {/* Phone Field */}
      <div className="space-y-2">
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-slate-700"
        >
          Phone Number
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <i className="fa-solid fa-phone text-slate-400"></i>
          </div>
          <input
            id="phone"
            type="tel"
            placeholder="Enter your phone number"
            className="form-controll w-full pl-10 pr-4 py-3 text-base border-2 border-slate-200 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all duration-200"
            value={formik.values.phone}
            onChange={formik.handleChange}
            name="phone"
            onBlur={formik.handleBlur}
          />
        </div>
        {formik.errors.phone && formik.touched.phone && (
          <div className="flex items-center space-x-1 text-red-600 text-sm">
            <i className="fa-solid fa-exclamation-circle text-xs"></i>
            <span>{formik.errors.phone}</span>
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
            placeholder="Create a strong password"
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
            <span className="text-xs">{formik.errors.password}</span>
          </div>
        )}
      </div>

      {/* Confirm Password Field */}
      <div className="space-y-2">
        <label
          htmlFor="rePassword"
          className="block text-sm font-medium text-slate-700"
        >
          Confirm Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <i className="fa-solid fa-lock text-slate-400"></i>
          </div>
          <input
            id="rePassword"
            type="password"
            placeholder="Confirm your password"
            className="form-controll w-full pl-10 pr-4 py-3 text-base border-2 border-slate-200 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all duration-200"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            name="rePassword"
            onBlur={formik.handleBlur}
          />
        </div>
        {formik.errors.rePassword && formik.touched.rePassword && (
          <div className="flex items-center space-x-1 text-red-600 text-sm">
            <i className="fa-solid fa-exclamation-circle text-xs"></i>
            <span>{formik.errors.rePassword}</span>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 shadow-lg hover:shadow-xl"
      >
        <span className="flex items-center justify-center space-x-2">
          <span>Create Account</span>
          <i className="fa-solid fa-arrow-right text-sm"></i>
        </span>
      </button>
    </form>
  );
};

export default SignupForm;
