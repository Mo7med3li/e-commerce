import { Helmet } from "react-helmet";

export default function Brands() {
  return (
    <>
      <Helmet>
        <title>All Brands</title>
        <meta name="description" content="FreshCart| Brands Component" />
      </Helmet>
      <h2 className="text-2xl font-semibold text-primary-700 w-fit mx-auto">
        All Brands
      </h2>
      <div className=" md:grid md:grid-cols-4 gap-6">
        <div className="text-center border-2 rounded-lg overflow-hidden border-gray-300 hover:shadow-primary-400 hover:shadow-lg transition-shadow duration-400 ">
          <img
            src="https://ecommerce.routemisr.com/Route-Academy-products/1680403397402-cover.jpeg"
            className="w-full object-cover "
          />
          <h2 className=" font-bold py-7 text-xl">Brand</h2>
        </div>
      </div>
    </>
  );
}
