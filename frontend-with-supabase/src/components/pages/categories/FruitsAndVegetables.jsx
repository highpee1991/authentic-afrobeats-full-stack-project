import React from "react";
import { getProduct } from "../../../api/apiGetProducts";
import styled from "styled-components";
import ProductPage from "../../ui/shared/productPage/ProductPage";

const PageWrapper = styled.div`
  /* height: 100vh; */
`;

const FruitsAndVegetables = () => {
  return (
    <PageWrapper>
      <ProductPage
        queryKey={["fruitsAndVegetables"]}
        queryFn={() => getProduct("fruits_and_vegetables")}
        title='Fruits and Vegetables'
        table={"fruits_and_vegetables"}
        pathPrefix={"fruits"}
      />
    </PageWrapper>
  );
};

export default FruitsAndVegetables;
