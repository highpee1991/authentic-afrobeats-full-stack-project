import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import useResize from "../../hooks/UseResize";
import slides from "./uiData/heroData";
import Button from "./shared/button/Button";
import { Link } from "react-router-dom";

const HeroContainer = styled.div`
  position: relative;
  width: 100%;
  height: 50vh;
  overflow: hidden;

  @media (min-width: 541px) {
    height: 80vh;
  }
`;

const Slide = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-color: #f0f0f0; /* Fallback color for smoother transition */
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 2rem;

  @media (min-width: 768px) {
    padding-left: 3rem;
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1;
`;

const Content = styled.div`
  position: relative;
  z-index: 6;
  border-radius: var(--border-radius-lg);
  padding: 1rem;
  color: var(--color-grey-50);
  max-width: 600px;

  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

const Header = styled(motion.h1)`
  font-size: 2rem;
  margin-bottom: 20px;
  text-align: left;
  text-transform: uppercase;

  @media (min-width: 768px) {
    font-size: 3rem;
  }
`;

const Text = styled(motion.p)`
  font-size: 1.3rem;
  text-transform: uppercase;
  margin-bottom: 40px;
  text-align: left;
  max-width: 300px;

  @media (min-width: 768px) {
    font-size: 1.5rem;
    max-width: 500px;
  }
`;

const Navigation = styled.div`
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
`;

const NavButton = styled.button`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: none;
  background: ${(props) =>
    props.isActive ? "var(--color-brand-600)" : "var(--color-grey-50)"};
  cursor: pointer;
  z-index: 5;
  &:focus {
    outline: none;
  }
`;

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const timeoutRef = useRef(null);
  const { width } = useResize();

  // Manage autoplay timing
  useEffect(() => {
    const startAutoplay = () => {
      timeoutRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 10000); // Change slide every 10 seconds
    };

    startAutoplay();

    return () => clearInterval(timeoutRef.current); // Clean up on unmount
  }, []);

  const handleNavClick = (index) => {
    setCurrentSlide(index); // Set slide to the clicked dot's index

    // Reset autoplay
    clearInterval(timeoutRef.current);
    timeoutRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 10000); // 10 seconds interval
  };

  return (
    <HeroContainer>
      <AnimatePresence>
        {slides.map((slide, index) =>
          index === currentSlide ? (
            <Slide
              key={slide.id}
              style={{ backgroundImage: `url(${slide.image})` }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <Overlay />
              <Content>
                <Header
                  initial={{ y: -100 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1 }}
                >
                  {slide.header}
                </Header>
                <Text
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 2 }}
                >
                  {slide.text}
                </Text>
                <Link to={slide.link}>
                  <Button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    size={width > 768 ? "large" : "medium"}
                  >
                    {slide.buttonLabel}
                  </Button>
                </Link>
              </Content>
            </Slide>
          ) : null
        )}
      </AnimatePresence>
      <Navigation>
        {slides.map((_, index) => (
          <NavButton
            key={index}
            isActive={index === currentSlide}
            onClick={() => handleNavClick(index)}
          />
        ))}
      </Navigation>
    </HeroContainer>
  );
};

export default Hero;
