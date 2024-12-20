import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { object, string } from "yup";

export default function VerfiyCode() {
  const navigate = useNavigate();
  let [codeError, setcodeError] = useState(null);
  const validationSchema = object({
    resetCode: string().required("Code is required"),
  });
  const formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    onSubmit: (values) => {
      VerfiyCodeSubmit(values);
    },
    validationSchema,
  });
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
    <>
      <Helmet>
        <title>Verfiy-code</title>
        <meta name="description" content="FreshCart|] verfiy code" />
      </Helmet>
      <h1 className="font-semibold text-2xl">please enter your code</h1>
      <form action="" className="my-5" onSubmit={formik.handleSubmit}>
        <div className="py-4">
          <input
            type="text"
            className="form-controll w-full py-3"
            placeholder="code"
            value={formik.values.resetCode}
            name="resetCode"
            onChange={formik.handleChange}
          />
        </div>
        {formik.errors.resetCode && (
          <p className="pb-3 text-red-600 text-lg ">
            * {formik.errors.resetCode}
          </p>
        )}
        {codeError && (
          <p className="pb-3 text-red-600 text-lg ">* {codeError}</p>
        )}
        <button type="submit" className="btn">
          Verfiy
        </button>
      </form>
    </>
  );
}
