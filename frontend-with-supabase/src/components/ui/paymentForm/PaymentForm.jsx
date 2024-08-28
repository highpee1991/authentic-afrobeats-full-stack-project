import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { toast } from "react-toastify";
import { formatCurrency } from "../../../utils/helpers";

const stripePromise = loadStripe(
  "pk_test_51PnE49CNs0k5UD3O9JpHgKtfsQrqmKVRB2n1CaKks6wzKFWCjjgLbhbHDjbj2XtA42xtOh5cMASTqSU9NmJfF7ys00QCm2vR9i"
);

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
  background-color: #f7f7f7;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    padding: 1.5rem;
    margin: 1.5rem;
  }
`;

const Title = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1rem;
  text-align: center;
  color: #333;
`;

const OrderInfo = styled.p`
  font-size: 1.2rem;
  color: #555;
  margin: 0.5rem 0;
  text-align: center;

  &:first-of-type {
    margin-top: 1rem;
  }
`;

const Button = styled.button`
  padding: 0.75rem;
  margin-top: 1.5rem;
  background-color: var(--color-brand-700);
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-800);
  }
`;

const ErrorMessage = styled.div`
  margin-top: 1rem;
  color: red;
  font-size: 1rem;
  text-align: center;
`;

const CardImageContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 2rem;
`;

const CardImage = styled.img`
  width: 50px;
  height: auto;
  margin: 0 10px;

  @media (max-width: 768px) {
    width: 40px;
    margin: 0 5px;
  }
`;

const StyledCardElement = styled(CardElement)`
  padding: 0.5rem;
  margin-top: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  background-color: #fff;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
`;
const PaymentForm = ({ billingDetails, clientSecret, amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { orderId } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log("Order ID:", orderId);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null); // Reset any previous errors

    if (!stripe || !elements) {
      setError("Stripe has not loaded yet. Please try again.");
      setLoading(false);
      return;
    }

    try {
      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: billingDetails, // Ensure billingDetails is provided
        },
      });

      if (paymentResult.error) {
        setError(`Payment failed: ${paymentResult.error.message}`);
      } else if (paymentResult.paymentIntent.status === "succeeded") {
        toast.success("Payment Successful!");

        // Redirect to the success page
        window.location.href = `/success/${orderId}`;
      } else {
        setError("Payment processing failed. Please try again.");
      }
    } catch (err) {
      console.error("Payment processing error:", err);
      setError("Payment processing failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <CardImageContainer>
        <CardImage src='/images/payment-card/visa.png' alt='Visa card' />
        <CardImage src='/images/payment-card/master.png' alt='Mastercard' />
        <CardImage
          src='/images/payment-card/american-express.png'
          alt='American Express'
        />
        <CardImage src='/images/payment-card/discover.png' alt='Discover' />
      </CardImageContainer>
      <Title>Payment Form</Title>
      <OrderInfo>Order ID: {orderId}</OrderInfo>
      <OrderInfo>Amount: {formatCurrency(amount)}</OrderInfo>
      <StyledCardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <Button type='submit' disabled={!stripe || loading}>
        {loading ? "Processing..." : `Pay ${formatCurrency(amount)}`}
      </Button>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </FormContainer>
  );
};

const StripeContainer = ({ billingDetails, clientSecret, amount }) => (
  <Elements stripe={stripePromise}>
    <PaymentForm
      billingDetails={billingDetails}
      clientSecret={clientSecret}
      amount={amount}
    />
  </Elements>
);

export default StripeContainer;
