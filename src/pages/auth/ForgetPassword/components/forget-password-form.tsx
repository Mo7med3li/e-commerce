import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { object, string } from "yup";

const ForgetPasswordForm = () => {
  // Navigation
  const navigate = useNavigate();

  // States
  let [emailError, setEmailError] = useState(null);

  // Schema
  const validationSchema = object({
    email: string().required("Email is required").email("Enter Valid Email"),
  });

  // Formik
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values) => {
      forgetPasswordSubmit(values);
    },
    validationSchema,
  });

  // Functions
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
          />
        </div>
        {formik.errors.email && (
          <div className="flex items-center space-x-1 text-red-600 text-sm">
            <i className="fa-solid fa-exclamation-circle text-xs"></i>
            <span>{formik.errors.email}</span>
          </div>
        )}
        {emailError && (
          <div className="flex items-center space-x-1 text-red-600 text-sm">
            <i className="fa-solid fa-exclamation-circle text-xs"></i>
            <span>{emailError}</span>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 shadow-lg hover:shadow-xl"
      >
        <span className="flex items-center justify-center space-x-2">
          <span>Send Reset Link</span>
          <i className="fa-solid fa-paper-plane text-sm"></i>
        </span>
      </button>
    </form>
  );
};

export default ForgetPasswordForm;
