import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const ShortcutContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background-color: #f8f8f8;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  width: 100%;
  max-width: 300px;
  margin: 1rem auto;

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const PromoText = styled.p`
  font-size: 1.4rem;
  margin-bottom: 1rem;
  color: var(--color-brand-700);
  font-weight: 900;
  text-transform: uppercase;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ShortcutList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ShortcutItem = styled.div`
  flex: 1;
  min-width: 150px;
  padding: 1rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  text-align: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f0f0f0;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const Shortcut = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => () => {
    navigate(path);
  };

  return (
    <ShortcutContainer>
      <PromoText>
        Spend up to $100 and enjoy free delivery within a 20-mile radius of our
        store.
      </PromoText>
      <ShortcutList>
        <ShortcutItem onClick={handleNavigation("/africanwearandfashion")}>
          Authentic African Wears & Styles
        </ShortcutItem>
        <ShortcutItem onClick={handleNavigation("/beautyandhousehold")}>
          Beauty & Household
        </ShortcutItem>
        <ShortcutItem onClick={handleNavigation("/condiments")}>
          Condiments
        </ShortcutItem>
        <ShortcutItem onClick={handleNavigation("/drinkandbeverages")}>
          Drink & Beverages
        </ShortcutItem>
        <ShortcutItem onClick={handleNavigation("/fruitsandvegetables")}>
          Fruits and Vegetables
        </ShortcutItem>
        <ShortcutItem onClick={handleNavigation("/grainflourandcereal")}>
          Grain, Flours & Cereals
        </ShortcutItem>
        <ShortcutItem onClick={handleNavigation("/meatandseafood")}>
          Meat & Seafood
        </ShortcutItem>
        <ShortcutItem onClick={handleNavigation("/snacksandconfectionaries")}>
          Snacks & Confectionaries
        </ShortcutItem>
        <ShortcutItem onClick={handleNavigation("/others")}>
          Others
        </ShortcutItem>
      </ShortcutList>
    </ShortcutContainer>
  );
};

export default Shortcut;
