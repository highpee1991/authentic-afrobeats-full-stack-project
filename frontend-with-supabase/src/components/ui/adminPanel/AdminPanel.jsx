import React, { useContext, useEffect } from "react";
import { UserContext } from "../../context/userContext";
import { useQueryClient } from "@tanstack/react-query";
import UserOrders from "./UserOrders";
import styled from "styled-components";
import AdminOrders from "./AdminOrders";

const Container = styled.div`
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
`;

const AdminPanel = () => {
  const { userRole } = useContext(UserContext);
  const queryClient = useQueryClient();

  console.log("User Role:", userRole);

  useEffect(() => {
    if (userRole === "admin") {
      queryClient.invalidateQueries("orders");
    }
  }, [userRole, queryClient]);

  if (userRole !== "admin") {
    return (
      <Container>
        <Title>My Orders</Title>
        <UserOrders />
      </Container>
    );
  }

  return (
    <Container>
      <Title>ADMIN DASHBOARD</Title>
      <AdminOrders />
    </Container>
  );
};
export default AdminPanel;
