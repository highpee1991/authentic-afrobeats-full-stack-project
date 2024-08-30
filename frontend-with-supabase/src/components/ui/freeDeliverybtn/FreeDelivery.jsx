import React, { useState, useEffect } from "react";
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

// Styled button with pulse effect
const FlashSaleButton = styled.button`
  background-color: #ff4757;
  color: white;
  font-size: 1.5rem;
  padding: 1rem 2rem;
  border: none;
  border-radius: 5px;
  margin-left: 2rem;
  cursor: pointer;
  animation: ${pulse} 2s infinite;
  &:hover {
    background-color: #ff6b81;
  }
`;

// Countdown Timer
const CountdownTimer = ({ initialTime }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          return initialTime; // Reset the timer
        }
        return prevTime - 1000; // Decrease time by 1 second
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup the interval on unmount
  }, [initialTime]);

  const formatTime = (time) => {
    const hours = Math.floor(time / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  return <div>Time Left: {formatTime(timeLeft)}</div>;
};

// Main Component
const FreeDelivery = () => {
  const initialTime = 2 * 60 * 60 * 1000; // Flash sale ends in 2 hours

  return (
    <div>
      <Link smooth to='/#whyChooseUs'>
        <FlashSaleButton>Free Delivery!</FlashSaleButton>
      </Link>
      <CountdownTimer initialTime={initialTime} />
    </div>
  );
};

export default FreeDelivery;
