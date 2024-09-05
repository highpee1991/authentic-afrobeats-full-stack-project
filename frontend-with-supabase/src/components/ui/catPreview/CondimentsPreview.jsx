import React from "react";
import ProductPreview from "../shared/productPreview/ProductPreview";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../Spinner";
import { getProduct } from "../../../api/apiGetProducts";

const CondimentsPreview = () => {
  const {
    data: CondimentsData,
    isLoading: isLoadingCondiments,
    error,
  } = useQuery({
    queryKey: ["condiments"],
    queryFn: () => getProduct("condiments"),
  });

  if (isLoadingCondiments) return <Spinner />;

  if (error) return <p>Failed to load products</p>;

  return (
    <div>
      <ProductPreview
        title='Condiments'
        products={CondimentsData}
        categoryPath='/condiments'
        limit={12}
        pathPrefix={"condiments"}
      />
    </div>
  );
};

export default CondimentsPreview;
