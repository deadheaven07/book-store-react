import { useState } from "react";
import {
  URL_PARAM_BOOK_NAME,
  URL_PARAM_BOOK_NAME_TEXT,
} from "../constants/general";
import { useSelector } from "react-redux";
import { Heading } from "../components";
import { useCartHandler } from "../hooks";

const EachBookPage = () => {
  const [urlParams] = useState(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const bookId = searchParams.get(URL_PARAM_BOOK_NAME);
    const bookName = searchParams.get(URL_PARAM_BOOK_NAME_TEXT);
    // console.log(bookName);
    return { book: bookId, name: bookName };
  });
  const products = useSelector((state) => state.products);
  const cart = useSelector((state) => state.cart.items);
  return (
    <div className="w-full h-full flex flex-col">
      {/*  */}
      <Heading displayText={`Book Named: ${urlParams.name}`} />
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
                    eachBook.id.toString().toLowerCase() ===
                    urlParams.book.toLowerCase()
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
                    <Books
                      key={eachBook.id}
                      id={eachBook.id}
                      author={eachBook.author}
                      featured={eachBook.featured}
                      image={eachBook.image}
                      maxQuantity={eachBook.maxQuantity}
                      name={eachBook.name}
                      price={eachBook.price}
                      quantityInCart={cartQuantity}
                      description={eachBook.description}
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

export default EachBookPage;

const Books = ({
  id,
  name,
  author,
  maxQuantity,
  image,
  featured,
  price,
  quantityInCart,
  description,
}) => {
  const { addToCartOnClickHandler, decreaseQuantityInCartHandler } =
    useCartHandler({ id, name, author, maxQuantity, image, featured, price });

  return (
    <div
      key={id}
      className="w-96 border-2 rounded-lg flex items-center  flex-col pt-4 border-orange-400 "
    >
      <div className="">
        <img src={image} alt="book" className="object-cover p-4" />
      </div>
      <div className="w-full bg-orange-400 rounded-b-md flex flex-col pt-2 px-2 pb-2">
        <p className="text-lg truncate">{name}</p>
        <p className="">&mdash; {author}</p>
        <p className="py-4">Description &mdash; {description}</p>
        <div className="flex items-end justify-between ">
          <p className="min-w-max text-xl text-white font-bold">₹ {price}</p>
          {/* add to cart */}
          {quantityInCart === 0 && (
            <button
              onClick={addToCartOnClickHandler}
              className=" text-orange-400 font-semibold bg-white w-24 py-1 mt-2 rounded-md ring-white ring-1"
            >
              Add
            </button>
          )}
          {/* When cart does not contains this product */}
          {quantityInCart !== 0 && (
            <div className="flex justify-between items-center w-24 px-2 py-1 mt-2 ring-white  rounded-md ring-1 ">
              <button
                onClick={decreaseQuantityInCartHandler}
                className="text-white font-bold "
              >
                -
              </button>

              {/* {initalItemCount.status === LOADING_STATUS.SUCCEEDED && ( */}
              <p className="text-white font-bold ">{quantityInCart}</p>
              {/* )} */}
              <button
                onClick={addToCartOnClickHandler}
                className="text-white font-bold "
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
