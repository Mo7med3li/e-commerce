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
      <footer className="bg-slate-100 py-7">
        <div className="container space-y-3">
          <header>
            <h3 className="text-xl font-semibold text-slate-800">
              Get the FreshCart App
            </h3>
            <p className="text-slate-400">
              We will send you a link , open it on your phone to download the
              app.
            </p>
          </header>
          <div className="share-app p-3 flex gap-4">
            <input
              type="email"
              className="form-controll grow  "
              placeholder="Email Address"
            />
            <button className="btn font-semibold text-sm">
              Share App Link
            </button>
          </div>
          <div className="payments border-y-2 border-opacity-50 border-slate-300 flex  flex-wrap lg:flex-nowrap justify-between items-center py-4 px-3 ">
            <div className="payments-parteners flex items-center gap-5 w-full lg:w-fit">
              <h4>Payment Partners</h4>
              <img src={amazon} alt="Amazon pay" className=" w-24" />
              <img src={Express} className=" w-24" alt="American express" />
              <img src={mastercard} className=" w-20" alt="master card " />
              <img src={paypal} className=" w-24" alt="paypal" />
            </div>
            <div className="payments-parteners flex items-center gap-4">
              <h4>Get deliveries with Fresh Cart </h4>
              <img src={Apple} className=" w-24" alt="apple store" />
              <img src={google} className=" w-[110px]" alt="google store" />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
