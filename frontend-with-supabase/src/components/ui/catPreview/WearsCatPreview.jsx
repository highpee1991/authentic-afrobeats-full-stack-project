import React from "react";
import ProductPreview from "../shared/productPreview/ProductPreview";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../Spinner";
import { getProduct } from "../../../api/apiGetProducts";

const WearsCatPreview = () => {
  const {
    data: africanWears,
    isLoading: isLoadingWears,
    error,
  } = useQuery({
    queryKey: ["WearsStyles"],
    queryFn: () => getProduct("authentic_african_wear"),
  });

  if (isLoadingWears) return <Spinner />;

  if (error) return <p>Failed to load products</p>;

  return (
    <div>
      <ProductPreview
        title='African Wears'
        products={africanWears}
        categoryPath='/africanwearandfashion'
        limit={6}
        pathPrefix={"wears"}
      />
    </div>
  );
};

export default WearsCatPreview;
