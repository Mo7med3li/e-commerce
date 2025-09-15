import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import ResetPasswordForm from "./components/reset-passwod-form";

export default function ResetPassword() {
  return (
    <>
      <Helmet>
        <title>Reset Password</title>
        <meta name="description" content="FreshCart| Reset Password Page" />
      </Helmet>

      {/* Main Container */}
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Reset Password Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-primary-100">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                <i className="fa-solid fa-lock-open text-2xl text-primary-600"></i>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
                Reset Your Password
              </h1>
              <p className="text-slate-600 text-sm md:text-base">
                Enter your email and new password to reset your account
              </p>
            </div>

            {/* Form */}
            <ResetPasswordForm />

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-slate-600 text-sm">
                Remember your password?{" "}
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
              Make sure to use a strong password to keep your account secure
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
