import React from "react";
import ProductPreview from "../shared/productPreview/ProductPreview";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../Spinner";
import { getProduct } from "../../../api/apiGetProducts";

const MeatAndSeaFoodDisplay = () => {
  const {
    data: meatSeaFoodData,
    isLoading: isLoadingFood,
    error,
  } = useQuery({
    queryKey: ["meatAndSeafood"],
    queryFn: () => getProduct("meat_sea_food"),
  });

  if (isLoadingFood) return <Spinner />;

  if (error) return <p>Failed to load products</p>;

  return (
    <div>
      <ProductPreview
        title='Meat and Sea Food'
        products={meatSeaFoodData}
        categoryPath='/meatandseafood'
        limit={6}
        pathPrefix={"meat"}
        id='meatandSeaFood'
      />
    </div>
  );
};

export default MeatAndSeaFoodDisplay;
