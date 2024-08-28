import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

import { toast } from "react-toastify";
import styled from "styled-components";
import { Link } from "react-router-dom";
import BlogList from "./BlogList";
import Spinner from "../Spinner";

const ProductWrapper = styled.div`
  /* padding: 2rem 2rem 4rem 2rem; */
`;

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

  @media (min-width: 768px) {
    font-size: 2rem;
  }
`;

const BlogPage = ({ queryKey, queryFn, title }) => {
  const [page, setPage] = useState(0);
  const itemsPerPage = 2;

  const { isLoading, data, error } = useQuery({
    queryKey,
    queryFn,
  });

  if (isLoading) return <Spinner />;

  if (error) {
    toast.error(error.message.message);
    return <div> {error.message}</div>;
  }

  const startIndex = page * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = data.slice(startIndex, endIndex);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <ProductWrapper>
      <Title>{title}</Title>
      <ProductContainer>
        {currentItems.map((blog) => (
          <Link to={`/blogs/${blog.id}`} key={blog.id}>
            <BlogList blog={blog} />
          </Link>
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
export default BlogPage;
