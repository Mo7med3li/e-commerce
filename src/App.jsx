import { useState } from "react";

import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Home from "./pages/Home/Home";
import { ToastBar, Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/proutectedRoute/ProtectedRoute";
import GuestedRoute from "./components/GuestedRoute/GuestedRoute";
import UserProvider from "./context/User.context";
import CartProvider from "./context/Cart.context";
import Cart from "./pages/Cart/Cart";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Checkout from "./pages/Checkout/Checkout";
import Orders from "./pages/Orders/Orders";
import Offline from "./components/Offline/Offline";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Categories from "./pages/Categories/Categories";
import CategoryProvider from "./context/Category.context";
import Wishlist from "./pages/Wishlist/Wishlist";
import WishlistProvider from "./context/Wishlist.context";
import ProductProvider from "./context/Product.context";
import Products from "./pages/Products/Products";
import Brands from "./pages/Brands/Brands";
import ForgetPassword from "./pages/ForgetPassword/ForgetPassword";
import VerfiyCode from "./pages/VerfiyCode/VerfiyCode";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <Home /> },
        { path: "/cart", element: <Cart /> },
        { path: "/products/:id", element: <ProductDetails /> },
        { path: "/checkout", element: <Checkout /> },
        { path: "/allorders", element: <Orders /> },
        { path: "/categories", element: <Categories /> },
        { path: "/wishlist", element: <Wishlist /> },
        { path: "/products", element: <Products /> },
        { path: "/brands", element: <Brands /> },
      ],
    },
    {
      path: "/",
      element: (
        <GuestedRoute>
          <Layout />
        </GuestedRoute>
      ),
      children: [
        { path: "/login", element: <Login /> },
        { path: "/signup", element: <Signup /> },
        { path: "/forget-password", element: <ForgetPassword /> },
        { path: "/verfiy-code", element: <VerfiyCode /> },
      ],
    },
  ]);
  const myClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={myClient}>
        <UserProvider>
          <ProductProvider>
            <WishlistProvider>
              <CartProvider>
                <CategoryProvider>
                  <RouterProvider router={router} />
                </CategoryProvider>
              </CartProvider>
            </WishlistProvider>
          </ProductProvider>
        </UserProvider>
        <Toaster />
        <Offline>
          <div className="bg-gray-200 p-4 fixed rounded-lg shadow-lg text-gray-600 font-semibold bottom-10 right-2 z-50">
            <i className="fa-solid fa-wifi mr-2"></i>
            <span>Check Your Internet Connection</span>
          </div>
        </Offline>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
