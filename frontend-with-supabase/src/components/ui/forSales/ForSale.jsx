import React from "react";
import Button from "../shared/button/Button";
import styled, { keyframes } from "styled-components";

const blink = keyframes`
  50% {
    opacity: 0;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: start;
  padding: 2rem;
  box-sizing: border-box;
  background-color: #f5f5f5;
  max-width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const BlinkingText = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: red;
  animation: ${blink} 1s infinite;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const ImageStyle = styled.img`
  width: 70%;
  max-width: 320px;
  height: auto;
  margin-right: 1rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    max-width: 60%;
    margin-right: 0;
    margin-bottom: 1rem;
  }
`;

const Content = styled.div`
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 1.5rem;
  line-height: 1.6;
  max-width: 600px;

  div {
    margin-bottom: 0.8rem;
  }
`;

const ButtonWrapper = styled.div`
  margin-top: 1rem;

  @media (max-width: 768px) {
    text-align: center;
  }
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
      <div>
        <ImageStyle
          src="/images/forSale/sale.jpeg"
          alt="African Supermarket for Sale"
        />
      </div>
      <div>
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
      </div>
    </Container>
  );
};

export default ForSale;
