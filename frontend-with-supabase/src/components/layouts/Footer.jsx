import React from "react";
import styled from "styled-components";
import {
  FaSquareFacebook,
  FaSquareInstagram,
  FaTiktok,
  FaSquareGooglePlus,
} from "react-icons/fa6";

const FooterWrapper = styled.footer`
  background-color: #282828;
  color: #ffffff;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.5rem;
  @media (min-width: 768px) {
    align-items: flex-start;
    text-align: left;
  }
`;

const Logo = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const Links = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  @media (min-width: 768px) {
    align-items: flex-start;
  }
  a {
    color: #ffffff;
    text-decoration: none;
    &:hover {
      color: var(--color-brand-600);
    }
  }
`;

const SocialIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 1rem 0;

  @media (min-width: 768px) {
    justify-content: flex-start;
    padding: 0;
  }
`;

const IconLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.4rem;
  height: 2.4rem;
  color: white;
  transition: all 0.3s;
  border-radius: 50%;
  background-color: transparent;

  &:hover {
    color: var(--color-brand-600);
    background-color: var(--color-grey-900);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
  }
`;

const FooterText = styled.p`
  margin-top: 2rem;
  font-size: 0.875rem;
  @media (min-width: 768px) {
    margin-top: 1rem;
  }
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterContent>
        <Section>
          <Logo>Authentic Afrobeats</Logo>
          <h3>Contact</h3>
          <p>9635 N Sam Houston Pkwy E ste 350, Humble, TX 77396</p>
          <p>Phone: 832 992 2340</p>
          <p>Email: aafoodstores@gmail.com</p>
        </Section>
        <Section>
          <h3>Quick Links</h3>
          <Links>
            <a href='/about'>About Us</a>
            <a href='/products'>Products</a>
            <a href='/blog'>Blog</a>
            <a href='/contact'>Contact Us</a>
          </Links>
        </Section>
        <Section>
          <h3>Follow Us</h3>
          <SocialIcons>
            <IconLink
              href='https://www.facebook.com/profile.php?id=61556320058264&mibextid=ZbWKwL'
              target='_blank'
              rel='noopener noreferrer'
            >
              <FaSquareFacebook />
            </IconLink>
            <IconLink
              href='https://www.instagram.com/authentic_afrobeats_food_store?igsh=ZTc3ZmIzaTZrbXd1'
              target='_blank'
              rel='noopener noreferrer'
            >
              <FaSquareInstagram />
            </IconLink>
            <IconLink
              href='https://www.google.com/maps/place/Authentic+Afrobeats+Food+Store/@29.9366965,-95.2472128,15z/data=!4m6!3m5!1s0x8640b1c45dc5cc37:0xeb3ce1c6b7b35ce7!8m2!3d29.9366965!4d-95.2472128!16s%2Fg%2F11vq480b8s?entry=ttu'
              target='_blank'
              rel='noopener noreferrer'
            >
              <FaSquareGooglePlus />
            </IconLink>
            <IconLink
              href='https://www.tiktok.com/@authentic_afrobeat_store?_t=8ngxZGnQ6pK&_r=1'
              target='_blank'
              rel='noopener noreferrer'
            >
              <FaTiktok />
            </IconLink>
          </SocialIcons>
        </Section>
        <Section>
          <h3>Opening Hours</h3>
          <p>Mon - Sat: 9AM-8PM</p>
          <p>Sun: 10AM-6PM</p>
        </Section>
      </FooterContent>
      <FooterText>
        &copy; 2024 Authentic Afrobeats Food Store. All rights reserved.
      </FooterText>
    </FooterWrapper>
  );
};

export default Footer;
