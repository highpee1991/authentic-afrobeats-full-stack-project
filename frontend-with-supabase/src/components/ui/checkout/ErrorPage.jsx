import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

const ErrorMessage = styled.h1`
  color: red;
  margin-bottom: 1rem;
`;

const RetryLink = styled(Link)`
  color: blue;
  text-decoration: underline;
  margin-top: 1rem;
`;

const ErrorPage = () => {
  return (
    <ErrorContainer>
      <ErrorMessage>Payment Failed</ErrorMessage>
      <RetryLink to='/cart'>Go back to Cart</RetryLink>
    </ErrorContainer>
  );
};

export default ErrorPage;
