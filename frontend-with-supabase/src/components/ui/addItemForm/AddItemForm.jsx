import React, { useState } from "react";
import Modal from "./Modal";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddItem } from "../../../api/apiInsert";
import { toast } from "react-toastify";

const FormField = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;

  label {
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  input,
  textarea {
    padding: 0.75rem;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 1rem;
  }

  textarea {
    resize: vertical;
    min-height: 100px;
  }

  &&::file-selector-button {
    font: inherit;
    font-weight: 500;
    padding: 0.8rem 1.2rem;
    margin-right: 1.3rem;
    border-radius: var(--border-radius-sm);
    border: none;
    color: var(--color-brand-50);
    background-color: var(--color-brand-600);
    cursor: pointer;
    transition: color 0.2s, background-color 0.2s;

    &:hover {
      background-color: var(--color-brand-700);
    }
  }
`;

const Button = styled.button`
  padding: 0.75rem 2rem;
  background-color: ${(props) =>
    props.cancel ? "#ccc" : "var(--color-brand-700)"};
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  margin-right: 1rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) =>
      props.cancel ? "#aaa" : "var(--color-brand-800)"};
  }
`;

const AddItemForm = ({ table, querykey }) => {
  const { register, handleSubmit, reset } = useForm();
  const [isModalOpen, setModalOpen] = useState(false);

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: (item) => AddItem(table, item),
    onSuccess: () => {
      toast.success("Item added succesfully");
      queryClient.invalidateQueries({ queryKey: querykey });
      setModalOpen(false);
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  const onSubmit = (data) => {
    mutate({ ...data, img1: data.img1[0], img2: data.img2[0] });
  };

  const handleCancel = () => {
    setModalOpen(false);
    reset();
  };

  return (
    <>
      <button onClick={() => setModalOpen(true)}>Add Item</button>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormField>
            <label htmlFor='name'>Item Name</label>
            <input type='text' id='name' {...register("name")} />
          </FormField>

          <FormField>
            <label htmlFor='description_header'>Description Header</label>
            <input
              type='text'
              id='description_header'
              {...register("description_header")}
            />
          </FormField>

          <FormField>
            <label htmlFor='description'>Description</label>
            <textarea id='description' {...register("description")} />
          </FormField>

          <FormField>
            <label htmlFor='price'>Price</label>
            <input
              type='number'
              id='price'
              {...register("price")}
              step='0.01' // Allows decimal numbers
            />
          </FormField>

          <FormField>
            <label htmlFor='discount_price'>Discounted Price</label>
            <input
              type='number'
              id='discount_price'
              {...register("discount_price")}
              step='0.01' // Allows decimal numbers
            />
          </FormField>

          <FormField>
            <label htmlFor='img1'>Image 1</label>
            <input type='file' id='img1' {...register("img1")} />
          </FormField>

          <FormField>
            <label htmlFor='img2'>Image 2</label>
            <input type='file' id='img2' {...register("img2")} />
          </FormField>

          <FormField>
            <label htmlFor='size'>Size</label>
            <input type='text' id='size' {...register("size")} />
          </FormField>

          <Button type='button' cancel onClick={handleCancel}>
            Cancel
          </Button>
          <Button type='submit' disabled={isLoading}>
            Add Item
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default AddItemForm;
