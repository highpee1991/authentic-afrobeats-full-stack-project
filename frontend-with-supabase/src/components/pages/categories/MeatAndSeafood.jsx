import React from "react";
import { getProduct } from "../../../api/apiGetProducts";
import styled from "styled-components";
import ProductPage from "../../ui/shared/productPage/ProductPage";

const PageWrapper = styled.div`
  /* height: 100vh; */
`;

const MeatAndSeafood = () => {
  return (
    <PageWrapper>
      <ProductPage
        queryKey={["meatAndSeafood"]}
        queryFn={() => getProduct("meat_sea_food")}
        title='Meat and Seafood'
        table={"meat_sea_food"}
        pathPrefix={"meat"}
      />
    </PageWrapper>
  );
};

export default MeatAndSeafood;
