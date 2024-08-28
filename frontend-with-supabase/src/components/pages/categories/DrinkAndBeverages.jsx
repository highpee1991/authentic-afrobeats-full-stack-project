import React from "react";
import { getProduct } from "../../../api/apiGetProducts";
import styled from "styled-components";
import ProductPage from "../../ui/shared/productPage/ProductPage";

const PageWrapper = styled.div`
  /* height: 100vh; */
`;

const DrinkAndBeverages = () => {
  return (
    <PageWrapper>
      <ProductPage
        queryKey={["drinkandbeverages"]}
        queryFn={() => getProduct("drink_beverage")}
        title='drink and Beverages'
        table={"drink_beverage"}
        pathPrefix={"drinks"}
      />
    </PageWrapper>
  );
};

export default DrinkAndBeverages;
