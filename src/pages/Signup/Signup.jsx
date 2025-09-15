import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import SignupForm from "./components/signup-form";

export default function Signup() {
  return (
    <>
      <Helmet>
        <title>Signup</title>
        <meta name="description" content="FreshCart| Signup Page" />
      </Helmet>

      {/* Main Container */}
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Signup Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-primary-100">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                <i className="fa-solid fa-user-plus text-2xl text-primary-600"></i>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
                Create Account
              </h1>
              <p className="text-slate-600 text-sm md:text-base">
                Join us today and start shopping
              </p>
            </div>

            {/* Form */}
            <SignupForm />
            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-slate-600 text-sm">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-primary-600 hover:text-primary-700 transition-colors duration-200 hover:underline"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-6 text-center">
            <p className="text-xs text-slate-500">
              By creating an account, you agree to our{" "}
              <a href="#" className="text-primary-600 hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-primary-600 hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
