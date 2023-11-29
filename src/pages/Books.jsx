import { useSelector } from "react-redux";
import { EachBook } from "../components";
import { useState } from "react";

const Books = () => {
  const products = useSelector((state) => state.products);
  const cart = useSelector((state) => state.cart.items);
  const [isShowFeaturedOnly, setIsShowFeaturedOnly] = useState(false);

  return (
    <div className="w-full h-full flex flex-col">
      {/*  */}
      <h1 className="text-2xl text-center font-bold my-3 h-7 flex items-center justify-center">
        All Books
      </h1>
      {/* Featured */}
      <section className="w-full h-10 flex-1">
        <div className="w-full h-full flex flex-col ">
          <div className="flex w-full">
            <h2 className="pl-8 text-xl font-semibold mb-2 flex items-center justify-center gap-3">
              <span>Flter:</span>
              <button
                onClick={() => {
                  setIsShowFeaturedOnly((prev) => !prev);
                }}
                className={`ring-2 ring-orange-400 px-3 rounded-full ${
                  isShowFeaturedOnly ? "bg-orange-400" : ""
                }`}
              >
                Show only featured
              </button>
            </h2>
          </div>
          {/* mapping container */}
          <div className="w-full h-10 flex-1 flex flex-wrap justify-center gap-8 overflow-y-auto items-center">
            {/* eachbook */}
            {products
              .filter((eachBook) =>
                isShowFeaturedOnly ? eachBook.featured : true
              )
              .map((eachBook) => {
                let cartQuantity = 0;
                const itemInCart = cart.find((item) => item.id === eachBook.id);
                if (itemInCart) {
                  cartQuantity = itemInCart.quantity;
                }
                return (
                  <EachBook
                    key={eachBook.id}
                    id={eachBook.id}
                    author={eachBook.author}
                    featured={eachBook.featured}
                    image={eachBook.image}
                    maxQuantity={eachBook.maxQuantity}
                    name={eachBook.name}
                    price={eachBook.price}
                    quantityInCart={cartQuantity}
                  />
                );
              })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Books;
