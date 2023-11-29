import { useSelector } from "react-redux";
import { Heading } from "./../components";
import { EachBook } from "../components";
const HomePage = () => {
  const products = useSelector((state) => state.products);

  const cart = useSelector((state) => state.cart.items);
  // console.log(products);

  return (
    <div className="w-full h-full flex flex-col">
      {/*  */}
      <Heading displayText={"Welcome to the world of books!"} />
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
