import { useContext, useEffect } from "react";
import { CartContext } from "../../context/Cart.context";
import Loading from "../../components/Loading/Loading";
import CartItem from "../../components/CartItem/CartItem";
import { Link } from "react-router-dom";

export default function Cart() {
  const { getCartProducts, cartInfo, deleteCart } = useContext(CartContext);
  useEffect(() => {
    getCartProducts();
  }, []);
  return (
    <>
      {cartInfo === null ? (
        <Loading />
      ) : (
        <section>
          <div className="flex items-center gap-8">
            <i className="fa-brands  fa-opencart text-3xl"></i>
            <h2 className="text-xl text-slate-600 font-semibold relative before:absolute before:w-0.5 before:h-3/4 before:bg-slate-600 before:-left-1 before:top-1/2 before:-translate-y-1/2 pl-4">
              Your Shopping Cart
            </h2>
          </div>
          {cartInfo.numOfCartItems === 0 ? (
            <>
              <div className=" mt-6 bg-gray-100 p-6 rounded-md shadow flex flex-col justify-center items-center">
                <h2>
                  Oops! Your Cart is empty. Start Shopping now by clicking the
                  button bellow and find something you love!
                </h2>
                <Link to="/" className="btn ">
                  Back To Home Page
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-4 mt-6">
                {cartInfo.data.products.map((products) => (
                  <CartItem productInfo={products} key={products._id} />
                ))}
              </div>
              <div className="py-3 flex justify-between">
                <p>
                  <i className="fa-solid fa-dollar-sign text-xl mr-2 text-primary-800"></i>
                  You Total Cart is Price
                  <span className="text-primary-800 font-bold px-1">
                    {cartInfo.data.totalCartPrice}
                  </span>
                </p>
                <button
                  className="btn bg-red-500 hover:bg-red-700 "
                  onClick={deleteCart}
                >
                  <i className="fa-solid fa-trash mr-2"></i>
                  Delete Cart
                </button>
              </div>
            </>
          )}
        </section>
      )}
    </>
  );
}
