import React from "react";
import styled from "styled-components";
import BlogPage from "../ui/blog/BlogPage";
import { getProduct } from "../../api/apiGetProducts";

const PageWrapper = styled.div`
  /* height: 100vh; */
`;

const Blog = () => {
  return (
    <PageWrapper>
      <BlogPage
        queryKey={["blog_post"]}
        queryFn={() => getProduct("blog_post")}
        title='Blog'
      />
    </PageWrapper>
  );
};

export default Blog;
