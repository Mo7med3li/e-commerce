import { useContext, useEffect, useState } from "react";
import logo from "../../assets/images/freshcart-logo.svg";
import { Link, NavLink } from "react-router-dom";
import { userContext } from "../../context/User.context";
import { CartContext } from "../../context/Cart.context";

export default function Navbar() {
  // States
  const [isOpenMenue, setIsOpenMenue] = useState(false);

  // Context
  let { token, logOuT } = useContext(userContext);
  let { cartInfo, getCartProducts } = useContext(CartContext);

  // Function
  const handleResize = () => {
    if (window.innerWidth >= 1024) {
      setIsOpenMenue(true);
    } else {
      setIsOpenMenue(false);
    }
  };

  // Effects
  useEffect(() => {
    handleResize();
    getCartProducts();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function toggle() {
    setIsOpenMenue(!isOpenMenue);
    console.log(isOpenMenue);
  }

  return (
    <>
      <nav className="py-4 px-2 bg-white/95 backdrop-blur-md shadow-lg border-b border-slate-200 fixed top-0 left-0 right-0 z-50">
        <div className="container">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="logo flex-shrink-0">
              <Link to="/" className="flex items-center space-x-2">
                <img src={logo} alt="FreshCart Logo" className="h-8 w-auto" />
              </Link>
            </div>

            {/* Desktop Navigation */}
            {token && (
              <div className="hidden lg:flex items-center space-x-8">
                <ul className="flex items-center space-x-6">
                  <li>
                    <NavLink
                      className={({ isActive }) => {
                        return `px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                          isActive
                            ? "bg-primary-100 text-primary-700 shadow-sm"
                            : "text-slate-600 hover:text-primary-600 hover:bg-primary-50"
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
                        return `px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                          isActive
                            ? "bg-primary-100 text-primary-700 shadow-sm"
                            : "text-slate-600 hover:text-primary-600 hover:bg-primary-50"
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
                        return `px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                          isActive
                            ? "bg-primary-100 text-primary-700 shadow-sm"
                            : "text-slate-600 hover:text-primary-600 hover:bg-primary-50"
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
                        return `px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                          isActive
                            ? "bg-primary-100 text-primary-700 shadow-sm"
                            : "text-slate-600 hover:text-primary-600 hover:bg-primary-50"
                        }`;
                      }}
                      to="/wishlist"
                    >
                      Wishlist
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={({ isActive }) => {
                        return `px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                          isActive
                            ? "bg-primary-100 text-primary-700 shadow-sm"
                            : "text-slate-600 hover:text-primary-600 hover:bg-primary-50"
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
                        return `px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                          isActive
                            ? "bg-primary-100 text-primary-700 shadow-sm"
                            : "text-slate-600 hover:text-primary-600 hover:bg-primary-50"
                        }`;
                      }}
                      to="/allorders"
                    >
                      Orders
                    </NavLink>
                  </li>
                </ul>
              </div>
            )}

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Social Links - Desktop Only */}
              {token && (
                <div className="hidden lg:flex items-center space-x-3">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-slate-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200"
                  >
                    <i className="fa-brands fa-facebook text-lg"></i>
                  </a>
                  <a
                    href="https://x.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-slate-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200"
                  >
                    <i className="fa-brands fa-twitter text-lg"></i>
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-slate-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200"
                  >
                    <i className="fa-brands fa-instagram text-lg"></i>
                  </a>
                  <a
                    href="https://tiktok.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-slate-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200"
                  >
                    <i className="fa-brands fa-tiktok text-lg"></i>
                  </a>
                </div>
              )}

              {/* Cart Icon */}
              {token && (
                <Link
                  to="/cart"
                  className="relative p-2 text-slate-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200"
                >
                  <i className="fa-solid fa-cart-shopping text-xl"></i>
                  <div className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                    {cartInfo === null ? (
                      <i className="fa-solid fa-spinner fa-spin text-xs"></i>
                    ) : (
                      <span>{cartInfo.numOfCartItems}</span>
                    )}
                  </div>
                </Link>
              )}

              {/* Auth Links / Logout */}
              {!token ? (
                <div className="flex items-center space-x-3">
                  <NavLink
                    className={({ isActive }) => {
                      return `px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-primary-100 text-primary-700 shadow-sm"
                          : "text-slate-600 hover:text-primary-600 hover:bg-primary-50"
                      }`;
                    }}
                    to={"/signup"}
                  >
                    Sign Up
                  </NavLink>
                  <NavLink
                    className={({ isActive }) => {
                      return `px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-primary-100 text-primary-700 shadow-sm"
                          : "text-slate-600 hover:text-primary-600 hover:bg-primary-50"
                      }`;
                    }}
                    to={"login"}
                  >
                    Login
                  </NavLink>
                </div>
              ) : (
                <button
                  onClick={logOuT}
                  className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                  title="Logout"
                >
                  <i className="fa-solid fa-right-from-bracket text-xl"></i>
                </button>
              )}

              {/* Mobile Menu Button */}
              {token && (
                <button
                  onClick={toggle}
                  className="lg:hidden p-2 text-slate-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200"
                >
                  <i className="fa-solid fa-bars text-xl"></i>
                </button>
              )}
            </div>
          </div>

          {/* Mobile Navigation */}
          {token && (
            <div
              className={`lg:hidden transition-all duration-300 ${
                isOpenMenue
                  ? "max-h-96 opacity-100"
                  : "max-h-0 opacity-0 overflow-hidden"
              }`}
            >
              <div className="py-4 border-t border-slate-200 mt-4">
                <ul className="space-y-2">
                  <li>
                    <NavLink
                      className={({ isActive }) => {
                        return `block px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                          isActive
                            ? "bg-primary-100 text-primary-700"
                            : "text-slate-600 hover:text-primary-600 hover:bg-primary-50"
                        }`;
                      }}
                      to="/"
                      onClick={() => setIsOpenMenue(false)}
                    >
                      <i className="fa-solid fa-home mr-3"></i>Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={({ isActive }) => {
                        return `block px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                          isActive
                            ? "bg-primary-100 text-primary-700"
                            : "text-slate-600 hover:text-primary-600 hover:bg-primary-50"
                        }`;
                      }}
                      to="/products"
                      onClick={() => setIsOpenMenue(false)}
                    >
                      <i className="fa-solid fa-box mr-3"></i>Products
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={({ isActive }) => {
                        return `block px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                          isActive
                            ? "bg-primary-100 text-primary-700"
                            : "text-slate-600 hover:text-primary-600 hover:bg-primary-50"
                        }`;
                      }}
                      to="/categories"
                      onClick={() => setIsOpenMenue(false)}
                    >
                      <i className="fa-solid fa-list mr-3"></i>Categories
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={({ isActive }) => {
                        return `block px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                          isActive
                            ? "bg-primary-100 text-primary-700"
                            : "text-slate-600 hover:text-primary-600 hover:bg-primary-50"
                        }`;
                      }}
                      to="/wishlist"
                      onClick={() => setIsOpenMenue(false)}
                    >
                      <i className="fa-solid fa-heart mr-3"></i>Wishlist
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={({ isActive }) => {
                        return `block px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                          isActive
                            ? "bg-primary-100 text-primary-700"
                            : "text-slate-600 hover:text-primary-600 hover:bg-primary-50"
                        }`;
                      }}
                      to="/brands"
                      onClick={() => setIsOpenMenue(false)}
                    >
                      <i className="fa-solid fa-tags mr-3"></i>Brands
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={({ isActive }) => {
                        return `block px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                          isActive
                            ? "bg-primary-100 text-primary-700"
                            : "text-slate-600 hover:text-primary-600 hover:bg-primary-50"
                        }`;
                      }}
                      to="/allorders"
                      onClick={() => setIsOpenMenue(false)}
                    >
                      <i className="fa-solid fa-receipt mr-3"></i>Orders
                    </NavLink>
                  </li>
                </ul>

                {/* Mobile Social Links */}
                <div className="flex items-center justify-center space-x-4 mt-6 pt-4 border-t border-slate-200">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-slate-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200"
                  >
                    <i className="fa-brands fa-facebook text-lg"></i>
                  </a>
                  <a
                    href="https://x.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-slate-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200"
                  >
                    <i className="fa-brands fa-twitter text-lg"></i>
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-slate-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200"
                  >
                    <i className="fa-brands fa-instagram text-lg"></i>
                  </a>
                  <a
                    href="https://tiktok.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-slate-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200"
                  >
                    <i className="fa-brands fa-tiktok text-lg"></i>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
