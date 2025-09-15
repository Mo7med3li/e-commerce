import React from "react";
import amazon from "../../assets/images/amazon-pay.png";
import Express from "../../assets/images/American-Express-Color.png";
import mastercard from "../../assets/images/mastercard.webp";
import paypal from "../../assets/images/paypal.png";
import Apple from "../../assets/images/get-apple-store.png";
import google from "../../assets/images/get-google-play.png";

export default function Footer() {
  return (
    <>
      <footer className="bg-gradient-to-br from-slate-50 to-slate-100 py-12">
        <div className="container">
          {/* App Download Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-slate-200">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                <i className="fa-solid fa-mobile-screen-button text-2xl text-primary-600"></i>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
                Get the FreshCart App
              </h3>
              <p className="text-slate-600 text-sm md:text-base max-w-md mx-auto">
                We&apos;ll send you a link to download the app on your phone.
                Start shopping with ease!
              </p>
            </div>

            <div className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fa-regular fa-envelope text-slate-400"></i>
                  </div>
                  <input
                    type="email"
                    className="form-controll w-full pl-10 pr-4 py-3 text-base border-2 border-slate-200 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all duration-200"
                    placeholder="Enter your email address"
                  />
                </div>
                <button className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 shadow-lg hover:shadow-xl whitespace-nowrap">
                  <span className="flex items-center justify-center space-x-2">
                    <span>Share App Link</span>
                    <i className="fa-solid fa-paper-plane text-sm"></i>
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Payment Partners & App Stores */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Payment Partners */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2 mb-4">
                  <i className="fa-solid fa-credit-card text-primary-600"></i>
                  <h4 className="text-lg font-semibold text-slate-800">
                    Payment Partners
                  </h4>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="bg-white p-3 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-200">
                    <img src={amazon} alt="Amazon Pay" className="h-8 w-auto" />
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-200">
                    <img
                      src={Express}
                      alt="American Express"
                      className="h-8 w-auto"
                    />
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-200">
                    <img
                      src={mastercard}
                      alt="Mastercard"
                      className="h-8 w-auto"
                    />
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-200">
                    <img src={paypal} alt="PayPal" className="h-8 w-auto" />
                  </div>
                </div>
              </div>

              {/* App Stores */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2 mb-4">
                  <i className="fa-solid fa-download text-primary-600"></i>
                  <h4 className="text-lg font-semibold text-slate-800">
                    Get FreshCart App
                  </h4>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="bg-black hover:bg-gray-800 p-3 rounded-lg shadow-sm border border-gray-300 hover:shadow-md transition-all duration-200 cursor-pointer">
                    <img
                      src={Apple}
                      alt="Download on App Store"
                      className="h-10 w-auto"
                    />
                  </div>
                  <div className="bg-black hover:bg-gray-800 p-3 rounded-lg shadow-sm border border-gray-300 hover:shadow-md transition-all duration-200 cursor-pointer">
                    <img
                      src={google}
                      alt="Get it on Google Play"
                      className="h-10 w-auto"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="mt-8 text-center">
            <div className="border-t border-slate-200 pt-6">
              <p className="text-slate-500 text-sm">
                © 2024 FreshCart. All rights reserved.{" "}
                <span className="text-primary-600">
                  Made with ❤️ for fresh shopping
                </span>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
