import React from "react";
import styled, { keyframes } from "styled-components";
import { HashLink as Link } from "react-router-hash-link";

// Keyframes for pulse animation
const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

// Styled button with pulse effect and responsive styles
const FlashSaleButton = styled.button`
  background-color: #ff4757;
  color: white;
  font-size: 1.4rem;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 5px;
  margin: 1rem;
  cursor: pointer;
  animation: ${pulse} 2s infinite;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &:hover {
    background-color: #ff6b81;
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
    padding: 0.6rem 1.2rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    padding: 0.5rem 1rem;
  }
`;

// Main Component
const FreeDelivery = () => {
  return (
    <div>
      <Link smooth to='/#whyChooseUs'>
        <FlashSaleButton>Free Delivery!</FlashSaleButton>
      </Link>
    </div>
  );
};

export default FreeDelivery;
