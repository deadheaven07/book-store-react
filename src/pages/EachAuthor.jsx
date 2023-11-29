import { useSelector } from "react-redux";
import { EachBook, Heading } from "../components";
import { URL_PARAM_AUTHOR_NAME } from "../constants/general";
import { useState } from "react";

const EachAuthor = () => {
  const [urlParams] = useState(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const authorName = searchParams.get(URL_PARAM_AUTHOR_NAME);
    return { author: authorName };
  });
  const products = useSelector((state) => state.products);
  const cart = useSelector((state) => state.cart.items);
  return (
    <div className="w-full h-full flex flex-col">
      {/*  */}
      <Heading displayText={`Books by: ${urlParams.author}`} />
      {/* Featured */}
      <section className="w-full h-10 flex-1">
        <div className="w-full h-full flex flex-col ">
          {/* mapping container */}
          <div className="w-full h-10 flex-1 flex flex-col overflow-y-auto justify-center items-center gap-2 pt-10">
            {/* eachbook */}
            <div className="w-full h-10 flex-1 flex flex-wrap justify-center gap-8 overflow-y-auto items-center">
              {/* eachbook */}
              {products
                .filter(
                  (eachBook) =>
                    eachBook.author.toLowerCase() ===
                    urlParams.author.toLowerCase()
                )
                .map((eachBook) => {
                  let cartQuantity = 0;
                  const itemInCart = cart.find(
                    (item) => item.id === eachBook.id
                  );
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
        </div>
      </section>
    </div>
  );
};

export default EachAuthor;
