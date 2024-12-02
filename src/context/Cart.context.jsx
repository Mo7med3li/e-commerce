import { createContext, useContext } from "react";
import { userContext } from "./User.context";
import axios from "axios";
import toast from "react-hot-toast";

export const CartContext = createContext(null);

export default function CartProvider({ children }) {
  const { token } = useContext(userContext);
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

      if (data.status === "success") {
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(toastId);
    }
  }
  return (
    <CartContext.Provider value={{ addProductToCart }}>
      {children}
    </CartContext.Provider>
  );
}
