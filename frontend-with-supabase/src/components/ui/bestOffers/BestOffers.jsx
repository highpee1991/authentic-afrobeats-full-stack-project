import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard";
import { getDiscountedProducts } from "../../../api/apiDiscountedProduct";
import Spinner from "../Spinner";

const BestOffersWrapper = styled.div`
  padding: 2rem;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
`;

// const BestOffers = () => {
//   const { data, isLoading, error } = useQuery({
//     queryKey: ["discountedProducts"],
//     queryFn: getDiscountedProducts,
//   });
//   const [shuffleProducts, setShuffleProducts] = useState([]);

//   useEffect(() => {
//     if (data) {
//       const shuffled = [...data].sort(() => Math.random() - 0.5);
//       setShuffleProducts(shuffled);
//     }
//   }, [data]);

//   if (isLoading) return <Spinner />;
//   if (error) return <p>Failed to load best selling products</p>;

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 4,
//     slidesToScroll: 1,
//     autoplay: true,
//     // autoplaySpeed: 100,
//     responsive: [
//       {
//         breakpoint: 1024, // At 768px and above, show 3 products per slide
//         settings: {
//           slidesToShow: 3,
//           slidesToScroll: 1,
//         },
//       },
//       {
//         breakpoint: 768, // At 768px and above, show 3 products per slide
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 1,
//         },
//       },
//       {
//         breakpoint: 468, // At 480px and above, show 1 product per slide
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//         },
//       },
//     ],
//   };

//   return (
//     <BestOffersWrapper>
//       <Title>Best Offers</Title>
//       <Slider {...settings}>
//         {shuffleProducts.map((product) => (
//           <ProductCard key={product.id} product={product} />
//         ))}
//       </Slider>
//     </BestOffersWrapper>
//   );
// };

// export default BestOffers;

//////////////////
const BestOffers = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["discountedProducts"],
    queryFn: getDiscountedProducts,
  });
  const [shuffleProducts, setShuffleProducts] = useState([]);

  useEffect(() => {
    if (data) {
      const shuffled = [...data].sort(() => Math.random() - 0.5);
      setShuffleProducts(shuffled);
    }
  }, [data]);

  if (isLoading) return <Spinner />;
  if (error) return <p>Failed to load best selling products</p>;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    // autoplaySpeed: 100,
    responsive: [
      {
        breakpoint: 1024, // At 768px and above, show 3 products per slide
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // At 768px and above, show 3 products per slide
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 468, // At 480px and above, show 1 product per slide
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <BestOffersWrapper>
      <Title>Best Offers</Title>
      <Slider {...settings}>
        {shuffleProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            pathPrefix={product.pathPrefix} // Pass the pathPrefix here
          />
        ))}
      </Slider>
    </BestOffersWrapper>
  );
};

export default BestOffers;
