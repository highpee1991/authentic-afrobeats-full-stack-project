import React from "react";
import { getProduct } from "../../../api/apiGetProducts";
import styled from "styled-components";
import ProductPage from "../../ui/shared/productPage/ProductPage";

const PageWrapper = styled.div`
  /* height: 100vh; */
`;

const Others = () => {
  return (
    <PageWrapper>
      <ProductPage
        queryKey={["others"]}
        queryFn={() => getProduct("more")}
        title='Other Items'
        table={"more"}
        pathPrefix={"more"}
      />
    </PageWrapper>
  );
};

export default Others;
