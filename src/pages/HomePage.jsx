import { images } from "../assets/images";
import { LoadingSpinner } from "../components";
import { LOADING_STATUS } from "../constants/general";

const HomePage = () => {
  return (
    <div className="w-full h-full flex flex-col">
      {/*  */}
      <h1 className="text-2xl text-center font-bold my-3 h-7 flex items-center justify-center">
        Welcome to the world of books!
      </h1>
      {/* Featured */}
      <section className="w-full h-full">
        <div className="w-full h-full ">
          <div className="flex">
            <h2 className="pl-8 pt-8 text-4xl font-semibold mb-4">Featured</h2>
          </div>
          {/* mapping container */}
          <div>
            {/* eachbook */}
            <div className="w-64 border-2 rounded-md flex items-center  flex-col pt-4 border-orange-400 ">
              <div className="h-60 w-60 ">
                <img
                  src={images.book}
                  alt="book"
                  className="object-cover p-4"
                />
              </div>
              <div className="w-full bg-orange-400 rounded-b-md flex flex-col py-2 px-2">
                <p className="text-lg">BookName</p>
                <p className="">Written by: Author</p>
                <p className="">₹ {11}</p>
                {/* add to cart */}
                {
                  <button
                    onClick={"addToCartOnClickHandler"}
                    className=" text-orange-400 font-semibold bg-white w-24 py-1 mt-2 rounded-md ring-white ring-1"
                  >
                    Add
                  </button>
                }
                {/* When cart does not contains this product */}
                {
                  <div className="flex justify-between items-center w-24 px-2 py-1 ring-white  rounded-md ring-1 ">
                    <button
                      onClick={"decreaseQuantityInCartHandler"}
                      className="text-white font-bold text-xl"
                    >
                      -
                    </button>
                    {/* {initalItemCount.status === LOADING_STATUS.LOADING && (
                      <LoadingSpinner height={"h-4"} />
                    )} */}
                    {/* {initalItemCount.status === LOADING_STATUS.SUCCEEDED && ( */}
                    <p className="text-white font-bold ">
                      {/* {itemQuantity} */}5
                    </p>
                    {/* )} */}
                    <button
                      onClick={"increaseQuantityInCartHandler"}
                      className="text-white font-bold text-xl"
                    >
                      +
                    </button>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
