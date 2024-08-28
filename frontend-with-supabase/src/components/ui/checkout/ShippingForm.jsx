import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Button from "../shared/button/Button";
import { useNavigate, useParams } from "react-router-dom";
import supabase from "../../../api/supabase";
import { BillingContext } from "../billingContext/BillingContext";
import { useCart } from "../../context/CartContext";
import PaymentSummary from "./PaymentSummary";
import useResize from "../../../hooks/UseResize";

const FormContainer = styled.form`
  padding: 2rem;
  background-color: #fff;
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
  margin: 2rem auto;
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (max-width: 768px) {
    padding: 1rem;
    margin: 1rem;
  }
`;

const FormTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: var(--color-brand-700);
  text-align: center;
`;

const InputField = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: var(--border-radius-md);
  font-size: 1rem;
  text-transform: uppercase;

  &:focus {
    border-color: var(--color-brand-700);
    outline: none;
    box-shadow: 0 0 0 3px rgba(100, 181, 246, 0.4);
  }
`;

const Error = styled.span`
  color: red;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  display: block;
`;

const PaymentShipping = styled.div`
  display: flex;
  flex-direction: row;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Summary = styled.div`
  width: 100%;
  max-width: 300px;
  margin-top: 2rem;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const ShippingForm = () => {
  const { dispatch } = useCart();

  const { orderId } = useParams();
  const { setBillingDetails } = useContext(BillingContext);
  const [isSummaryOpen, setIsSummaryOpen] = useState(true);
  const navigate = useNavigate();
  const { width } = useResize();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleCountryChange = (event) => {
    const value = event.target.value.toUpperCase();
    setValue("country", value, { shouldValidate: true });
  };

  const onSubmit = async (data) => {
    const billingDetails = {
      name: data.name,
      address: {
        line1: data.address,
        city: data.city,
        state: data.state,
        postal_code: data.zip,
        country: data.country,
      },
      email: data.email,
      phone: data.phone,
    };

    console.log("Billing details being set:", billingDetails);

    try {
      setBillingDetails(billingDetails);

      console.log("Creating payment intent for orderId:", orderId);

      const response = await fetch(
        "https://authentic-afrobeats-full-stack-project-server.vercel.app/create-payment-intent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ orderId }),
        }
      );

      const { clientSecret } = await response.json();

      // Proceed with Stripe payment using clientSecret
      if (clientSecret) {
        console.log("Client secret received:", clientSecret);
        // Add your Stripe payment handling logic here
      } else {
        console.error("Client secret not received.");
      }

      if (orderId) {
        console.log("Navigating to orderId:", orderId);
        navigate(`/checkout/${orderId}`);
      } else {
        throw new Error("Order ID is not available");
      }
    } catch (error) {
      throw new Error("Error processing payment:", error);
    }

    // clear cart
    dispatch({ type: "CLEAR_CART" });
  };

  const handleSummary = () => {
    setIsSummaryOpen((summ) => !summ);
  };

  return (
    <PaymentShipping>
      <Summary>
        {isSummaryOpen && <PaymentSummary />}
        {width < 768 && (
          <Button
            size='small'
            onClick={handleSummary}
            style={{
              textAlign: "center",
              width: "80%",
              display: "block",
              margin: "0 auto",
            }}
          >
            {isSummaryOpen ? "Close" : "View"} Summary
          </Button>
        )}
      </Summary>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <FormTitle>Billing Information</FormTitle>

        <InputField>
          <Label htmlFor='name'>Full Name</Label>
          <Input
            type='text'
            id='name'
            {...register("name", { required: "Full name is required" })}
          />
          {errors.name && <Error>{errors.name.message}</Error>}
        </InputField>

        <InputField>
          <Label htmlFor='address'>Address</Label>
          <Input
            type='text'
            id='address'
            {...register("address", { required: "Address is required" })}
          />
          {errors.address && <Error>{errors.address.message}</Error>}
        </InputField>

        <InputField>
          <Label htmlFor='city'>City</Label>
          <Input
            type='text'
            id='city'
            {...register("city", { required: "City is required" })}
          />
          {errors.city && <Error>{errors.city.message}</Error>}
        </InputField>

        <InputField>
          <Label htmlFor='state'>State</Label>
          <Input
            type='text'
            id='state'
            {...register("state", { required: "State is required" })}
          />
          {errors.state && <Error>{errors.state.message}</Error>}
        </InputField>

        <InputField>
          <Label htmlFor='zip'>Zip Code</Label>
          <Input
            type='text'
            id='zip'
            {...register("zip", { required: "Zip code is required" })}
          />
          {errors.zip && <Error>{errors.zip.message}</Error>}
        </InputField>

        <InputField>
          <Label htmlFor='country'>Country</Label>
          <Input
            type='text'
            id='country'
            placeholder='e.g., US, UK, IN'
            {...register("country", {
              required: "Country is required",
              pattern: {
                value: /^[A-Z]{2}$/,
                message: "Please enter a valid 2-letter country code.",
              },
            })}
            onChange={handleCountryChange}
          />
          {errors.country && <Error>{errors.country.message}</Error>}
        </InputField>

        <InputField>
          <Label htmlFor='email'>Email</Label>
          <Input
            type='email'
            id='email'
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <Error>{errors.email.message}</Error>}
        </InputField>

        <InputField>
          <Label htmlFor='phone'>Phone Number</Label>
          <Input
            type='tel'
            id='phone'
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Phone number must be 10 digits",
              },
            })}
          />
          {errors.phone && <Error>{errors.phone.message}</Error>}
        </InputField>

        <Button type='submit' disabled={isSubmitting}>
          {isSubmitting ? "Loading..." : "Proceed"}
        </Button>
      </FormContainer>
    </PaymentShipping>
  );
};

export default ShippingForm;
