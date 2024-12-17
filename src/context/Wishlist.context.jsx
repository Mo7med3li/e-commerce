import { createContext, useContext, useState } from "react";
import { userContext } from "./User.context";
import axios from "axios";
import toast from "react-hot-toast";

export let WishlistContext = createContext(null);

export default function WishlistProvider({ children }) {
  let [listInfo, setListInfo] = useState(null);
  let [listID, setListId] = useState(null);
  let { token } = useContext(userContext);
  async function addToWishlist({ productId }) {
    let toastId = toast.loading("Adding To Wishlist....");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/wishlist",
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
        toast.success("Added To Wishlist");
        setListId(data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(toastId);
    }
  }

  async function getWishlst() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/wishlist",
      method: "GET",
      headers: { token },
    };
    let { data } = await axios.request(options);
    setListInfo(data.data);
    console.log("listinfo", listInfo);
  }

  async function deleteFromWishlist({ productId }) {
    const toastId = toast.loading("Removing Product....");
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        method: "DELETE",
        headers: { token },
      };
      let { data } = await axios.request(options);

      if (data.status === "success") {
        toast.success(data.message);
        getWishlst();
      }
    } catch (error) {
    } finally {
      toast.dismiss(toastId);
    }
  }

  return (
    <WishlistContext.Provider
      value={{
        addToWishlist,
        listInfo,
        getWishlst,
        deleteFromWishlist,
        listID,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
