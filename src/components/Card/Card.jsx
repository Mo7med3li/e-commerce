import google from "../../assets/images/get-google-play.png";

export default function Card() {
  return (
    <>
      <div className="card group/card rounded-lg shadow-lg overflow-hidden ">
        <div className=" relative ">
          <img src={google} alt="" className="object-cover" />
          <div className="card-layer absolute inset-0 w-full h-full bg-slate-400 flex items-center justify-center gap-3 bg-opacity-40 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
            <div className="icon cursor-pointer bg-primary-600 text-white w-7 h-7 flex justify-center items-center rounded-full">
              <i class="fa-solid fa-heart "></i>
            </div>
            <div className="icon cursor-pointer bg-primary-600 text-white w-7 h-7 flex justify-center items-center rounded-full">
              <i class="fa-solid fa-cart-shopping "></i>
            </div>
            <div className="icon cursor-pointer bg-primary-600 text-white w-7 h-7 flex justify-center items-center rounded-full">
              <i class="fa-solid fa-eye "></i>
            </div>
          </div>
        </div>
        <div className="card-body space-y-3 p-4">
          <header className="space-y-1">
            <h2 className=" text-primary-600 font-semibold">Category </h2>
            <h3 className="text-xl text-slate-800 font-semibold">Tittle</h3>
          </header>
          <p className="line-clamp-2 text-sm text-gray-500 ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum,
            ipsa.
          </p>
          <div className="flex justify-between">
            <span>price</span>
            <div>
              <i class="fa-solid fa-star text-yellow-500 mr-1"></i>
              <span>4.8</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
