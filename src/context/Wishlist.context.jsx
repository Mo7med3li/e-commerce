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
        getWishList();
        // setCheckProduct(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(toastId);
    }
  }

  async function getWishList() {
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
        getWishList();
      }
    } catch (error) {
    } finally {
      toast.dismiss(toastId);
    }
  }
  function checkedProduct({ productId }) {
    if (!listInfo) return false;
    const productInfo = listInfo.find(
      (productFind) => productFind.id === productId
    );
    return productInfo;
  }

  return (
    <WishlistContext.Provider
      value={{
        addToWishlist,
        listInfo,
        getWishList,
        deleteFromWishlist,
        listID,
        checkedProduct,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
