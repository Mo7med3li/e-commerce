import { Helmet } from "react-helmet";
import VerfiyCodeForm from "./components/verfiy-form";

export default function VerfiyCode() {
  return (
    <>
      <Helmet>
        <title>Verify Code</title>
        <meta name="description" content="FreshCart| Verify Code Page" />
      </Helmet>

      {/* Main Container */}
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Verify Code Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-primary-100">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                <i className="fa-solid fa-shield-check text-2xl text-primary-600"></i>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
                Verify Your Code
              </h1>
              <p className="text-slate-600 text-sm md:text-base">
                Please enter the verification code sent to your email
              </p>
            </div>

            {/* Form */}
            <VerfiyCodeForm />
            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-slate-600 text-sm">
                Didn&apos;t receive the code?{" "}
                <button className="font-medium text-primary-600 hover:text-primary-700 transition-colors duration-200 hover:underline">
                  Resend Code
                </button>
              </p>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-6 text-center">
            <p className="text-xs text-slate-500">
              Check your email inbox and spam folder for the verification code
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
