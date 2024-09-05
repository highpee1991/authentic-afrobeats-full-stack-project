import React from "react";
import ProductPreview from "../shared/productPreview/ProductPreview";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../Spinner";
import { getProduct } from "../../../api/apiGetProducts";

const GrainFlourCerealPreview = () => {
  const {
    data: grainFlourCerealData,
    isLoading: isLoadingGrains,
    error,
  } = useQuery({
    queryKey: ["grainFlourAndCereal"],
    queryFn: () => getProduct("grain_flour_cereal"),
  });

  if (isLoadingGrains) return <Spinner />;

  if (error) return <p>Failed to load products</p>;

  return (
    <div>
      <ProductPreview
        title='Grain, Flour & Cereal'
        products={grainFlourCerealData}
        categoryPath='/grainflourandcereal'
        limit={12}
        pathPrefix={"grains"}
      />
    </div>
  );
};

export default GrainFlourCerealPreview;
