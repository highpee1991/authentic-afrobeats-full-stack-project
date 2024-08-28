import React, { useEffect, useRef } from "react";
import TestimonialCard from "./TestimonialCard";
import styled from "styled-components";

const Carousel = styled.div`
  display: flex;
  overflow-x: auto;
  padding: 1rem;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: 768px) {
    justify-content: space-between;
  }
`;

const Title = styled.h2`
  text-align: center;
`;

const testimonialsData = [
  {
    name: "Castalia Ibarguen",
    text: "Excited i finally got a chance to visit the store after seeing it in passing. The store itself is beautiful, wonderfully organized!",
    image: "/images/icon/icon1.jpg",
  },
  {
    name: "Kani Eji",
    text: "Excellent experience shopping at this store and I highly recommend it, and will come back again. Thank you for being kind,friendly and welcoming!",
    image: "/images/icon/icon1.jpg",
  },
  {
    name: "Danielle Green",
    text: "This place is awesome! I had bought herbs, big spoon, and clothes. If your interested in making sea moss, they have that too!!!!",
    image: "/images/icon/icon2.jpg",
  },
  {
    name: "Olalekan Olakanmi",
    text: "Neat, attentive to customer needs and nice African Cloths",
    image: "/images/icon/icon1.jpg",
  },
  {
    name: "Peter Bissong",
    text: "Excellent customer service!",
    image: "/images/icon/icon1.jpg",
  },
  {
    name: "Tieka Hudson",
    text: "Great Experience here❤️❤️❤️❤️",
    image: "/images/icon/icon2.jpg",
  },
  {
    name: "Aem Carole",
    text: "Great Experience, wonderful customer service",
    image: "/images/icon/icon2.jpg",
  },
];

const Testimonials = () => {
  const carouselRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        const { scrollWidth, clientWidth, scrollLeft } = carouselRef.current;
        const isEnd = scrollLeft + clientWidth >= scrollWidth;

        if (isEnd) {
          carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          carouselRef.current.scrollBy({
            left: clientWidth,
            behavior: "smooth",
          });
        }
      }
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Title>Testimonials</Title>

      <Carousel ref={carouselRef}>
        {testimonialsData.map((testimonial, index) => (
          <TestimonialCard key={index} testimonial={testimonial} />
        ))}
      </Carousel>
    </>
  );
};

export default Testimonials;
