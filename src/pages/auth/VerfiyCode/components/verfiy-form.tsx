import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { object, string } from "yup";

const VerfiyCodeForm = () => {
  // Navigation
  const navigate = useNavigate();

  //   State
  let [codeError, setcodeError] = useState(null);

  //   Schema
  const validationSchema = object({
    resetCode: string().required("Code is required"),
  });

  //   Formik
  const formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    onSubmit: (values) => {
      VerfiyCodeSubmit(values);
    },
    validationSchema,
  });

  //   Function
  async function VerfiyCodeSubmit(values) {
    let toastId = toast.loading("sending your code...");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        method: "POST",
        data: values,
      };
      let { data } = await axios.request(options);
      console.log(data);
      if (data.status === "Success") {
        toast.success("code sent");
        setTimeout(() => {
          navigate("/reset-password");
        }, 2000);
      }
    } catch (error) {
      setcodeError(error.response.data.message);
      toast.error(error.response.data.message);
    } finally {
      toast.dismiss(toastId);
    }
  }

  return (
    <form className="space-y-6" onSubmit={formik.handleSubmit}>
      {/* Code Field */}
      <div className="space-y-2">
        <label
          htmlFor="resetCode"
          className="block text-sm font-medium text-slate-700"
        >
          Verification Code
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <i className="fa-solid fa-key text-slate-400"></i>
          </div>
          <input
            id="resetCode"
            type="text"
            placeholder="Enter verification code"
            className="form-controll w-full pl-10 pr-4 py-3 text-base border-2 border-slate-200 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all duration-200 text-center tracking-widest"
            value={formik.values.resetCode}
            name="resetCode"
            onChange={formik.handleChange}
            maxLength={6}
          />
        </div>
        {formik.errors.resetCode && (
          <div className="flex items-center space-x-1 text-red-600 text-sm">
            <i className="fa-solid fa-exclamation-circle text-xs"></i>
            <span>{formik.errors.resetCode}</span>
          </div>
        )}
        {codeError && (
          <div className="flex items-center space-x-1 text-red-600 text-sm">
            <i className="fa-solid fa-exclamation-circle text-xs"></i>
            <span>{codeError}</span>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 shadow-lg hover:shadow-xl"
      >
        <span className="flex items-center justify-center space-x-2">
          <span>Verify Code</span>
          <i className="fa-solid fa-arrow-right text-sm"></i>
        </span>
      </button>
    </form>
  );
};

export default VerfiyCodeForm;
