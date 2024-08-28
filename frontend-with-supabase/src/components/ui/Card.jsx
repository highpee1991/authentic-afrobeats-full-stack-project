import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";
import qualityData from "./uiData/shopQualityProductData";
import Button from "./shared/button/Button";
import { useNavigate } from "react-router-dom";

const CardContainer = styled(motion.div)`
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(255, 254, 254, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background-color: var(--color-grey-50);

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(255, 254, 254, 0.1);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  padding-top: 1rem;
`;

const CardContent = styled.div`
  padding: 20px;
`;

const CardTitle = styled.div`
  margin: 0 0 10px;
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--color-grey-900);
`;

const CardDescription = styled.div`
  font-size: 1.2rem;
  margin-bottom: 0.7rem;
  color: var(--color-grey-500);
`;

const Card = ({ image, title, description, navigateToItem }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(navigateToItem);
  };

  return (
    <CardContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <CardImage src={image} alt={title} />
      <CardContent>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <Button onClick={handleNavigate} size='small'>
          Learn More
        </Button>
      </CardContent>
    </CardContainer>
  );
};

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  padding: 20px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
`;

const CardGrid = ({ cards }) => (
  <GridContainer>
    {qualityData.map((card) => (
      <Card
        key={card.id}
        image={card.image}
        title={card.title}
        description={card.description}
        navigateToItem={card.navigateTo}
      />
    ))}
  </GridContainer>
);

export default CardGrid;
