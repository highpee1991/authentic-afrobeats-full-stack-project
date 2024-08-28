import React, { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { toast } from "react-toastify";
import styled from "styled-components";
import ProductList from "./ProductList";
import Spinner from "../../Spinner";
import { UserContext } from "../../../context/userContext";
import AddItemForm from "../../addItemForm/AddItemForm";
import Modal from "../../addItemForm/Modal";
import { BsTablet } from "react-icons/bs";

// Styled components
const ProductWrapper = styled.div``;
const ProductContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  padding: 2rem;
`;
const PaginationControls = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
`;
const Button = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: var(--color-brand-600);
  color: #fff;
  border: none;
  border-radius: var(--border-radius-sm);
  cursor: pointer;

  &:disabled {
    background-color: var(--color-grey-400);
    cursor: not-allowed;
  }
`;
const Title = styled.h2`
  font-size: 1.5rem;
  text-transform: uppercase;
  padding: 2rem;
  background-color: var(--color-brand-50);
  text-align: center;

  @media (min-width: 768px) {
    font-size: 2rem;
  }
`;
const AddItem = styled.div`
  background-color: var(--color-brand-600);
  color: #ffffff;
  font-size: 1.2rem;
  text-transform: uppercase;
  font-weight: 900;
  padding: 0.5rem 0;
  text-align: center;
  cursor: pointer;

  &:hover {
    background-color: var(--color-brand-700);
  }

  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

const ProductPage = ({ queryKey, queryFn, title, table, pathPrefix }) => {
  const { userRole } = useContext(UserContext);
  const [page, setPage] = useState(0);
  const [isModalOpen, setModalOpen] = useState(false);

  const itemsPerPage = 8;

  const { isLoading, data, error } = useQuery({
    queryKey,
    queryFn,
  });

  if (isLoading) return <Spinner />;

  if (error) {
    toast.error(error.message.message);
    return <div>{error.message}</div>;
  }

  const startIndex = page * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = data.slice(startIndex, endIndex);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <ProductWrapper>
      <Title>{title}</Title>

      {userRole === "admin" && (
        <>
          <AddItem onClick={() => setModalOpen(true)}>Add Item</AddItem>

          {/* Modal for adding items */}
          <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
            <AddItemForm table={table} querykey={queryKey} />
          </Modal>
        </>
      )}

      <ProductContainer>
        {currentItems.map((item) => (
          <ProductList
            key={item.id}
            product={item}
            queryClientKey={queryKey}
            table={table}
            pathPrefix={pathPrefix}
          />
        ))}
      </ProductContainer>

      <PaginationControls>
        <Button onClick={() => setPage(page - 1)} disabled={page === 0}>
          <FaArrowLeft /> <span>Prev</span>
        </Button>
        <Button
          onClick={() => setPage(page + 1)}
          disabled={page + 1 === totalPages}
        >
          <span>Next</span>
          <FaArrowRight />
        </Button>
      </PaginationControls>
    </ProductWrapper>
  );
};

export default ProductPage;
