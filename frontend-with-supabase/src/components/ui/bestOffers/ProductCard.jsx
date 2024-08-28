import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { formatCurrency } from "../../../utils/helpers";
import Button from "../shared/button/Button";
import AddToCartButton from "../cart/AddToCartButton";

const Card = styled.div`
  border: 1px solid var(--color-brand-100);
  border-radius: var(--border-radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: auto;
  overflow: hidden;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Info = styled.div`
  padding: 1rem;
  text-align: center;
`;

const ProductName = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const Price = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.5rem;

  span {
    font-size: 1.4rem;
    color: var(--color-grey-700);

    &.discount {
      text-decoration: line-through;
      color: red;
      margin-right: 0.5rem;
    }
  }
`;

const ButtonWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;

// const ProductCard = ({ product }) => {
//   const navigate = useNavigate();

//   const handleViewAll = () => {
//     navigate(`/products/${product.id}`);
//   };

//   return (
//     <Card>
//       <ImageContainer>
//         <ProductImage src={product.img1} alt={product.name} />
//       </ImageContainer>
//       <Info>
//         <ProductName>{product.name}</ProductName>
//         <Price>
//           {product.discount_price ? (
//             <>
//               <span className='discount'>{formatCurrency(product.price)}</span>{" "}
//               <span>{formatCurrency(product.discount_price)}</span>
//             </>
//           ) : (
//             <span>{formatCurrency(product.price)}</span>
//           )}
//         </Price>
//         <ButtonWrap>
//           <Button size='small' onClick={handleViewAll}>
//             View Details
//           </Button>
//           <AddToCartButton item={product} />
//         </ButtonWrap>
//       </Info>
//     </Card>
//   );
// };

// export default ProductCard;

/////////////////
const ProductCard = ({ product, pathPrefix }) => {
  const navigate = useNavigate();

  const handleViewAll = () => {
    navigate(`/products/${pathPrefix}/${product.id}`);
  };

  return (
    <Card>
      <ImageContainer>
        <ProductImage src={product.img1} alt={product.name} />
      </ImageContainer>
      <Info>
        <ProductName>{product.name}</ProductName>
        <Price>
          {product.discount_price ? (
            <>
              <span className='discount'>{formatCurrency(product.price)}</span>{" "}
              <span>{formatCurrency(product.discount_price)}</span>
            </>
          ) : (
            <span>{formatCurrency(product.price)}</span>
          )}
        </Price>
        <ButtonWrap>
          <Button size='small' onClick={handleViewAll}>
            View Details
          </Button>
          <AddToCartButton item={product} />
        </ButtonWrap>
      </Info>
    </Card>
  );
};

export default ProductCard;
