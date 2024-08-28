import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../shared/button/Button";

const BlogPreviewWrapper = styled.div`
  margin: 2rem;
`;

const BlogList = styled.div`
  display: flex;
  gap: 1rem;
  overflow-x: auto;
`;

const BlogCard = styled.div`
  flex: 0 0 200px;
  cursor: pointer;
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);
  padding: 2px;
  img {
    width: 100%;
    height: auto;
    border-radius: var(--border-radius-md);
  }
  &:hover {
    box-shadow: var(--shadow-lg);
    border: 1px solid var(--color-brand-600);
  }
`;

const Title = styled.h2`
  margin-bottom: 2rem;
  color: var(--color-brand-900);

  @media (min-width: 768px) {
    font-size: 2.5rem;
  }
`;

const BlogName = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--color-grey-900);
`;

const BlogPreview = ({ title, blogs, categoryPath, limit = 4 }) => {
  const navigate = useNavigate();

  const handleBlogClick = (blogId) => {
    navigate(`/blogs/${blogId}`);
  };

  const handleSeeAllClick = () => {
    navigate(categoryPath);
  };

  return (
    <BlogPreviewWrapper>
      <Title>{title}</Title>
      <BlogList>
        {blogs.slice(0, limit).map((blog) => (
          <BlogCard key={blog.id} onClick={() => handleBlogClick(blog.id)}>
            <img src={blog.img1} alt={blog.name} />
            <BlogName>{blog.name}</BlogName>
          </BlogCard>
        ))}
      </BlogList>
      <Button size='medium' onClick={handleSeeAllClick}>
        See All {title}
      </Button>
    </BlogPreviewWrapper>
  );
};

export default BlogPreview;
