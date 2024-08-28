import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import PaymentSummary from "./PaymentSummary";

const SuccessContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

const SuccessMessage = styled.h1`
  color: green;
  margin-bottom: 1rem;
`;

const OrderId = styled.p`
  color: #333;
  margin-bottom: 2rem;
`;

const SuccessPage = () => {
  const { orderId } = useParams();

  return (
    <SuccessContainer>
      <SuccessMessage>Payment Successful!</SuccessMessage>
      <OrderId>Order ID: {orderId}</OrderId>
      <PaymentSummary orderId={orderId} />
    </SuccessContainer>
  );
};

export default SuccessPage;
