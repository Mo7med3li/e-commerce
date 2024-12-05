import React, { useContext, useEffect } from "react";
import logo from "../../assets/images/freshcart-logo.svg";
import { Link, NavLink } from "react-router-dom";
import { userContext } from "../../context/User.context";
import { CartContext } from "../../context/Cart.context";

export default function Navbar() {
  let { token, logOuT } = useContext(userContext);
  let { cartInfo, getCartProducts } = useContext(CartContext);
  useEffect(() => {
    getCartProducts();
  }, []);
  return (
    <>
      <nav className="py-3 bg-slate-100 shadow fixed top-0 left-0 right-0 z-50 ">
        <div className="container flex items-center gap-12  ">
          <div className="logo">
            <a href="/">
              <img src={logo} alt="cart logo" />
            </a>
          </div>
          {token && (
            <>
              <ul className="flex gap-5 items-center ">
                <li>
                  <NavLink
                    className={({ isActive }) => {
                      return `before:absolute relative before:w-0  hover:before:w-full before:duration-300 before:transition-[width] before:h-0.5 before:bg-primary-500 before:left-0 before:-bottom-1 ${
                        isActive ? "before:!w-full font-semibold" : ""
                      }`;
                    }}
                    to="/"
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) => {
                      return `before:absolute relative before:w-0  hover:before:w-full before:duration-300 before:transition-[width] before:h-0.5 before:bg-primary-500 before:left-0 before:-bottom-1 ${
                        isActive ? "before:!w-full font-semibold" : ""
                      }`;
                    }}
                    to="/products"
                  >
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) => {
                      return `before:absolute relative before:w-0  hover:before:w-full before:duration-300 before:transition-[width] before:h-0.5 before:bg-primary-500 before:left-0 before:-bottom-1 ${
                        isActive ? "before:!w-full font-semibold" : ""
                      }`;
                    }}
                    to="/categories"
                  >
                    Categories
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) => {
                      return `before:absolute relative before:w-0  hover:before:w-full before:duration-300 before:transition-[width] before:h-0.5 before:bg-primary-500 before:left-0 before:-bottom-1 ${
                        isActive ? "before:!w-full font-semibold" : ""
                      }`;
                    }}
                    to="/brands"
                  >
                    Brands
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) => {
                      return `before:absolute relative before:w-0  hover:before:w-full  before:duration-300 before:transition-[width] before:h-0.5 before:bg-primary-500 before:left-0 before:-bottom-1 ${
                        isActive ? "before:!w-full font-semibold" : ""
                      }`;
                    }}
                    to="/orders"
                  >
                    Orders
                  </NavLink>
                </li>
              </ul>
              <Link to="/cart" className="cart-icon relative w-fit ms-auto">
                <i className="fa-solid fa-cart-shopping text-2xl"></i>
                <div className="card-count absolute h-5 w-5 translate-x-1/2 -top-3 right-0 bg-primary-600 rounded-md flex items-center justify-center text-white">
                  {cartInfo === null ? (
                    <i className="fa-solid fa-spinner fa-spin"></i>
                  ) : (
                    <span>{cartInfo.numOfCartItems}</span>
                  )}
                </div>
              </Link>
            </>
          )}
          <ul className={`flex gap-5 items-center ${!token && "ms-auto"} `}>
            <li>
              <a href="https://facebook.com" target="_blank">
                <i className="fa-brands fa-facebook"></i>
              </a>
            </li>
            <li>
              <a href="https://x.com" target="_blank">
                <i className="fa-brands fa-twitter"></i>
              </a>
            </li>{" "}
            <li>
              <a href="https://instagram.com" target="_blank">
                <i className="fa-brands fa-instagram"></i>
              </a>
            </li>{" "}
            <li>
              <a href="https://tiktok.com" target="_blank">
                <i className="fa-brands fa-tiktok"></i>
              </a>
            </li>{" "}
            <li>
              <a href="https://linkedin.com" target="_blank">
                <i className="fa-brands fa-linkedin"></i>
              </a>
            </li>
            <li>
              <a href="https://youtube.com" target="_blank">
                <i className="fa-brands fa-youtube"></i>
              </a>
            </li>
          </ul>

          <ul className="flex gap-5 items-center ">
            {!token && (
              <>
                <li>
                  <NavLink
                    className={({ isActive }) => {
                      return `before:absolute relative before:w-0  hover:before:w-full before:duration-300 before:transition-[width] before:h-0.5 before:bg-primary-500 before:left-0 before:-bottom-1 ${
                        isActive ? "before:!w-full font-semibold" : ""
                      }`;
                    }}
                    to="/signup"
                  >
                    Sign Up
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/login"
                    className={({ isActive }) => {
                      return `before:absolute relative before:w-0  hover:before:w-full before:duration-300 before:transition-[width] before:h-0.5 before:bg-primary-500 before:left-0 before:-bottom-1 ${
                        isActive ? "before:!w-full font-semibold" : ""
                      }`;
                    }}
                  >
                    Login
                  </NavLink>
                </li>
              </>
            )}
            {token && (
              <li onClick={logOuT}>
                <Link>
                  <i className="fa-solid fa-right-from-bracket text-xl"></i>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}
