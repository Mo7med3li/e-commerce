import React, { useContext } from "react";
import { CartContext } from "../../context/Cart.context";

export default function CartItem({ productInfo }) {
  const { price, product, count } = productInfo;

  const { deleteCartProduct, UPdateProdcuntCount } = useContext(CartContext);

  return (
    <>
      <div className=" flex gap-6  ">
        <div className="cart-item flex items-center justify-between grow bg-gray-100 py-4 px-6 rounded-lg ">
          <img
            src={product.imageCover}
            alt={product.title}
            className="w-24 h-24 rounded-full border-4 border-white object-cover"
          />
          <h3 className="text-lg text-gray-700 font-semibold">
            {product.title}
          </h3>

          <h4 className="  text-gray-500 font-semibold">
            {product.category.name}
          </h4>
          <div className="count flex gap-5 items-center">
            <span className="text-xl  font-bold text-gray-600">{count}</span>
            <div className="icons flex flex-col gap-2">
              <i
                className="fa-solid fa-circle-plus text-lg cursor-pointer"
                onClick={() => {
                  UPdateProdcuntCount({
                    productId: product.id,
                    count: count + 1,
                  });
                }}
              ></i>
              <i
                className="fa-solid fa-circle-minus  text-lg cursor-pointer"
                onClick={() => {
                  UPdateProdcuntCount({
                    productId: product.id,
                    count: count - 1,
                  });
                }}
              ></i>
            </div>
          </div>
          <h5>{price} L.E</h5>
        </div>
        <button
          className="remove  flex items-center bg-gray-100 justify-center rounded-lg p-4  hover:bg-gray-200 transition-colors duration-300"
          onClick={() => {
            deleteCartProduct({ productId: product.id });
          }}
        >
          <i className="fa-solid fa-circle-xmark"></i>
        </button>
      </div>
    </>
  );
}
