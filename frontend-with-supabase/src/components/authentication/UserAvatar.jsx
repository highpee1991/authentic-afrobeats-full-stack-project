import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const LoginButton = styled(Link)`
  background-color: var(--color-primary);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.3rem;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: 500;
  transition: background-color 0.3s;

  &:hover {
    background-color: var(--color-primary-dark);
  }
`;
const UserAvatar = () => {
  return <LoginButton to='/auth'>My Account</LoginButton>;
};
export default UserAvatar;
