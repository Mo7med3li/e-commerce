export default function Orders() {
  return (
    <>
      <section>
        <div className="border-gray-400 rounded-lg border-2 border-opacity-25  p-3 space-y-3">
          <header className="  flex justify-between items-center ">
            <div>
              <h2 className="text-gray-500 ">Order ID</h2>
              <span className="texr-lg font-semibold text-gray-800">#456</span>
            </div>
            <div className="space-x-3">
              <span className="inline-block rounded-xl text-white font-semibold bg-red-600 px-3 py-1">
                Not Paid
              </span>
              <span className="inline-block rounded-xl text-white font-semibold bg-blue-600 px-3 py-1">
                Under delivery
              </span>
            </div>
          </header>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 md:gap-4">
            <div className="product-item  border-2 rounded-lg border-gray-400 p-4 border-opacity-25">
              <img
                src="https://ecommerce.routemisr.com/Route-Academy-products/1680403397402-cover.jpeg"
                alt=""
                className="w-full object-cover"
              />
              <h3 className="font-semibold text-lg text-gray-700">
                Woman shawl
              </h3>
              <div className="flex items-center justify-between mt-1">
                <p>
                  <span className="font-bold ">Count:</span>5
                </p>
                <span>149 L.E</span>
              </div>
            </div>
          </div>
          <p>
            Total Order Price is{" "}
            <span className="text-primary-600 font-semibold">4567</span> L.E
          </p>
        </div>
      </section>
    </>
  );
}
