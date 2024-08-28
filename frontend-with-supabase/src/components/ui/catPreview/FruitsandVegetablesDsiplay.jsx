import React from "react";
import ProductPreview from "../shared/productPreview/ProductPreview";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../Spinner";
import { getProduct } from "../../../api/apiGetProducts";

const FruitsandVegetablesDisplay = () => {
  const {
    data: fruitsandvegetables,
    isLoading: isLoadingfruits,
    error,
  } = useQuery({
    queryKey: ["fruitsAndVegetables"],
    queryFn: () => getProduct("fruits_and_vegetables"),
  });

  if (isLoadingfruits) return <Spinner />;

  if (error) return <p>Failed to load products</p>;

  return (
    <div>
      <ProductPreview
        title='Fruits and Vegetables'
        products={fruitsandvegetables}
        categoryPath='/fruitsandvegetables'
        limit={6}
        pathPrefix={"fruits"}
      />
    </div>
  );
};

export default FruitsandVegetablesDisplay;
