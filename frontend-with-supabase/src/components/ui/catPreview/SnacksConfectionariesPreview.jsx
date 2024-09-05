import React from "react";
import ProductPreview from "../shared/productPreview/ProductPreview";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../Spinner";
import { getProduct } from "../../../api/apiGetProducts";

const SnacksConfectionariesPreview = () => {
  const {
    data: snacksConfectionariesData,
    isLoading: isLoadingSnacksConf,
    error,
  } = useQuery({
    queryKey: ["snacksAndConfectionaries"],
    queryFn: () => getProduct("snack_confectionaries"),
  });

  if (isLoadingSnacksConf) return <Spinner />;

  if (error) return <p>Failed to load products</p>;

  return (
    <div>
      <ProductPreview
        title='Snacks & Confectionaries'
        products={snacksConfectionariesData}
        categoryPath='/snacksandconfectionaries'
        limit={12}
        pathPrefix={"snacks"}
      />
    </div>
  );
};

export default SnacksConfectionariesPreview;
