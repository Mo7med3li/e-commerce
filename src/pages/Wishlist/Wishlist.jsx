import { useContext, useEffect } from "react";
import Loading from "../../components/Loading/Loading";
import { WishlistContext } from "../../context/Wishlist.context";
import { CartContext } from "../../context/Cart.context";

export default function Wishlist() {
  let { listInfo, getWishlst, deleteFromWishlist } =
    useContext(WishlistContext);
  let { addProductToCart } = useContext(CartContext);
  useEffect(() => {
    getWishlst();
  }, []);
  return (
    <>
      <div className="bg-gray-200 p-12">
        <h1 className="text-xl font-semibold">My Wish List</h1>

        {listInfo === null ? (
          <Loading />
        ) : (
          <>
            {listInfo.map((list) => {
              return (
                <div
                  key={list.id}
                  className="flex justify-between mt-10 items-center flex-wrap md:flex-nowrap border-b-2 border-gray-300 p-4"
                >
                  <img
                    src={list.imageCover}
                    alt={list.title}
                    className="w-full md:w-24  object-cover"
                  />
                  <div className="flex flex-col me-auto gap-1 justify-center p-6 ">
                    <h2 className="text-sm font-semibold">{list.title}</h2>
                    <span className="text-primary-600 font-semibold">
                      {list.price} EGP
                    </span>
                    <button
                      className="text-red-600 flex items-center "
                      onClick={() => {
                        deleteFromWishlist({ productId: list.id });
                      }}
                    >
                      <i className="fa-solid fa-trash "></i>Remove
                    </button>
                  </div>
                  <button
                    className="btn"
                    onClick={() => {
                      addProductToCart({ productId: list.id });
                    }}
                  >
                    Add To Cart
                  </button>
                </div>
              );
            })}
          </>
        )}
      </div>
    </>
  );
}
