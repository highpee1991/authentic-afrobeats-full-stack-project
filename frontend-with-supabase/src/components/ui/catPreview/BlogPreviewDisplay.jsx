import React from "react";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../Spinner";
import { getProduct } from "../../../api/apiGetProducts";
import BlogPreview from "../blog/BlogPreview";

const BlogPreviewDisplay = () => {
  const {
    data: blogs,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["BlogPosts"],
    queryFn: () => getProduct("blog_post"),
  });

  if (isLoading) return <Spinner />;

  if (error) return <p>Failed to load blogs</p>;

  return (
    <div>
      <BlogPreview title='Blog' blogs={blogs} categoryPath='/blog' limit={6} />
    </div>
  );
};

export default BlogPreviewDisplay;
