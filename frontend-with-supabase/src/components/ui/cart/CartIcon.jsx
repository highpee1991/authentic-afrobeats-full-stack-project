import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import styled from "styled-components";
import { useCart } from "../../context/CartContext";

const CartIconWrapper = styled.div`
  position: relative;
  cursor: pointer;
`;

const CartCounter = styled.div`
  position: absolute;
  top: -8px;
  left: 15px;
  background: var(--color-brand-600);
  color: white;
  border-radius: 50%;
  padding: 0.2rem 0.5rem;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 1.5rem;
  min-height: 1.5rem;
`;

const CartIcon = () => {
  const { state } = useCart();
  const itemCount = state.items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <CartIconWrapper>
      <FaShoppingCart size={16} />
      {itemCount > 0 && <CartCounter>{itemCount}</CartCounter>}
    </CartIconWrapper>
  );
};

export default CartIcon;
