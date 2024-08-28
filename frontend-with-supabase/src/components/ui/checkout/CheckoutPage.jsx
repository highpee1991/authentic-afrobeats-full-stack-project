import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../shared/button/Button";
import styled from "styled-components";
import StripeContainer from "../paymentForm/PaymentForm";
import PaymentSummary from "./PaymentSummary";
import supabase from "../../../api/supabase";
import { BillingContext } from "../billingContext/BillingContext";

// Container for checkout page
const CheckoutContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  padding: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

// Container for cart summary (fixed or toggleable)
const CartSummaryContainer = styled.div`
  width: 300px;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  align-self: flex-start;
  background: #fff;
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
  padding: 1rem;

  @media (max-width: 768px) {
    position: static;
    display: ${({ isOpen }) => (isOpen ? "block" : "none")};
    transition: transform 0.3s ease;
  }
`;

// Container for forms
const FormsContainer = styled.div`
  flex: 1;
  overflow: auto;
  background: #fff;
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
  padding: 1rem;

  @media (max-width: 768px) {
    margin-top: 1rem;
  }
`;

// Toggle button
const ToggleButton = styled.button`
  display: none;

  @media (max-width: 768px) {
    display: block;
    margin: 1rem 0;
    padding: 0.5rem;
    background-color: var(--color-brand-800);
    color: white;
    border: none;
    border-radius: var(--border-radius-md);
  }
`;

const CheckoutPage = () => {
  const { orderId } = useParams();
  const { billingDetails } = useContext(BillingContext);

  const [order, setOrder] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const [isCartOpen, setCartOpen] = useState(false);
  const [amount, setAmount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        console.log("Fetching order details for orderId:", orderId);
        const { data, error } = await supabase
          .from("orders")
          .select("*")
          .eq("id", orderId)
          .single();

        if (error) {
          console.log("Error Fetching order:", error);
          return;
        }

        if (data) {
          setOrder(data);

          setClientSecret(data.client_secret);
          setAmount(data.total);
          console.log("Order fetched:", data);
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    if (orderId) {
      fetchOrderDetails();
    } else {
      console.error("Order ID not available in useEffect");
    }
  }, [orderId]);

  console.log("Current billing details in CheckoutPage:", billingDetails);

  return (
    <CheckoutContainer>
      <ToggleButton onClick={() => setCartOpen(!isCartOpen)}>
        {isCartOpen ? "Hide Cart Summary" : "Show Cart Summary"}
      </ToggleButton>
      <CartSummaryContainer isOpen={isCartOpen}>
        <PaymentSummary />
      </CartSummaryContainer>
      <FormsContainer>
        <Button size='small' onClick={() => navigate(-1)}>
          Back
        </Button>
        {order ? (
          <StripeContainer
            billingDetails={billingDetails}
            clientSecret={clientSecret}
            amount={amount}
          />
        ) : (
          <p>Loading order details...</p>
        )}
      </FormsContainer>
    </CheckoutContainer>
  );
};

export default CheckoutPage;
