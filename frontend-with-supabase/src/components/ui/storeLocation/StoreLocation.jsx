import React from "react";
import styled from "styled-components";
import { FaMapMarker } from "react-icons/fa";

const StoreLocationWrapper = styled.div`
  padding: 2rem;
  text-align: center;
`;

const ImageGallery = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
`;

const StoreImage = styled.img`
  width: calc(25% - 1rem); // Four images per row with a gap of 1rem
  max-width: 200px;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
`;

const Button = styled.button`
  margin-top: 1.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: var(--border-radius-md);
  background-color: var(--color-brand-600);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  &:hover {
    background-color: var(--color-brand-700);
  }
`;

const Visit = styled.h2`
  color: var(--color-grey-700);
`;

const StoreLocation = () => {
  const storeAddress = "9635 N Sam Houston Pkwy E, Humble, TX";
  const storeImages = [
    "/images/store/a.jpg",
    "/images/store/b.jpg",
    "/images/store/c.jpg",
    "/images/store/d.jpg",
  ];

  const handleOpenMap = () => {
    const googleMapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      storeAddress
    )}`;
    window.open(googleMapUrl, "_blank");
  };

  return (
    <StoreLocationWrapper>
      <Visit>Visit Our Store</Visit>
      <ImageGallery>
        {storeImages.map((src, index) => (
          <StoreImage key={index} src={src} alt={`Store Image ${index + 1}`} />
        ))}
      </ImageGallery>
      <p>
        9635 N Sam Houston Pkwy E, Humble, TX
        <br />
        Experience the best of authentic African and Caribbean foods and wears!
      </p>
      <Button onClick={handleOpenMap}>
        <FaMapMarker />
        Get Directions
      </Button>
    </StoreLocationWrapper>
  );
};

export default StoreLocation;
