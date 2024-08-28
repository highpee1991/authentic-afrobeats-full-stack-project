import React from "react";
import { getProduct } from "../../../api/apiGetProducts";
import styled from "styled-components";
import ProductPage from "../../ui/shared/productPage/ProductPage";

const PageWrapper = styled.div`
  /* height: 100vh; */
`;

const SnacksAndConfectionaries = () => {
  return (
    <PageWrapper>
      <ProductPage
        queryKey={["snacksAndConfectionaries"]}
        queryFn={() => getProduct("snack_confectionaries")}
        title='Snacks and Confections'
        table={"snack_confectionaries"}
        pathPrefix={"snacks"}
      />
    </PageWrapper>
  );
};

export default SnacksAndConfectionaries;
