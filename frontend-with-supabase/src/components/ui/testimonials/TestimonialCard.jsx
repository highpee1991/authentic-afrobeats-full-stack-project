import React from "react";
import styled from "styled-components";

const Card = styled.div`
  padding: 1rem;
  margin: 1rem;
  width: 100%;
  max-width: 300px;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  flex: 0 0 auto; /* Prevent flexbox from shrinking the cards */
`;

const Image = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
`;

const Name = styled.h3`
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
`;

const Text = styled.p`
  font-size: 1.2rem;
  color: #555;
`;

const TestimonialCard = ({ testimonial }) => {
  return (
    <Card>
      <Image src={testimonial.image} alt={`${testimonial.name}'s photo`} />
      <Name>{testimonial.name}</Name>
      <Text>{testimonial.text}</Text>
    </Card>
  );
};

export default TestimonialCard;
