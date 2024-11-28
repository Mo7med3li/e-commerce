import axios from "axios";
import { Formik, useFormik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { object, ref, string } from "yup";

export default function Signup() {
  const navigate = useNavigate();
  const [accountExistError, setAccountExistError] = useState(null);
  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
  const phoneRegex = /^(02)?01[0125][0-9]{8}$/;
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
    <>
      <h3 className=" text-xl font-semibold text-slate-700">
        <i className="fa-regular fa-user mr-2"></i>
        Register Now
      </h3>
      <form className="space-y-4 py-4" onSubmit={formik.handleSubmit}>
        <div className="name space-y-1">
          <h3>name:</h3>
          <input
            type="text"
            placeholder="Type your name"
            className=" form-controll w-full"
            value={formik.values.name}
            onChange={formik.handleChange}
            name="name"
            onBlur={formik.handleBlur}
          />
          {formik.errors.name && formik.touched.name && (
            <p className="text-red-600">*{formik.errors.name}</p>
          )}
        </div>
        <div className="email space-y-2">
          <h3>email:</h3>
          <input
            type="email"
            placeholder="Type your email address"
            className=" form-controll w-full"
            value={formik.values.email}
            onChange={formik.handleChange}
            name="email"
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && formik.touched.email && (
            <p className="text-red-600">*{formik.errors.email}</p>
          )}
          {accountExistError && (
            <p className="text-red-600 text-sm">*{accountExistError}</p>
          )}
        </div>
        <div className="password space-y-2">
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
        </div>
        <div className="rePasswprd space-y-2">
          <h3>rePassword:</h3>
          <input
            type="password"
            placeholder="Confirm your password"
            className=" form-controll w-full"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            name="rePassword"
            onBlur={formik.handleBlur}
          />
          {formik.errors.rePassword && formik.touched.rePassword && (
            <p className="text-red-600">*{formik.errors.rePassword}</p>
          )}
        </div>
        <div className="phone space-y-2">
          <h3>phone:</h3>
          <input
            type="tel"
            placeholder="Enter your phone number"
            className=" form-controll w-full"
            value={formik.values.phone}
            onChange={formik.handleChange}
            name="phone"
            onBlur={formik.handleBlur}
          />
          {formik.errors.phone && formik.touched.phone && (
            <p className="text-red-600">*{formik.errors.phone}</p>
          )}
        </div>
        <button type="submit" className="btn w-full">
          Sign Up
        </button>
      </form>
    </>
  );
}
