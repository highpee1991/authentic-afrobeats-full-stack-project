import React, { useState } from "react";
import { FaBars, FaTimes, FaCaretDown, FaSearch } from "react-icons/fa";
import { Link, NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";
import CartIcon from "./cart/CartIcon";

const HeaderStyle = styled.header`
  padding: 0.8rem;
  border-bottom: 1px solid var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 1.5rem;

  @media (min-width: 768px) {
    padding-left: 4rem;
  }
`;

const ListSearch = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoLink = styled(NavLink)`
  transition: all 0.3s;
`;

const ImgStyle = styled.img`
  width: 8.5rem;
  height: 7rem;
`;

const NavList = styled.ul.attrs(({ isOpen }) => ({
  // Do not pass `isOpen` to the DOM
}))`
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  flex-direction: column;
  gap: 1.2rem;
  align-items: flex-start;
  list-style: none;
  position: fixed;
  top: 5;
  left: 0;
  width: 100%;
  height: 70%;
  background-color: var(--color-grey-50);
  padding: 2rem;
  border-radius: var(--border-radius-md);
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 900;
  overflow-y: auto;

  @media (min-width: 768px) {
    display: flex;
    flex-direction: row;
    position: static;
    box-shadow: none;
    background-color: transparent;
    padding: 0;
    height: auto;
    overflow-y: visible;
    align-items: center;
    /* z-index: 700; */
  }
`;

const NavLinkStyle = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    color: var(--color-grey-500);
    font-size: 1.4rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
    text-decoration: none;
  }

  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-brand-600);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

const DropdownContainer = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  z-index: 2000;

  @media (min-width: 768px) {
    &:hover ul {
      display: block;
    }
  }
`;

const DropdownButton = styled(NavLinkStyle)`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 300;
  color: ${({ isActive }) =>
    isActive ? "var(--color-brand-600)" : "var(--color-grey-500)"};

  span,
  svg {
    transition: color 0.3s;
  }

  &:hover,
  &.active {
    color: var(--color-brand-600);

    span,
    svg {
      color: var(--color-brand-600);
    }
  }
`;

const DropdownMenu = styled.ul`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  position: absolute;
  top: 100%;
  left: 0;
  background-color: var(--color-grey-50);
  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-md);
  min-width: 200px;
  list-style: none;
  padding: 0;
  margin: 0;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 1;
  white-space: nowrap;
  max-height: 300px;
  overflow-y: auto;
  min-width: 300px;

  li {
    margin: 0;
    padding: 0;

    a {
      display: block;
      padding: 1rem;
      color: var(--color-grey-600);
      text-decoration: none;

      &:hover {
        background-color: var(--color-grey-100);
      }
    }
  }
`;

const DropDownList = styled(NavLinkStyle)`
  position: relative;
  z-index: 1000;
  padding: 8px;
  transition: padding 0.3s ease;

  &:hover {
    padding-left: 13px;
  }
`;

const HamburgerIcon = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 2rem;

  @media (min-width: 768px) {
    display: none;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  flex-direction: column;
`;

const SearchIconStyle = styled.div`
  cursor: pointer;
  font-size: 1.4rem;
  margin: 1.2rem 2.4rem;
  color: var(--color-grey-300);

  &:hover {
    color: var(--color-brand-600);
  }
`;

const SearchInputAndIcon = styled.div`
  position: absolute;
  bottom: -65px;
  right: 10px;
  z-index: 100;
`;

const SearchInput = styled.input`
  width: 100%;
  border: 1px solid var(--color-grey-50);
  outline: none;
  font-size: 1.2rem;
  padding: 1.2rem;
  border-radius: var(--border-radius-lg);
  display: ${({ search }) => (search ? "block" : "none")};
  transition: all 0.3s;
  background-color: var(--color-grey-50);
  z-index: 100;
  width: 200px;
`;

const IconInputStyle = styled.span`
  position: absolute;
  top: 12px;
  right: 10px;
  color: var(--color-grey-300);
  z-index: 100;

  &:hover {
    color: var(--color-brand-600);
  }
`;

const CartIconStyle = styled.header`
  color: var(--color-grey-400);
  padding-left: 1rem;

  &:hover {
    color: var(--color-brand-600);
  }
`;

const MainNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [search, setSearch] = useState(false);
  const location = useLocation();

  const dropdownActive = [
    "/africanwearandfashion",
    "/beautyandhousehold",
    "/condiments",
    "/drinkandbeverages",
    "/fruitsandvegetables",
    "/grainflourandcereal",
    "/meatandseafood",
    "/snacksandconfectionaries",
    "/others",
  ].includes(location.pathname);

  const handleCloseMenu = (e) => {
    // e.preventDefault();
    setIsOpen(false);
    setIsDropdownOpen(false);
    setSearch(false);
  };

  return (
    <HeaderStyle>
      <LogoLink to='/'>
        <ImgStyle src='/images/logo/Final Logo.png' alt='Company-Logo' />
      </LogoLink>
      <ListSearch>
        <nav>
          <HamburgerIcon onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes /> : <FaBars />}
          </HamburgerIcon>
          <NavList isOpen={isOpen}>
            <DropdownContainer>
              <DropdownButton
                to='#'
                isActive={dropdownActive}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span>Products</span>
                <FaCaretDown />
              </DropdownButton>
              <DropdownMenu isOpen={isDropdownOpen}>
                <li>
                  <DropDownList
                    to='/africanwearandfashion'
                    onClick={handleCloseMenu}
                  >
                    Authentic African Wears & Styles
                  </DropDownList>
                </li>
                <li>
                  <DropDownList
                    to='/beautyandhousehold'
                    onClick={handleCloseMenu}
                  >
                    Beauty & Household
                  </DropDownList>
                </li>
                <li>
                  <DropDownList to='/condiments' onClick={handleCloseMenu}>
                    Condiments
                  </DropDownList>
                </li>
                <li>
                  <DropDownList
                    to='/drinkandbeverages'
                    onClick={handleCloseMenu}
                  >
                    Drink & Beverages
                  </DropDownList>
                </li>
                <li>
                  <DropDownList
                    to='/fruitsandvegetables'
                    onClick={handleCloseMenu}
                  >
                    Fruits & Vegetables
                  </DropDownList>
                </li>
                <li>
                  <DropDownList
                    to='/grainflourandcereal'
                    onClick={handleCloseMenu}
                  >
                    Grain, Flour & Cereal
                  </DropDownList>
                </li>
                <li>
                  <DropDownList to='/meatandseafood' onClick={handleCloseMenu}>
                    Meat & Seafood
                  </DropDownList>
                </li>
                <li>
                  <DropDownList
                    to='/snacksandconfectionaries'
                    onClick={handleCloseMenu}
                  >
                    Snacks & Confectionaries
                  </DropDownList>
                </li>
                <li>
                  <DropDownList to='/others' onClick={handleCloseMenu}>
                    More
                  </DropDownList>
                </li>
              </DropdownMenu>
            </DropdownContainer>
            <li>
              <NavLinkStyle to='/about' onClick={handleCloseMenu}>
                About
              </NavLinkStyle>
            </li>
            <li>
              <NavLinkStyle to='/blog' onClick={handleCloseMenu}>
                Blog
              </NavLinkStyle>
            </li>
            <li>
              <NavLinkStyle to='/contact' onClick={handleCloseMenu}>
                Contact
              </NavLinkStyle>
            </li>
          </NavList>
        </nav>
        <CartIconStyle>
          <Link to='/cart'>
            <CartIcon />
          </Link>
        </CartIconStyle>
        <SearchContainer>
          <SearchIconStyle onClick={() => setSearch(!search)}>
            <FaSearch />
          </SearchIconStyle>
          <SearchInputAndIcon>
            <SearchInput type='text' placeholder='Search' search={search} />
            {search && (
              <IconInputStyle>
                <FaSearch />
              </IconInputStyle>
            )}
          </SearchInputAndIcon>
        </SearchContainer>
      </ListSearch>
    </HeaderStyle>
  );
};

export default MainNav;
