import React from "react";
import { getProduct } from "../../../api/apiGetProducts";
import styled from "styled-components";
import ProductPage from "../../ui/shared/productPage/ProductPage";

const PageWrapper = styled.div`
  /* height: 100vh; */
`;

const AfricanWearsAndFashion = () => {
  return (
    <PageWrapper>
      <ProductPage
        queryKey={["WearsStyles"]}
        queryFn={() => getProduct("authentic_african_wear")}
        title='Authentic African Wears and Styles'
        table={"authentic_african_wear"}
        pathPrefix={"wears"}
      />
    </PageWrapper>
  );
};

export default AfricanWearsAndFashion;
