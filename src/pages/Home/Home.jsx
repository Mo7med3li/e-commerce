import axios from "axios";
import Card from "../../components/Card/Card";
import Loading from "../../components/Loading/Loading";
import { useEffect, useState } from "react";
import HomeSlider from "../../components/HomeSlider/HomeSlider";
import CategorySlider from "../../components/CategorySlider/CategorySlider";

export default function Home() {
  const [products, setProducts] = useState(null);
  async function getProducts() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/products",
      method: "GET",
    };
    let { data } = await axios.request(options);
    setProducts(data.data);
  }
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <HomeSlider />
      <CategorySlider />
      {products === null ? (
        <Loading />
      ) : (
        <div className="grid sm:grid-cols-2 sm:gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {products.map((products) => (
            <Card productInfo={products} key={products.id} />
          ))}
        </div>
      )}
    </>
  );
}
