import React from "react";
import styled from "styled-components";
import {
  FaSquareFacebook,
  FaSquareInstagram,
  FaTiktok,
  FaSquareGooglePlus,
} from "react-icons/fa6";
import UserAvatar from "../authentication/UserAvatar";

const SocialIcons = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 0.8rem;
  background-color: var(--color-silver-700);
  padding: 0.5rem;
  padding-right: 2rem;
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

const Myaccount = styled.div`
  color: white;
`;

const SocialMediaLogoHeader = () => {
  return (
    <SocialIcons>
      <Myaccount>
        <UserAvatar />
      </Myaccount>
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
  );
};

export default SocialMediaLogoHeader;
