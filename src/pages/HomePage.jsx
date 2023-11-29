import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../redux";

const HomePage = () => {
  const products = useSelector((state) => state.products);

  const cart = useSelector((state) => state.cart.items);
  // console.log(products);

  return (
    <div className="w-full h-full flex flex-col">
      {/*  */}
      <h1 className="text-2xl text-center font-bold my-3 h-7 flex items-center justify-center">
        Welcome to the world of books!
      </h1>
      {/* Featured */}
      <section className="w-full h-10 flex-1">
        <div className="w-full h-full flex flex-col ">
          <div className="flex w-full">
            <h2 className="pl-8 pt-8 text-3xl font-semibold mb-4">Featured</h2>
          </div>
          {/* mapping container */}
          <div className="w-full h-10 flex-1 flex flex-wrap justify-center gap-8 overflow-y-auto items-center">
            {/* eachbook */}
            {products.map((eachBook) => {
              if (eachBook.featured) {
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
              }
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

const EachBook = ({
  id,
  name,
  author,
  maxQuantity,
  image,
  featured,
  price,
  quantityInCart,
}) => {
  const dispatch = useDispatch();
  const addToCartOnClickHandler = () => {
    dispatch(
      cartActions.addItemToCart({
        id,
        name,
        author,
        maxQuantity,
        image,
        featured,
        price,
      })
    );
  };

  const decreaseQuantityInCartHandler = () => {
    dispatch(cartActions.removeItemFromCart(id));
  };
  return (
    <div className="w-64 border-2 rounded-lg flex items-center  flex-col pt-4 border-orange-400 ">
      <div className="h-60 w-60 ">
        <img src={image} alt="book" className="object-cover p-4" />
      </div>
      <div className="w-full bg-orange-400 rounded-b-md flex flex-col pt-2 px-2 h-28">
        <p className="text-lg">{name}</p>
        <p className="">&mdash; {author}</p>
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
