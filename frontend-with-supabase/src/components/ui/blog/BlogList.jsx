import React from "react";
import styled from "styled-components";

const Card = styled.div`
  background-color: var(--color-grey-50);
  border-radius: var(--border-radius-md);
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s, box-shadow 0.3s;
  max-width: 250px;
  margin: auto;

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

const BlogList = ({ blog }) => {
  const { name, img1 } = blog;
  return (
    <Card>
      <ImageContainer>
        <img src={img1} alt={name} />
      </ImageContainer>
      <Content>
        <Title>{name}</Title>
      </Content>
    </Card>
  );
};

export default BlogList;
