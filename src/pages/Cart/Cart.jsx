import { useContext, useEffect } from "react";
import { CartContext } from "../../context/Cart.context";
import Loading from "../../components/Loading/Loading";

export default function Cart() {
  const { getCartProducts, cartInfo } = useContext(CartContext);
  useEffect(() => {
    getCartProducts();
  }, []);
  return (
    <>
      {cartInfo === null ? (
        <Loading />
      ) : (
        <section>
          {cartInfo.numOfCartItems === 0 ? (
            <h2>Products empty</h2>
          ) : (
            <h2>Products</h2>
          )}
        </section>
      )}
    </>
  );
}
