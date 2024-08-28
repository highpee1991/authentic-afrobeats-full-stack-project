// import React, { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import Spinner from "../Spinner";
// import { toast } from "react-toastify";
// import supabase from "../../../api/supabase";
// import OrderItems from "./UserOrderDetails";
// import { formatCurrency, formatDateTime } from "../../../utils/helpers";

// const UserOrders = () => {
//   const [selectedOrder, setSelectedOrder] = useState(null);

//   const fetchOrders = async () => {
//     const { data, error } = await supabase
//       .from("orders")
//       .select(`*, profiles(name)`);

//     if (error) {
//       toast.error("Error fetching orders");
//       throw new Error(error.message);
//     }

//     return data;
//   };

//   const {
//     data: orders = [], // Default to an empty array to avoid undefined/null issues
//     error,
//     isLoading,
//   } = useQuery({
//     queryKey: ["orders"],
//     queryFn: fetchOrders,
//   });

//   if (isLoading) return <Spinner />;
//   if (error) return toast.error(error.message);

//   const selectedOrderDetails = orders.find(
//     (order) => order.id === selectedOrder
//   );

//   const handleOrderClick = (orderId) => {
//     if (selectedOrder === orderId) {
//       setSelectedOrder(null);
//     } else {
//       setSelectedOrder(orderId);
//     }
//   };

//   return (
//     <div>
//       <h1>Orders</h1>

//       {orders.length === 0 && <p>You do not have any order yet</p>}
//       {orders.length > 0 && (
//         <table>
//           <thead>
//             <tr>
//               <th>Order ID</th>
//               <th>Total Amount</th>
//               <th>Status</th>
//               <th>Date</th>
//               <th>Name</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.map((order) => (
//               <tr key={order.id} onClick={() => handleOrderClick(order.id)}>
//                 <td>{order.id}</td>
//                 <td>{formatCurrency(order.total)}</td>
//                 <td>{order.status}</td>
//                 <td>{formatDateTime(order.created_at)}</td>
//                 <td>{order.profiles?.name}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//       {selectedOrderDetails && (
//         <OrderItems
//           orderId={selectedOrder}
//           order={selectedOrderDetails}
//           totalPrice={selectedOrderDetails.total}
//         />
//       )}
//     </div>
//   );
// };

// export default UserOrders;

//////////////////

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import Spinner from "../Spinner";
import { toast } from "react-toastify";
import supabase from "../../../api/supabase";
import UserOrderItems from "./UserOrderDetails";
import { formatCurrency, formatDateTime } from "../../../utils/helpers";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 2rem;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const OrderList = styled.div`
  flex: 1;
  background-color: #f8f8f8;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  overflow-x: auto;

  h1 {
    margin-bottom: 1rem;
    font-size: 1.8rem;
    font-weight: 600;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th,
  td {
    padding: 0.75rem;
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
`;

const OrderDetails = styled.div`
  flex: 1;
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
  padding: 1rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

  @media (min-width: 768px) {
    max-width: 45%;
  }

  @media (max-width: 767px) {
    margin-top: 2rem;
    opacity: 1;
    transform: translateY(0);
  }
`;

const UserOrders = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from("orders")
      .select(`*, profiles(name)`);

    if (error) {
      toast.error("Error fetching orders");
      throw new Error(error.message);
    }

    return data;
  };

  const {
    data: orders = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  });

  if (isLoading) return <Spinner />;
  if (error) return toast.error(error.message);

  const selectedOrderDetails = orders.find(
    (order) => order.id === selectedOrder
  );

  const handleOrderClick = (orderId) => {
    if (selectedOrder === orderId) {
      setSelectedOrder(null);
    } else {
      setSelectedOrder(orderId);
    }
  };

  return (
    <Container>
      <OrderList>
        {orders.length === 0 && <p>You do not have any orders yet</p>}
        {orders.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Total Amount</th>
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
                  <td>{order.profiles?.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </OrderList>
      {selectedOrderDetails && (
        <OrderDetails>
          <UserOrderItems
            orderId={selectedOrder}
            order={selectedOrderDetails}
            totalPrice={selectedOrderDetails.total}
          />
        </OrderDetails>
      )}
    </Container>
  );
};

export default UserOrders;
