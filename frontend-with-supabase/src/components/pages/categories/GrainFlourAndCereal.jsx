import React from "react";
import { getProduct } from "../../../api/apiGetProducts";
import styled from "styled-components";
import ProductPage from "../../ui/shared/productPage/ProductPage";

const PageWrapper = styled.div`
  /* height: 100vh; */
`;

const GrainFlourAndCereal = () => {
  return (
    <PageWrapper>
      <ProductPage
        queryKey={["grainFlourAndCereal"]}
        queryFn={() => getProduct("grain_flour_cereal")}
        title='Grains, Flours, and Cereal'
        table={"grain_flour_cereal"}
        pathPrefix={"grains"}
      />
    </PageWrapper>
  );
};

export default GrainFlourAndCereal;
