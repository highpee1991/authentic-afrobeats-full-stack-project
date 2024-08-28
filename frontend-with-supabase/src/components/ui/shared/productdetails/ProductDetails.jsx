import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { toast } from "react-toastify";
import { FaArrowLeft } from "react-icons/fa6";
import Spinner from "../../Spinner";
import { formatCurrency } from "../../../../utils/helpers";
import Button from "../button/Button";
import { getItemById } from "../../../../api/apiGetItemById";
import { useCart } from "../../../context/CartContext";

const ProductDetailsWrapper = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: auto;

  @media (min-width: 768px) {
    display: flex;
    gap: 2rem;
  }
`;

const MainImage = styled.img`
  width: 100%;
  max-width: 400px;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
`;

const ThumbnailContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  overflow-x: auto;
  padding-bottom: 1rem;
`;

const Thumbnail = styled.img`
  width: 100px;
  cursor: pointer;
  border: ${(props) =>
    props.isSelected ? `2px solid var(--color-brand-600)` : "none"};
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);

  &:hover {
    border: 2px solid var(--color-brand-600);
  }
`;

const PriceContainer = styled.div`
  margin-top: 1rem;
  font-weight: 500;
  display: flex;
  align-items: center;

  @media (min-width: 768px) {
    margin-top: 4rem;
    margin-bottom: 2rem;
  }
`;

const EffectivePrice = styled.span`
  font-weight: 700;
  color: var(--color-brand-800);
  font-size: 1.5rem;
`;

const OriginalPrice = styled.span`
  text-decoration: line-through;
  color: var(--color-grey-500);
  margin-left: 1rem;
  font-size: 1.2rem;
`;

const ProductInfo = styled.div`
  margin-top: 2rem;

  @media (min-width: 768px) {
    margin-left: 4rem;
    max-width: 600px;
  }

  h2 {
    font-size: 2rem;
    color: var(--color-brand-900);
    margin-top: 1.5rem;
  }

  p {
    font-size: 1.2rem;
    color: var(--color-grey-800);
    line-height: 1.6;
    margin-bottom: 1rem;
  }
`;

const BackButton = styled.button`
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: var(--border-radius-md);
  background-color: var(--color-brand-600);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background-color: var(--color-brand-700);
  }

  svg {
    font-size: 1.2rem;
  }
`;

const ProductDetails = ({ tableName, pathPrefix }) => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useQuery({
    queryKey: ["product", tableName, productId],
    queryFn: () => getItemById(tableName, productId),
  });

  const [selectedImage, setSelectedImage] = useState("");

  const { dispatch } = useCart();

  useEffect(() => {
    if (data) {
      // Set default selected image to img1 if available
      setSelectedImage(data.img1 || "");
    }
  }, [data]);

  if (isLoading) return <Spinner />;

  if (error) {
    toast.error("failed to load product details");
    return null;
  }

  const {
    id,
    name,
    img1,
    description_header,
    description,
    price,
    discount_price,
    img2,
    size,
  } = data;

  const effectivePrice = discount_price ? discount_price : price;

  const addToCart = () => {
    const item = {
      id,
      name,
      price: effectivePrice,
      image: img1,
    };

    dispatch({ type: "ADD_ITEM", payload: item });
    toast.success("Item added to cart");
  };

  return (
    <ProductDetailsWrapper>
      <div>
        <BackButton sizes='small' onClick={() => navigate(-1)}>
          <FaArrowLeft />
          <span>Back</span>
        </BackButton>
        <h1>{name}</h1>
        <MainImage src={selectedImage} alt={name} />
        <ThumbnailContainer>
          {img1 && (
            <Thumbnail
              src={img1}
              name={`${name} thumbnail 1`}
              isSelected={selectedImage === img1}
              onClick={() => setSelectedImage(img1)}
            />
          )}
          {img2 && (
            <Thumbnail
              src={img2}
              name={`${name} thumbnail 2`}
              isSelected={selectedImage === img2}
              onClick={() => setSelectedImage(img2)}
            />
          )}
        </ThumbnailContainer>
        <small>Images used are for descriptive purpose only</small>
      </div>
      <ProductInfo>
        <h2>{description_header}</h2>
        <p>{description}</p>
        <p>{size}</p>
        <PriceContainer>
          <span>
            Price:
            <EffectivePrice>{formatCurrency(effectivePrice)}</EffectivePrice>
          </span>
          {discount_price >= 1 && (
            <OriginalPrice>{formatCurrency(price)}</OriginalPrice>
          )}
        </PriceContainer>
        <Button onClick={addToCart}>Add to Cart</Button>
      </ProductInfo>
    </ProductDetailsWrapper>
  );
};

export default ProductDetails;
