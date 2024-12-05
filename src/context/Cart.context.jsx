import { createContext, useContext, useState } from "react";
import { userContext } from "./User.context";
import axios from "axios";
import toast from "react-hot-toast";

export const CartContext = createContext(null);

export default function CartProvider({ children }) {
  const { token } = useContext(userContext);
  let [numberOFCartProduct, setNumberOfCArtProduct] = useState(0);
  let [cartInfo, setCartInfo] = useState(null);

  async function addProductToCart({ productId }) {
    const toastId = toast.loading("Adding Your Product");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "POST",
        headers: {
          token,
        },
        data: {
          productId,
        },
      };

      let { data } = await axios.request(options);

      setNumberOfCArtProduct(data.numOfCartItems);

      if (data.status === "success") {
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(toastId);
    }
  }

  async function getCartProducts() {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "GET",
        headers: {
          token,
        },
      };
      let { data } = await axios.request(options);
      setCartInfo(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  async function deleteCartProduct({ productId }) {
    const toastID = toast.loading("Deleting Product.....");
    try {
      const options = {
        url: ` https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        method: "DELETE",
        headers: {
          token,
        },
      };
      let { data } = await axios.request(options);
      console.log(data);
      if (data.status === "success") {
        setCartInfo(data);
        toast.success("Product Deleted");
      }
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(toastID);
    }
  }
  return (
    <CartContext.Provider
      value={{
        addProductToCart,
        getCartProducts,
        numberOFCartProduct,
        cartInfo,
        deleteCartProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
