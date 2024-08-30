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

// Styled button with pulse effect and responsive styles
const FlashSaleButton = styled.button`
  background-color: #ff4757;
  color: white;
  font-size: 1.2rem;
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
    font-size: 1rem;
    padding: 0.6rem 1.2rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    padding: 0.5rem 1rem;
  }
`;

// Styled timer inside the button
const Timer = styled.div`
  font-size: 0.8rem;
  color: white;
  margin-left: 0.5rem;

  @media (max-width: 768px) {
    font-size: 0.7rem;
  }

  @media (max-width: 480px) {
    font-size: 0.6rem;
  }
`;

// Countdown Timer Component
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

  return <Timer>Time Left: {formatTime(timeLeft)}</Timer>;
};

// Main Component
const FreeDelivery = () => {
  const initialTime = 2 * 60 * 1000; // Flash sale ends in 2 hours

  return (
    <div>
      <Link smooth to='/#whyChooseUs'>
        <FlashSaleButton>
          Free Delivery!
          <CountdownTimer initialTime={initialTime} />
        </FlashSaleButton>
      </Link>
    </div>
  );
};

export default FreeDelivery;
