import React, { useContext } from "react";
import { CartContext } from "../../context/Cart.context";
import { Link } from "react-router-dom";

export default function CartItem({ productInfo }) {
  const { price, product, count } = productInfo;

  const { deleteCartProduct, UPdateProdcuntCount } = useContext(CartContext);

  return (
    <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center space-x-4">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <img
            src={product.imageCover}
            alt={product.title}
            className="w-20 h-20 rounded-lg object-cover border border-gray-200"
          />
        </div>

        {/* Product Info */}
        <div className="flex-grow min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-grow">
              <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
                <Link
                  to={`/products/${product.id}`}
                  className="hover:text-primary-600 transition-colors duration-200"
                >
                  {product.title}
                </Link>
              </h3>
              <p className="text-sm text-gray-500 mb-2">
                Category:{" "}
                <span className="font-medium">{product.category.name}</span>
              </p>
              <div className="text-xl font-bold text-primary-600">
                {price} L.E
              </div>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center space-x-3 ml-4">
              <div className="flex items-center space-x-2 bg-white rounded-lg border border-gray-200 p-1">
                <button
                  className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => {
                    UPdateProdcuntCount({
                      productId: product.id,
                      count: count - 1,
                    });
                  }}
                  disabled={count <= 1}
                >
                  <i className="fa-solid fa-minus text-sm text-gray-600"></i>
                </button>

                <span className="w-8 text-center font-semibold text-gray-900">
                  {count}
                </span>

                <button
                  className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors duration-200"
                  onClick={() => {
                    UPdateProdcuntCount({
                      productId: product.id,
                      count: count + 1,
                    });
                  }}
                >
                  <i className="fa-solid fa-plus text-sm text-gray-600"></i>
                </button>
              </div>

              {/* Remove Button */}
              <button
                className="w-10 h-10 flex items-center justify-center bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors duration-200"
                onClick={() => {
                  deleteCartProduct({ productId: product.id });
                }}
                title="Remove item"
              >
                <i className="fa-solid fa-trash text-sm"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
