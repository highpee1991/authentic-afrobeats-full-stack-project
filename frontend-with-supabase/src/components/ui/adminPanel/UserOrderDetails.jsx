import React from "react";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../Spinner";
import { toast } from "react-toastify";
import supabase from "../../../api/supabase";
import styled from "styled-components";
import { formatCurrency } from "../../../utils/helpers";

const SummaryContainer = styled.div`
  width: 100%;
  padding: 2rem;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  font-family: "Roboto", sans-serif;
  margin: 1rem auto;

  @media (min-width: 768px) {
    max-width: 700px;
  }

  @media (min-width: 1024px) {
    max-width: 900px;
  }
`;

const SummaryTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const ItemList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Item = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #ddd;

  &:last-child {
    margin-bottom: 0;
    border-bottom: none;
  }
`;

const ItemDetails = styled.div`
  display: flex;
  align-items: center;
`;

const CartSummaryImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

const ItemName = styled.div`
  font-size: 1.4rem;
  font-weight: 500;
  color: #444;
`;

const ItemPrice = styled.div`
  font-size: 1.2rem;
  color: #777;
  margin-top: 0.5rem;
`;

const TotalPrice = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.5rem;
  font-weight: 700;
  margin-top: 2rem;
  color: #111;
`;

const DeliveryDetails = styled.div`
  margin-top: 2rem;
  font-size: 1.2rem;
  background-color: #f8f8f8;
  padding: 1rem;
  border-radius: 8px;
`;

const DeliveryRow = styled.div`
  margin-bottom: 0.75rem;
  color: #555;
`;

const DeliveryType = styled.span`
  text-transform: capitalize;
`;

const UserOrderItems = ({ orderId, order, totalPrice }) => {
  const fetchOrderItems = async (orderId) => {
    const { data, error } = await supabase
      .from("order_items")
      .select("*")
      .eq("order_id", orderId); // orderId should be a string or UUID

    if (error) {
      toast.error("Error fetching order items");
      throw new Error(error.message);
    }

    return data;
  };

  const {
    data: orderItems,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["orderItems", orderId],
    queryFn: () => fetchOrderItems(orderId), // Make sure orderId is passed correctly here
  });
  if (isLoading) return <Spinner />;
  if (error) return toast.error(error.message);

  if (!orderItems || orderItems.length === 0) {
    return <p>No items for this order.</p>;
  }

  return (
    <SummaryContainer>
      <SummaryTitle>Order Summary</SummaryTitle>
      <ItemList>
        {orderItems.map((item, index) => (
          <Item key={index}>
            <ItemDetails>
              <CartSummaryImage src={item.image_url} alt={item.product_name} />
              <div>
                <ItemName>{item.product_name}</ItemName>
                <ItemPrice>
                  {formatCurrency(item.unit_price)} x {item.quantity}
                </ItemPrice>
              </div>
            </ItemDetails>
            <div>{formatCurrency(item.unit_price * item.quantity)}</div>
          </Item>
        ))}
      </ItemList>

      <DeliveryDetails>
        <DeliveryRow>
          Delivery type: <DeliveryType> {order.delivery_type}</DeliveryType>
        </DeliveryRow>
        {order.delivery_type === "delivery" && (
          <>
            <DeliveryRow>
              Delivery Address: {order.delivery_address}
            </DeliveryRow>
            <DeliveryRow>
              Delivery Cost: {formatCurrency(order.delivery_cost)}
            </DeliveryRow>
            <DeliveryRow>
              Contact Number: {order.delivery_phone_number}
            </DeliveryRow>
          </>
        )}
      </DeliveryDetails>

      <TotalPrice>
        <span>Total:</span>
        <span>{formatCurrency(totalPrice)}</span>
      </TotalPrice>
    </SummaryContainer>
  );
};

export default UserOrderItems;
