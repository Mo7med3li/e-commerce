import { useContext } from "react";
import { CartContext } from "../../context/Cart.context";
import { Link } from "react-router-dom";
import { WishlistContext } from "../../context/Wishlist.context";
import PropTypes from "prop-types";

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

  // Context
  let { addProductToCart } = useContext(CartContext);
  let { addToWishlist, checkedProduct } = useContext(WishlistContext);

  return (
    <>
      <div className="group/card bg-white rounded-3xl shadow-lg hover:shadow-2xl overflow-hidden cursor-pointer transition-all duration-500 transform hover:-translate-y-3 border border-slate-100 hover:border-primary-200 relative h-full flex flex-col">
        {/* Premium Badge */}
        {ratingsAverage >= 4.5 && (
          <div className="absolute top-3 right-3 z-20">
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg flex items-center space-x-1">
              <i className="fa-solid fa-crown text-xs"></i>
              <span>Premium</span>
            </span>
          </div>
        )}

        {/* Image Container */}
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100">
          <img
            src={imageCover}
            alt={title}
            className="w-full h-48 md:h-56 object-cover transition-all duration-700 group-hover/card:scale-110 group-hover/card:brightness-110"
            loading="lazy"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>

          {/* Overlay with Action Buttons */}
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center gap-3 opacity-0 group-hover/card:opacity-100 transition-all duration-500 backdrop-blur-sm">
            {/* Wishlist Button */}
            <button
              className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 transform hover:scale-110 hover:rotate-12 ${
                checkedProduct({ productId: id })
                  ? "bg-red-500 text-white shadow-xl animate-pulse"
                  : "bg-white/90 text-slate-600 hover:bg-red-500 hover:text-white backdrop-blur-sm"
              }`}
              onClick={() => {
                addToWishlist({ productId: id });
              }}
              title={
                checkedProduct({ productId: id })
                  ? "Remove from wishlist"
                  : "Add to wishlist"
              }
            >
              <i
                className={`fa-solid fa-heart text-lg ${
                  checkedProduct({ productId: id }) ? "animate-bounce" : ""
                }`}
              ></i>
            </button>

            {/* Add to Cart Button */}
            <button
              className="w-12 h-12 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white flex items-center justify-center rounded-full transition-all duration-300 transform hover:scale-110 hover:rotate-12 shadow-xl backdrop-blur-sm"
              onClick={() => {
                addProductToCart({ productId: id });
              }}
              title="Add to cart"
            >
              <i className="fa-solid fa-cart-shopping text-lg"></i>
            </button>

            {/* View Details Button */}
            <Link
              to={`/products/${id}`}
              className="w-12 h-12 bg-white/90 hover:bg-white text-slate-600 flex items-center justify-center rounded-full transition-all duration-300 transform hover:scale-110 hover:rotate-12 shadow-xl backdrop-blur-sm"
              title="View details"
            >
              <i className="fa-solid fa-eye text-lg"></i>
            </Link>
          </div>

          {/* Category Badge */}
          <div className="absolute top-3 left-3 z-10">
            <span className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm">
              {category.name}
            </span>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-6 space-y-4 bg-gradient-to-b from-white to-slate-50 flex-1 flex flex-col">
          {/* Title */}
          <div>
            <h3 className="text-lg font-bold text-slate-800 line-clamp-2 hover:text-primary-600 transition-colors duration-300 group-hover/card:text-primary-700">
              <Link to={`/products/${id}`} className="block">
                {title}
              </Link>
            </h3>
          </div>

          {/* Description */}
          <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
            {description}
          </p>

          {/* Price and Rating */}
          <div className="flex items-center justify-between pt-2">
            {/* Price */}
            <div className="flex items-center space-x-1">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                {price}
              </span>
              <span className="text-sm text-slate-500 font-medium">EGP</span>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-1 bg-gradient-to-r from-yellow-50 to-yellow-100 px-3 py-2 rounded-full border border-yellow-200">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <i
                    key={i}
                    className={`fa-solid fa-star text-xs ${
                      i < Math.floor(ratingsAverage)
                        ? "text-yellow-400"
                        : "text-slate-300"
                    }`}
                  ></i>
                ))}
              </div>
              <span className="text-sm font-bold text-slate-700">
                {ratingsAverage}
              </span>
            </div>
          </div>

          {/* Quick Actions Footer */}
          <div className="pt-4 border-t border-slate-200 mt-auto">
            <div className="flex items-center justify-between">
              <Link
                to={`/products/${id}`}
                className="text-sm font-semibold text-primary-600 hover:text-primary-700 transition-all duration-300 flex items-center space-x-2 group/link"
              >
                <span>View Details</span>
                <i className="fa-solid fa-arrow-right text-xs group-hover/link:translate-x-1 transition-transform duration-300"></i>
              </Link>

              <button
                className="text-sm font-semibold text-slate-600 hover:text-primary-600 transition-all duration-300 flex items-center space-x-2 group/btn"
                onClick={() => {
                  addProductToCart({ productId: id });
                }}
              >
                <i className="fa-solid fa-cart-plus text-xs group-hover/btn:scale-110 transition-transform duration-300"></i>
                <span>Quick Add</span>
              </button>
            </div>
          </div>

          {/* Additional Features */}
          <div className="flex items-center justify-between text-xs text-slate-500 pt-2">
            <div className="flex items-center space-x-1">
              <i className="fa-solid fa-truck text-primary-500"></i>
              <span>Free Shipping</span>
            </div>
            <div className="flex items-center space-x-1">
              <i className="fa-solid fa-shield-check text-green-500"></i>
              <span>Secure</span>
            </div>
          </div>
        </div>

        {/* Hover Glow Effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary-500/0 via-primary-500/5 to-primary-500/0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      </div>
    </>
  );
}

Card.propTypes = {
  productInfo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageCover: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    ratingsAverage: PropTypes.number.isRequired,
    category: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
