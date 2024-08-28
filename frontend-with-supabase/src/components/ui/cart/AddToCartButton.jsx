import React from "react";
import { useCart } from "../../context/CartContext";
import { toast } from "react-toastify";
import Button from "../shared/button/Button";

//incomplete pathprefix for cart component
const AddToCartButton = ({ item }) => {
  const { dispatch } = useCart();

  const handleAddToCart = () => {
    const { id, name, price, img1 } = item;
    const effectivePrice = item.discount_price
      ? item.discount_price
      : item.price;

    const cartItem = {
      id,
      name,
      price: effectivePrice,
      image: img1,
    };

    dispatch({ type: "ADD_ITEM", payload: cartItem });
    toast.success("Item added to cart");
  };

  return (
    <Button size='small' onClick={handleAddToCart}>
      ADD TO CART
    </Button>
  );
};

export default AddToCartButton;
