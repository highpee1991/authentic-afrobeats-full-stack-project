import React from "react";
import styled from "styled-components";

const AboutWrapper = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const AboutHeader = styled.h2`
  font-size: 2rem;
  color: #282828;
`;

const AboutContent = styled.div`
  max-width: 800px;
  text-align: center;
  color: #555;
  line-height: 1.6;
`;

const TeamContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  margin-top: 2rem;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-around;
  }
`;

const TeamMember = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const MemberImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
  box-shadow: var(--shadow-md);
`;

const MemberName = styled.h3`
  font-size: 1.2rem;
  color: #282828;
`;

const MemberRole = styled.p`
  color: #777;
`;

const AboutPage = () => {
  return (
    <AboutWrapper>
      <AboutHeader>About Us</AboutHeader>
      <AboutContent>
        <p>
          Welcome to Authentic Afrobeats Food Store! We are dedicated to
          bringing you the best and most authentic African and Caribbean foods
          and wears. Our mission is to provide our customers with high-quality
          products that celebrate the rich culture and heritage of Africa and
          the Caribbean.
        </p>
        <p>
          Our store is located in Humble, TX, and we pride ourselves on our
          excellent customer service and wide selection of products. Whether you
          are looking for traditional African clothing, unique Caribbean
          ingredients, or just want to explore our diverse range of products, we
          have something for everyone.
        </p>
      </AboutContent>
      <TeamContainer>
        <TeamMember>
          <MemberImage
            src='https://via.placeholder.com/150'
            alt='Team Member 1'
          />
          <MemberName>Reliance Emunefe</MemberName>
          <MemberRole>Founder & CEO</MemberRole>
        </TeamMember>
        <TeamMember>
          <MemberImage
            src='https://via.placeholder.com/150'
            alt='Team Member 2'
          />
          <MemberName>Torinse Emunefe</MemberName>
          <MemberRole>Head of Marketing</MemberRole>
        </TeamMember>
        <TeamMember>
          <MemberImage
            src='https://via.placeholder.com/150'
            alt='Team Member 3'
          />
          <MemberName>Joy James</MemberName>
          <MemberRole>Product Manager</MemberRole>
        </TeamMember>
      </TeamContainer>
    </AboutWrapper>
  );
};

export default AboutPage;
