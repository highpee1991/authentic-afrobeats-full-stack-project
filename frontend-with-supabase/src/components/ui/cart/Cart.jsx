import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaTrash } from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import { formatCurrency } from "../../../utils/helpers";
import { useNavigate } from "react-router-dom";
import Button from "../shared/button/Button";
import {
  CART_EXPIRATION_TIME,
  CART_STORAGE_KEY,
  CART_TIMESTAMP_KEY,
} from "./CartConst";
import { getCurrentUser } from "../../../api/apiAuth";
import { createOrder } from "../../../api/apiCreateOrder";
import { toast } from "react-toastify";
import ShippingForm from "../checkout/ShippingForm";
import { useForm } from "react-hook-form";
import Shortcut from "../Shortcut";
import useResize from "../../../hooks/UseResize";

const ShortCart = styled.div`
  display: flex;
`;

const CartContainer = styled.div`
  padding: 2rem;
  background-color: #f9f9f9;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-left: 3rem;
`;

const CartTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: var(--color-brand-700);
  background-color: var(--color-grey-100);
`;

const CartItemsContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin-bottom: 2rem;
  background: #fff;
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #ccc;

  &:last-child {
    border-bottom: none;
  }
`;

const CartImage = styled.img`
  width: 5rem;
  height: 5rem;
  object-fit: cover;
  border-radius: var(--border-radius-sm);
  /* cursor: pointer; */
`;

const CartDetails = styled.div`
  flex: 1;
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
`;

const CartName = styled.div`
  font-weight: bold;
  margin-bottom: 0.5rem;
  /* cursor: pointer; */
`;

const CartPrice = styled.div`
  color: var(--color-brand-600);
  margin-bottom: 0.5rem;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
`;

const QuantityButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  padding: 0.5rem;
  color: var(--color-brand-600);

  &:disabled {
    color: #ccc;
    cursor: not-allowed;
  }
`;

const QuantityInput = styled.input`
  width: 3rem;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: var(--border-radius-sm);
  margin: 0 0.5rem;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-brand-600);

  &:hover {
    color: #fd4444;
  }
`;

const DeliveryOptions = styled.div`
  width: 100%;
  max-width: 800px;

  background: #fff;
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
  padding: 1rem;

  display: flex;
  flex-direction: column;
  margin: 20px 0;
  padding: 20px;
`;

const DeliveryOption = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  label {
    margin-left: 10px;
    font-size: 1.5rem;
    color: #333;
  }
  input {
    transform: scale(1.2);
  }
`;

const DeliveryDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
`;

const DeliveryAddressInput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1.2rem;
  width: 100%;
  max-width: 500px;
  transition: border-color 0.2s ease-in-out;
  &:focus {
    border-color: var(--color-brand-600);
    outline: none;
  }
`;

const PhoneNumberInput = styled(DeliveryAddressInput)``;

const CalculateButton = styled.button`
  padding: 10px 20px;
  margin-top: 10px;
  background-color: var(--color-brand-600);
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 1.5rem;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: var(--color-brand-600);
  }
`;

const DeliveryCost = styled.div`
  margin-top: 10px;
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--color-brand-800);
`;

const TotalPriceContainer = styled.div`
  width: 100%;
  max-width: 800px;
  background: #fff;
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  font-size: 1.5rem;
`;

const PromoText = styled.small`
  text-transform: uppercase;
  color: var(--color-brand-800);
  margin-bottom: 2rem;
`;

const Cart = () => {
  const { state, dispatch } = useCart();
  const [userId, setUserId] = useState(null);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [deliveryPhoneNumber, setDeliveryPhoneNumber] = useState("");
  const [deliveryCost, setDeliveryCost] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeliveryCostCalculated, setIsDeliveryCostCalculated] =
    useState(false);
  const [isCalculating, setIsCalculating] = useState(false);

  const { width } = useResize();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserId = async () => {
      const user = await getCurrentUser();
      if (user) setUserId(user.id);
    };
    fetchUserId();
  }, []);

  useEffect(() => {
    const cartTimestamp = localStorage.getItem(CART_TIMESTAMP_KEY);
    const currentTime = new Date().getTime();

    if (cartTimestamp && currentTime - cartTimestamp < CART_EXPIRATION_TIME) {
      const savedCart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY));
      if (savedCart) {
        dispatch({ type: "LOAD_CART", payload: savedCart });
      }
    } else {
      localStorage.removeItem(CART_STORAGE_KEY);
      localStorage.removeItem(CART_TIMESTAMP_KEY);
    }
  }, [dispatch]);

  useEffect(() => {
    if (state.items.length > 0) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
      localStorage.setItem(CART_TIMESTAMP_KEY, new Date().getTime().toString());
    } else {
      localStorage.removeItem(CART_STORAGE_KEY);
      localStorage.removeItem(CART_TIMESTAMP_KEY);
    }
  }, [state.items]);

  const handleQuantityChange = (id, quantity) => {
    if (quantity >= 1) {
      dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
    }
  };

  const removeItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: { id } });
  };

  const handleDeliveryOptionChange = (e) => {
    dispatch({ type: "SET_DELIVERY_OPTION", payload: e.target.value });
    if (e.target.value === "pickup") {
      setDeliveryCost(0);
      setIsDeliveryCostCalculated(false);
    } else {
      setDeliveryCost(0); // Reset delivery cost when switching to delivery
    }
  };

  const calculateDeliveryCost = async () => {
    if (!deliveryAddress || !deliveryPhoneNumber) {
      toast.error("Please provide a delivery address and phone number.");
      return;
    }
    setIsCalculating(true);

    try {
      const cost = await fetchDeliveryCost(deliveryAddress);
      setDeliveryCost(cost);
      setIsDeliveryCostCalculated(true);
      dispatch({ type: "SET_DELIVERY_COST", payload: cost });
    } catch (error) {
      toast.error("Error calculating delivery cost:", error);
    } finally {
      setIsCalculating(false);
    }
  };

  const fetchDeliveryCost = async (address) => {
    return new Promise((resolve) => setTimeout(() => resolve(100), 1000)); // Simulated API call
  };

  const handleAddressChange = (e) => {
    const address = e.target.value;
    setDeliveryAddress(address);
    dispatch({ type: "SET_DELIVERY_ADDRESS", payload: address });
  };

  const handlePhoneNumberChange = (e) => {
    const phoneNumber = e.target.value;
    setDeliveryPhoneNumber(phoneNumber);
    dispatch({ type: "SET_DELIVERY_PHONE", payload: phoneNumber });
  };

  //currently disabled
  const handleProductClick = ({ productId }) => {
    // navigate(`/products/${pathPrefix}/${productId}`);
  };

  const totalPrice =
    state.items.reduce((total, item) => total + item.price * item.quantity, 0) +
    deliveryCost;

  const handleProceedToCheckout = async () => {
    if (!userId) {
      toast.error("Please login or sign up to proceed");
      navigate("/auth"); // Redirect to the login page
      return;
    }

    if (isSubmitting) {
      console.log("Button clicked, but already submitting.");
      return;
    }
    setIsSubmitting(true);
    console.log("Proceeding to checkout...");

    // if (isSubmitting) return;
    // setIsSubmitting(true);

    try {
      if (
        state.deliveryOption === "delivery" &&
        (!deliveryAddress || !deliveryPhoneNumber)
      ) {
        toast.error("Please provide a delivery address and phone number.");
        setIsSubmitting(false);
        console.log("Missing delivery information, cannot proceed.");
        return;
      }

      const orderDetails = {
        items: state.items,
        total:
          state.items.reduce(
            (total, item) => total + item.price * item.quantity,
            0
          ) + deliveryCost,
        user_id: userId,
        delivery_type: state.deliveryOption,
        delivery_address: deliveryAddress,
        delivery_cost: deliveryCost,
        delivery_phone_number: deliveryPhoneNumber,
      };
      console.log("Creating order with details:", orderDetails);
      const result = await createOrder(orderDetails);

      if (result.success) {
        console.log("Order created successfully:", result.order.id);
        navigate(`/shippingInformation/${result.order.id}`);
      } else {
        console.error("Failed to create order:", result.error);
      }
    } catch (error) {
      console.error("Checkout error", error);
    } finally {
      console.log("Finished checkout process.");
      setIsSubmitting(false);
    }
  };

  return (
    <ShortCart>
      {width > 575 && <Shortcut />}
      <CartContainer>
        {width < 575 && (
          <PromoText>
            Spend up to $100 and enjoy free delivery within a 20-mile radius of
            our store.
          </PromoText>
        )}
        <CartTitle>YOUR CART</CartTitle>
        {state.items.length > 0 ? (
          <>
            <CartItemsContainer>
              {state.items.map((item) => (
                <CartItem key={item.id}>
                  <CartImage
                    src={item.image}
                    alt={`${item.name}`}
                    onClick={() => handleProductClick(item.id)}
                  />
                  <CartDetails>
                    <CartName onClick={() => handleProductClick(item.id)}>
                      {item.name}
                    </CartName>
                    <CartPrice>{formatCurrency(item.price)}</CartPrice>
                    <QuantityControls>
                      <QuantityButton
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                      >
                        -
                      </QuantityButton>
                      <QuantityInput
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            item.id,
                            parseInt(e.target.value)
                          )
                        }
                      />
                      <QuantityButton
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </QuantityButton>
                    </QuantityControls>
                  </CartDetails>
                  <RemoveButton onClick={() => removeItem(item.id)}>
                    <FaTrash />
                  </RemoveButton>
                </CartItem>
              ))}
            </CartItemsContainer>

            <DeliveryOptions>
              <DeliveryOption>
                <input
                  type="radio"
                  value="pickup"
                  checked={state.deliveryOption === "pickup"}
                  onChange={handleDeliveryOptionChange}
                />
                <label>Local Pick Up</label>
              </DeliveryOption>
              <DeliveryOption>
                <input
                  type="radio"
                  value="delivery"
                  checked={state.deliveryOption === "delivery"}
                  onChange={handleDeliveryOptionChange}
                />
                <label>Delivery</label>
              </DeliveryOption>
              {state.deliveryOption === "delivery" && (
                <DeliveryDetails>
                  <DeliveryAddressInput
                    type="text"
                    placeholder="Enter delivery address"
                    value={deliveryAddress}
                    onChange={handleAddressChange}
                  />
                  <PhoneNumberInput
                    type="text"
                    placeholder="Enter phone number"
                    value={deliveryPhoneNumber}
                    onChange={handlePhoneNumberChange}
                  />
                  {/* <CalculateButton
                onClick={calculateDeliveryCost}
                disabled={isCalculating}
              >
                {isCalculating ? "Calculating..." : "Calculate Delivery Cost"}
              </CalculateButton>
              {deliveryCost ? (
                <DeliveryCost>{formatCurrency(deliveryCost)}</DeliveryCost>
              ) : (
                ""
              )} */}
                </DeliveryDetails>
              )}
            </DeliveryOptions>
            <TotalPriceContainer>
              <div>Total Price:</div>
              <div>{formatCurrency(totalPrice)}</div>
            </TotalPriceContainer>
            <Button
              style={{ marginTop: "10px" }}
              onClick={handleProceedToCheckout}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Loading..." : "Proceed to Checkout"}
            </Button>
          </>
        ) : (
          <div>Your cart is empty.</div>
        )}
      </CartContainer>
    </ShortCart>
  );
};

export default Cart;
