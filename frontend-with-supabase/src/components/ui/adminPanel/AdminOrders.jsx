import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import AdminOrderItems from "./AdminOrderDetails";
import Spinner from "../Spinner";
import { formatCurrency, formatDateTime } from "../../../utils/helpers";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  gap: 2rem;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    padding: 2rem 4rem;
  }
`;

const FiltersContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;

  input,
  select {
    padding: 0.75rem;
    border-radius: 6px;
    border: 1px solid #ccc;
    font-size: 1.2rem;
  }

  @media (max-width: 767px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const OrderList = styled.div`
  flex: 2;
  background-color: #f8f8f8;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  overflow-x: auto;

  h1 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th,
  td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  tr {
    cursor: pointer;
    &:hover {
      background-color: #e0e0e0;
      transition: background-color 0.3s ease;
    }
  }

  p {
    margin-top: 1rem;
    font-size: 1.2rem;
    color: #888;
  }
`;

const OrderDetails = styled.div`
  flex: 1;
  padding: 1.5rem;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: opacity 0.3s ease, transform 0.3s ease;

  @media (max-width: 767px) {
    margin-top: 2rem;
    transform: translateY(0);
  }
`;

const fetchOrders = async (date, status) => {
  // Construct query parameters based on date and status
  const query = new URLSearchParams();
  if (date) query.append("date", date);
  if (status) query.append("status", status);

  const response = await fetch(
    `https://authentic-afrobeats-full-stack-project-server.vercel.app/orders?${query.toString()}`
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to fetch orders");
  }

  // If the data contains a message, return an empty array
  if (data.message) {
    return [];
  }

  return data;
};

const AdminOrders = () => {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [status, setStatus] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const {
    data: orders = [], // Default to an empty array to avoid undefined/null issues
    error,
    isLoading,
  } = useQuery({
    queryKey: ["orders", date, status],
    queryFn: () => fetchOrders(date, status),
  });

  if (isLoading) return <Spinner />;
  if (error) {
    toast.error(error.message);
    return <p>Error loading orders {error.message}.</p>;
  }

  // Handlers to reset selectedOrder when date or status changes
  const handleDateChange = (e) => {
    setDate(e.target.value);
    setSelectedOrder(null); // Close BkOrderItems when date changes
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    setSelectedOrder(null); // Close BkOrderItems when status changes
  };

  const handleOrderClick = (orderId) => {
    if (selectedOrder === orderId) {
      setSelectedOrder(null);
    } else {
      setSelectedOrder(orderId);
    }
  };
  console.log("Type of orders:", typeof orders);
  console.log("Orders data:", orders);

  const selectedOrderDetails = orders.find(
    (order) => order.id === selectedOrder
  );

  console.log("selectedOrderDetails:", selectedOrderDetails);

  return (
    <Container>
      <OrderList>
        <h1>Orders</h1>
        <FiltersContainer>
          <input type='date' value={date} onChange={handleDateChange} />
          <select value={status} onChange={handleStatusChange}>
            <option value=''>All Statuses</option>
            <option value='pending'>Pending</option>
            <option value='paid'>Paid</option>
          </select>
        </FiltersContainer>

        {orders.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} onClick={() => handleOrderClick(order.id)}>
                  <td>{order.id}</td>
                  <td>{formatCurrency(order.total)}</td>
                  <td>{order.status}</td>
                  <td>{formatDateTime(order.created_at)}</td>
                  <td>{order.profiles?.name || "No name available"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No orders for the selected date.</p>
        )}
      </OrderList>

      {selectedOrder && (
        <OrderDetails>
          <AdminOrderItems
            orderId={selectedOrder}
            order={selectedOrderDetails}
            totalPrice={selectedOrderDetails.total}
          />
        </OrderDetails>
      )}
    </Container>
  );
};

export default AdminOrders;
