import { useDispatch } from "react-redux";
import { cartActions } from "../redux";

const useCartHandler = ({
  id,
  name,
  author,
  maxQuantity,
  image,
  featured,
  price,
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

  return { addToCartOnClickHandler, decreaseQuantityInCartHandler };
};

export { useCartHandler };
