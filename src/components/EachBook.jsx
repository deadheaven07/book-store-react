import { useNavigate } from "react-router-dom";
import { useCartHandler } from "../hooks";
import { ROUTE_EACH_BOOK } from "../constants/route";
import {
  URL_PARAM_BOOK_NAME,
  URL_PARAM_BOOK_NAME_TEXT,
} from "../constants/general";

export const EachBook = ({
  id,
  name,
  author,
  maxQuantity,
  image,
  featured,
  price,
  quantityInCart,
}) => {
  const navigate = useNavigate();
  const { addToCartOnClickHandler, decreaseQuantityInCartHandler } =
    useCartHandler({ id, name, author, maxQuantity, image, featured, price });

  return (
    <div className="w-64 border-2 rounded-lg flex items-center  flex-col pt-4 border-orange-400 ">
      <div className="h-60 w-60 ">
        <img
          onClick={() => {
            navigate(
              `${ROUTE_EACH_BOOK}/?${URL_PARAM_BOOK_NAME}=${id}&${URL_PARAM_BOOK_NAME_TEXT}=${name}`
            );
          }}
          src={image}
          alt="book"
          className="object-cover p-4 cursor-pointer"
        />
      </div>
      <div className="w-full bg-orange-400 rounded-b-md flex flex-col pt-2 px-2 h-28">
        <p className="text-lg truncate">{name}</p>
        <p className="">&mdash; {author}</p>
        <div className="flex items-end justify-between ">
          <p className="min-w-max text-xl text-white font-bold">₹ {price}</p>
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
