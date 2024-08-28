import React from "react";
import styled from "styled-components";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Fix for marker icon issue with Webpack
import L from "leaflet";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const ContactWrapper = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const ContactInfo = styled.div`
  text-align: center;
`;

const MapWrapper = styled.div`
  width: 100%;
  height: 400px;
  @media (min-width: 768px) {
    width: 80%;
  }
`;

const ContactPage = () => {
  const position = [29.9366965, -95.2472128]; // Coordinates for your location

  return (
    <ContactWrapper>
      <ContactInfo>
        <h2>Contact Us</h2>
        <p>9635 N Sam Houston Pkwy E ste 350, Humble, TX 77396</p>
        <p>Phone: 832 992 2340</p>
        <p>Email: aafoodstores@gmail.com</p>
      </ContactInfo>
      <MapWrapper>
        <MapContainer
          center={position}
          zoom={15}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position}>
            <Popup>Authentic Afrobeats Food Store</Popup>
          </Marker>
        </MapContainer>
      </MapWrapper>
    </ContactWrapper>
  );
};

export default ContactPage;
