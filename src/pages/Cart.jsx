import { useSelector } from "react-redux";
import { Heading } from "../components";
import { useCartHandler } from "../hooks";

const Cart = () => {
  const cart = useSelector((state) => state.cart.items);

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  return (
    <div className="w-full h-full flex flex-col">
      {/*  */}
      <Heading
        displayText={`${
          totalPrice !== 0
            ? `Cart: Total Cost: ₹ ${totalPrice}`
            : "Please add some books to cart"
        }`}
      />

      {/* Featured */}
      <section className="w-full h-10 flex-1">
        <div className="w-full h-full flex flex-col ">
          {/* mapping container */}
          <div className="w-full h-10 flex-1 flex flex-col justify-center gap-8 overflow-y-auto items-center  pt-40">
            {/* eachbook */}
            {cart.map((eachBook) => {
              let cartQuantity = 0;
              const itemInCart = cart.find((item) => item.id === eachBook.id);
              if (itemInCart) {
                cartQuantity = itemInCart.quantity;
              }
              return (
                <EachCartItem
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

export default Cart;

export const EachCartItem = ({
  id,
  name,
  author,
  maxQuantity,
  image,
  featured,
  price,
  quantityInCart,
}) => {
  const { addToCartOnClickHandler, decreaseQuantityInCartHandler } =
    useCartHandler({ id, name, author, maxQuantity, image, featured, price });

  return (
    <div className="w-96 border-2 rounded-lg flex items-center border-orange-400 ">
      <div className="h-24 w-24 flex justify-center items-center">
        <img
          src={image}
          alt="book"
          className="object-cover p-4 cursor-pointer "
        />
      </div>
      <div className="w-full bg-orange-400 flex flex-col py-2 px-2 ">
        <p className="text-lg truncate">{name}</p>
        <p className="">&mdash; {author}</p>
        <div className="flex items-end justify-between ">
          <p className="min-w-max text-xl text-white font-bold">
            ₹ {parseInt(price) * quantityInCart}
          </p>
          {/* add to cart */}
          {quantityInCart === 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCartOnClickHandler();
              }}
              className=" text-orange-400 font-semibold bg-white w-24 py-1 mt-2 rounded-md ring-white ring-1"
            >
              Add
            </button>
          )}
          {/* When cart does not contains this product */}
          {quantityInCart !== 0 && (
            <div className="flex justify-between items-center w-24 px-2 py-1 mt-2 ring-white  rounded-md ring-1 ">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  decreaseQuantityInCartHandler();
                }}
                className="text-white font-bold "
              >
                -
              </button>

              {/* {initalItemCount.status === LOADING_STATUS.SUCCEEDED && ( */}
              <p className="text-white font-bold ">{quantityInCart}</p>
              {/* )} */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCartOnClickHandler();
                }}
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
