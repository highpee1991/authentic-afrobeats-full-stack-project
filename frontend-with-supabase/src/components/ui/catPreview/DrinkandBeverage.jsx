import React from "react";
import ProductPreview from "../shared/productPreview/ProductPreview";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../Spinner";
import { getProduct } from "../../../api/apiGetProducts";

const DrinkandBeverageDisplay = () => {
  const {
    data: DrinkandBeverage,
    isLoading: isLoadingDrinks,
    error,
  } = useQuery({
    queryKey: ["drinkandbeverages"],
    queryFn: () => getProduct("drink_beverage"),
  });

  if (isLoadingDrinks) return <Spinner />;

  if (error) return <p>Failed to load products</p>;

  return (
    <div>
      <ProductPreview
        title='Drinks and Beverages'
        products={DrinkandBeverage}
        categoryPath='/drinkandbeverages'
        limit={6}
        pathPrefix={"drinks"}
      />
    </div>
  );
};

export default DrinkandBeverageDisplay;
