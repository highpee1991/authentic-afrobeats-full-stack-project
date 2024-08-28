import React from "react";
import CardGrid from "./Card";
import qualityData from "./uiData/shopQualityProductData";
import styled from "styled-components";

const CardBg = styled.div`
  background-color: var(--color-silver-700);
  padding: 6rem 2rem 2rem 2rem;
`;

const CardHeder = styled.div`
  color: var(--color-brand-50);
  font-size: 2rem;
  text-transform: uppercase;
  font-weight: bold;
  text-align: center;

  @media (min-width: 768px) {
    font-size: 2.5rem;
  }
`;

const ShopQualityProduct = () => {
  return (
    <CardBg>
      <CardHeder>Shop Premium Products</CardHeder>
      <CardGrid card={qualityData} />
    </CardBg>
  );
}; 

export default ShopQualityProduct;
