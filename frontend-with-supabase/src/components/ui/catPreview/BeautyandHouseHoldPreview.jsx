import React from "react";
import ProductPreview from "../shared/productPreview/ProductPreview";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../Spinner";
import { getProduct } from "../../../api/apiGetProducts";

const BeautyandHouseHoldPreview = () => {
  const {
    data: BeautyandHouseHoldData,
    isLoading: isLoadingBeauty,
    error,
  } = useQuery({
    queryKey: ["beautiesandhousehold"],
    queryFn: () => getProduct("beauty_and_household"),
  });

  if (isLoadingBeauty) return <Spinner />;

  if (error) return <p>Failed to load products</p>;

  return (
    <div>
      <ProductPreview
        title='Beauty & Household'
        products={BeautyandHouseHoldData}
        categoryPath='/beautyandhousehold'
        limit={12}
        pathPrefix={"beauty"}
      />
    </div>
  );
};

export default BeautyandHouseHoldPreview;
