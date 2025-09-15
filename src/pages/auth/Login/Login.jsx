import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import LoginForm from "./components/login-form";

export default function Login() {
  return (
    <>
      <Helmet>
        <title>Login </title>
        <meta name="description" content="FreshCart| Login Page" />
      </Helmet>

      {/* Main Container */}
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Login Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-primary-100">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                <i className="fa-regular fa-user text-2xl text-primary-600"></i>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
                Welcome Back
              </h1>
              <p className="text-slate-600 text-sm md:text-base">
                Sign in to your account to continue
              </p>
            </div>

            {/* Form */}
            <LoginForm />

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-slate-600 text-sm">
                Don&apos;t have an account?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-primary-600 hover:text-primary-700 transition-colors duration-200 hover:underline"
                >
                  Sign up here
                </Link>
              </p>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-6 text-center">
            <p className="text-xs text-slate-500">
              By signing in, you agree to our{" "}
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
