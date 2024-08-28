import React, { useContext } from "react";
import styled from "styled-components";
import { formatCurrency } from "../../../../utils/helpers";
import { Link } from "react-router-dom";
import AddToCartButton from "../../cart/AddToCartButton";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { UserContext } from "../../../context/userContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "../../../../api/apiDelete";
import { toast } from "react-toastify";

const Card = styled.div`
  background-color: var(--color-grey-50);
  border-radius: var(--border-radius-md);
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  max-width: 250px;
  margin: auto;
  box-shadow: var(--shadow-md);
  padding: 2rem;

  &:hover {
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.5);
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: auto;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s;

    &:hover {
      transform: scale(1.1);
    }
  }
`;

const Content = styled.div`
  padding: 1rem;
`;

const Title = styled.h3`
  font-size: 1.6rem;
  font-weight: 500;
  color: var(--color-grey-900);
  margin: 0;
`;

const Price = styled.div`
  display: flex;
  align-items: center;
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
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

const DelIcon = styled.button`
  color: tomato;
  cursor: pointer;
  outline: none;
  border: none;

  &:hover {
    color: red;
  }
`;

const EdithIcon = styled.button`
  color: var(--color-brand-700);
  cursor: pointer;
  outline: none;
  border: none;

  &:hover {
    color: var(--color-brand-800);
  }
`;

const ProductList = ({ product, queryClientKey, table, pathPrefix }) => {
  const { userRole } = useContext(UserContext);
  const queryClient = useQueryClient();
  const { id, img1, name, price, discount_price } = product;

  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: (id) => deleteProduct(id, table),
    onSuccess: () => {
      toast.success("Product successfully deleted");
      queryClient.invalidateQueries([queryClientKey]);
    },
    onError: (err) => toast.error(err.message),
  });

  return (
    <Card>
      {userRole === "admin" && (
        <EdithIcon>
          <FaPencil />
        </EdithIcon>
      )}
      <Link to={`/products/${pathPrefix}/${product.id}`} key={product.id}>
        <ImageContainer>
          <img src={img1} alt={name} />
        </ImageContainer>
        <Title>{name}</Title>
      </Link>
      <Content>
        <Price>
          {discount_price ? (
            <>
              <span className='discount'>{formatCurrency(price)}</span>{" "}
              <span>{formatCurrency(discount_price)}</span>
            </>
          ) : (
            <span>{formatCurrency(price)}</span>
          )}
        </Price>
      </Content>
      <ButtonWrap>
        <AddToCartButton item={product} />
        {userRole === "admin" && (
          <DelIcon onClick={() => mutate(id)} disabled={isDeleting}>
            <FaTrash />
          </DelIcon>
        )}
      </ButtonWrap>
    </Card>
  );
};

export default ProductList;
