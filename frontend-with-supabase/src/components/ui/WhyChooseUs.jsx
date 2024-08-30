import React from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 2rem;
  background-color: #f8f9fa;
  border-radius: 10px;
  max-width: 900px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 1.5em;
  color: var(--color-grey-700);
  text-align: center;
  margin-bottom: 2rem;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const Section = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: translateY(-10px);
  }
`;

const SectionTitle = styled.h3`
  font-size: 1.5rem;
  color: var(--color-brand-600);
  margin-bottom: 1rem;
`;

const SectionText = styled.div`
  font-size: 1.2rem;
  color: var(--color-grey-700);
  line-height: 1.6;
`;

const WhyChooseUs = () => {
  return (
    <Container>
      <Title>Why Choose Us</Title>
      <Content>
        <Section>
          <SectionTitle id='whyChooseUs'>Free Delivery</SectionTitle>
          <SectionText>
            Enjoy free delivery within a 20-mile radius of our store on orders
            over $100. We ensure that your products arrive quickly and safely at
            your doorstep, making shopping with us convenient and
            cost-effective.
          </SectionText>
        </Section>
        <Section>
          <SectionTitle>High-Quality Products</SectionTitle>
          <SectionText>
            We pride ourselves on offering only the finest quality products.
            From fresh meats and seafood to grains, flours, and cereals,
            everything is carefully selected to meet your standards.
          </SectionText>
        </Section>
        <Section>
          <SectionTitle>Customer Satisfaction</SectionTitle>
          <SectionText>
            Your satisfaction is our top priority. We are committed to providing
            excellent customer service, ensuring that every shopping experience
            is seamless and enjoyable.
          </SectionText>
        </Section>
        <Section>
          <SectionTitle>Wide Variety</SectionTitle>
          <SectionText>
            We offer a wide variety of products to meet all your needs, from
            beauty and household items to snacks, African wears and confections.
            Find everything you need in one place.
          </SectionText>
        </Section>
      </Content>
    </Container>
  );
};

export default WhyChooseUs;
