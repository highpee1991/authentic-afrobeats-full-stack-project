import React from "react";
import { getProduct } from "../../../api/apiGetProducts";
import styled from "styled-components";
import ProductPage from "../../ui/shared/productPage/ProductPage";

const PageWrapper = styled.div`
  /* height: 100vh; */
`;

const BeautyAndHouseHold = () => {
  return (
    <PageWrapper>
      <ProductPage
        queryKey={["beautiesandhousehold"]}
        queryFn={() => getProduct("beauty_and_household")}
        title='Beauty and Household'
        table={"beauty_and_household"}
        pathPrefix={"beauty"}
      />
    </PageWrapper>
  );
};

export default BeautyAndHouseHold;
