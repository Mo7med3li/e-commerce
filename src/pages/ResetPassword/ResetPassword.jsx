import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { object, string } from "yup";

export default function ResetPassword() {
  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
  const navigate = useNavigate();
  let [emailError, setEmailError] = useState(null);
  const validationSchema = object({
    email: string().required("Email is required").email("Enter Valid Email"),
    newPassword: string()
      .required("Password is required")
      .matches(
        passwordRegex,
        "Password should be minimum eight characters, at least one upper case, one lower case English letter, one number and one special character"
      ),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    onSubmit: (values) => {
      resetPasswordSubmit(values);
    },
    validationSchema,
  });
  async function resetPasswordSubmit(values) {
    let toastId = toast.loading("Resering your password...");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        method: "PUT",
        data: values,
      };
      let { data } = await axios.request(options);
      console.log(data);

      toast.success("Password reseted");
      setTimeout(() => {
        navigate("/");
      }, 2000);
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
        <title>reset-Password</title>
        <meta name="description" content="FreshCart| ResetPassword" />
      </Helmet>
      <h1 className="font-semibold text-2xl">please enter your email</h1>
      <form action="" className="my-5 space-y-4" onSubmit={formik.handleSubmit}>
        <div className="">
          <input
            type="email"
            className="form-controll w-full py-3"
            placeholder="Email"
            value={formik.values.email}
            name="email"
            onChange={formik.handleChange}
          />
          {formik.errors.email && (
            <p className="pt-3 text-red-600 text-lg ">
              * {formik.errors.email}
            </p>
          )}
          {emailError && (
            <p className="pt-3 text-red-600 text-lg ">* {emailError}</p>
          )}
        </div>
        <div className="">
          <input
            type="password"
            className="form-controll w-full py-3"
            placeholder="Password"
            value={formik.values.newPassword}
            name="newPassword"
            onChange={formik.handleChange}
          />
          {formik.errors.newPassword && (
            <p className="py-3  text-red-600 text-lg ">
              * {formik.errors.newPassword}
            </p>
          )}
        </div>

        <button type="submit" className="btn">
          reset password
        </button>
      </form>
    </>
  );
}
