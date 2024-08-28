import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { toast } from "react-toastify";
import { FaArrowLeft } from "react-icons/fa6";
import { getItemById } from "../../../api/apiGetItemById";
import Spinner from "../Spinner";

const BlogDetailsWrapper = styled.div`
  padding: 2rem;
  max-width: 900px;
  margin: auto;
`;

const ImageDescription = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const MainImage = styled.img`
  width: 100%;
  max-width: 500px;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
  object-fit: cover;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    margin-bottom: 0;
  }
`;

const ProductInfo = styled.div`
  margin-top: 2rem;
  flex: 1;

  h2 {
    font-size: 1.8rem;
    color: var(--color-brand-800);
    margin-top: 1.5rem;
  }

  p {
    font-size: 1.2rem;
    color: var(--color-grey-800);
    line-height: 1.6;
    margin-bottom: 1rem;
  }
`;

const BackButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: var(--border-radius-md);
  background-color: var(--color-brand-600);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;

  &:hover {
    background-color: var(--color-brand-700);
  }

  svg {
    font-size: 1.2rem;
  }
`;
const SubImageWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 2rem;
`;

const SubImage = styled.img`
  width: 100%;
  max-width: 200px;
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sm);
  object-fit: cover;
`;

const SemiConclusionWrapper = styled.div`
  margin-top: 3rem;
  padding: 1rem;
  background-color: var(--color-grey-100);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sm);
`;

const SemiContects = styled.div`
  margin-top: 1rem;

  p {
    margin-bottom: 0.5rem;
    &:before {
      content: "• ";
      color: var(--color-brand-600);
    }
  }
`;

const BlogDetails = () => {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useQuery({
    queryKey: ["blog", blogId],
    queryFn: () => getItemById("blog_post", blogId),
  });

  if (isLoading) return <Spinner />;

  if (error) {
    toast.error("Failed to load blog details");
    return null;
  }

  const {
    name,
    short_introduction,
    title1,
    title2,
    title3,
    title4,
    title5,
    title6,
    title7,
    img1,
    img2,
    description1,
    description2,
    description3,
    description4,
    description5,
    description6,
    description7,
    semi_conclusion_topic,
    semi_conclusion_text,
    semi_conclusion_point1,
    semi_conclusion_point2,
    semi_conclusion_point3,
    conclusion,
  } = data || {};

  return (
    <BlogDetailsWrapper>
      <div>
        <BackButton onClick={() => navigate(-1)}>
          <FaArrowLeft />
          <span>Back</span>
        </BackButton>
        {name && <h1>{name}</h1>}
        <ImageDescription>
          {img1 && <MainImage src={img1} alt={name} />}
          {short_introduction && <p>{short_introduction}</p>}
        </ImageDescription>
      </div>
      <ProductInfo>
        {title1 && <h2>{title1}</h2>}
        {description1 && <p>{description1}</p>}

        {title2 && <h2>{title2}</h2>}
        {description2 && <p>{description2}</p>}

        {title3 && <h2>{title3}</h2>}
        {description3 && <p>{description3}</p>}

        {title4 && <h2>{title4}</h2>}
        {description4 && <p>{description4}</p>}

        <SubImageWrapper>
          {img2 && <SubImage src={img2} alt={name} />}
          {title5 && <h2>{title5}</h2>}
          {description5 && <p>{description5}</p>}
        </SubImageWrapper>

        {title6 && <h2>{title6}</h2>}
        {description6 && <p>{description6}</p>}

        {title7 && <h2>{title7}</h2>}
        {description7 && <p>{description7}</p>}

        <SemiConclusionWrapper>
          {semi_conclusion_topic && <h2>{semi_conclusion_topic}</h2>}
          {semi_conclusion_text && <p>{semi_conclusion_text}</p>}
          <SemiContects>
            {semi_conclusion_point1 && <p>{semi_conclusion_point1}</p>}
            {semi_conclusion_point2 && <p>{semi_conclusion_point2}</p>}
            {semi_conclusion_point3 && <p>{semi_conclusion_point3}</p>}
          </SemiContects>
        </SemiConclusionWrapper>

        {conclusion && (
          <>
            <h2>Conclusion</h2>
            <p>{conclusion}</p>
          </>
        )}
      </ProductInfo>
    </BlogDetailsWrapper>
  );
};

export default BlogDetails;
