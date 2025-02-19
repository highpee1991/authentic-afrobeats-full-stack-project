import React from "react";
import Button from "../shared/button/Button";
import styled, { keyframes } from "styled-components";

// Keyframe for blinking effect
const blink = keyframes`
  50% {
    opacity: 0;
  }
`;

// Container to center content and ensure responsiveness
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: start;
  padding: 1rem;
  box-sizing: border-box;
  background-color: #f5f5f5;
  border-bottom: 1px solid #969595;
`;

// Styled blinking text
const BlinkingText = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  color: red;
  animation: ${blink} 1s infinite;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 1.5rem; /* Adjust font size for smaller screens */
  }
`;

// Styled image with responsiveness
const ImageStyle = styled.img`
  width: 60%;
  max-width: 400px;
  height: auto;
  margin-bottom: 1rem 0;

  @media (max-width: 768px) {
    width: 80%;
  }
`;

// Styled content for spacing and alignment
const Content = styled.div`
  font-size: 1.3rem;
  color: #333;
  margin-bottom: 1rem;

  div {
    margin-bottom: 0.5rem;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem; /* Adjust font size for smaller screens */
  }
`;

// Button wrapper for proper spacing
const ButtonWrapper = styled.div`
  margin-top: 1rem;
`;

const ForSale = () => {
  const handleButtonClick = () => {
    window.open(
      "https://www.bizbuysell.com/Business-Opportunity/African-Supermarket-in-High-Traffic-Area/2321903/?returnurl=d3d3LmJpemJ1eXNlbGwuY29tL2Jyb2tlcmRpcmVjdG9yeS9Qcm9maWxlL1ZpZXdCcm9rZXJQcm9maWxlLmFzcHg%2fQnJva2VyUHJvZmlsZUlEPTM4OTQ1&returnurllabel=50",
      "_blank"
    );
  };

  return (
    <Container>
      <>
        <ImageStyle src="/images/forSale/sale.jpeg" alt="sale" />
      </>
      <>
        <BlinkingText>
          Breaking News: African Supermarket for Sale in Humble, TX!
        </BlinkingText>
        <Content>
          <div>
            📍 Address: 9635 N. Sam Houston Pkwy E, Suite 350, Humble, TX
          </div>
          <div>
            🏬 This African Market offers a prime location in a high-traffic
            shopping center near Beltway 8! A perfect opportunity for investors
            or business owners!
          </div>
          <div>📅 Open House: February 28, 2025, from 7 PM – 9 PM.</div>
          <div>🔗 Click Below to View Full Details and Make an Offer!</div>
        </Content>
        <ButtonWrapper>
          <Button size="small" onClick={handleButtonClick}>
            View
          </Button>
        </ButtonWrapper>
      </>
    </Container>
  );
};

export default ForSale;
