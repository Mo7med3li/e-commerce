import { useContext, useEffect } from "react";
import { CartContext } from "../../context/Cart.context";
import { Link, Links } from "react-router-dom";
import { WishlistContext } from "../../context/Wishlist.context";

export default function Card({ productInfo }) {
  const {
    category,
    description,
    imageCover,
    title,
    price,
    ratingsAverage,
    id,
  } = productInfo;
  let { addProductToCart } = useContext(CartContext);
  let { addToWishlist, getWishlst, listID } = useContext(WishlistContext);

  return (
    <>
      <div className="card group/card rounded-lg shadow-lg overflow-hidden cursor-pointer ">
        <div className=" relative ">
          <img src={imageCover} alt="" className="object-cover" />
          <div className="card-layer absolute inset-0 w-full h-full bg-slate-400 flex items-center justify-center gap-3 bg-opacity-40 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
            <div
              className="icon cursor-pointer bg-primary-600  w-7 h-7 flex justify-center items-center rounded-full"
              onClick={() => {
                addToWishlist({ productId: id });
                getWishlst();
              }}
            >
              <i
                className={`fa-solid fa-heart text-white
                `}
              ></i>
            </div>
            <div
              className="icon cursor-pointer bg-primary-600 text-white w-7 h-7 flex justify-center items-center rounded-full "
              onClick={() => {
                addProductToCart({ productId: id });
              }}
            >
              <i className="fa-solid fa-cart-shopping "></i>
            </div>
            <Link
              to={`/products/${id}`}
              className="icon cursor-pointer bg-primary-600 text-white w-7 h-7 flex justify-center items-center rounded-full"
            >
              <i className="fa-solid fa-eye "></i>
            </Link>
          </div>
        </div>
        <div className="card-body space-y-3 p-4">
          <header className="space-y-1">
            <h2 className=" text-primary-600 font-semibold">{category.name}</h2>
            <h3 className="text-xl text-slate-800 font-semibold line-clamp-1">
              <Link to={`/products/${id}`}>{title}</Link>
            </h3>
          </header>
          <p className="line-clamp-2 text-sm text-gray-500 ">{description}</p>
          <div className="flex justify-between">
            <span>{price}E</span>
            <div>
              <i className="fa-solid fa-star text-yellow-500 mr-1"></i>
              <span>{ratingsAverage}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
