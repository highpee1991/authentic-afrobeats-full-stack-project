import React from "react";
import { getProduct } from "../../../api/apiGetProducts";
import styled from "styled-components";
import ProductPage from "../../ui/shared/productPage/ProductPage";

const PageWrapper = styled.div`
  /* height: 100vh; */
`;

const Condiments = () => {
  return (
    <PageWrapper>
      <ProductPage
        queryKey={["condiments"]}
        queryFn={() => getProduct("condiments")}
        title='Condiments'
        table={"condiments"}
        pathPrefix={"condiments"}
      />
    </PageWrapper>
  );
};

export default Condiments;
