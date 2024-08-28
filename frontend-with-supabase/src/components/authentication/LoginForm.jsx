import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* height: 100vh; */
  background-color: #f7f9fc;
`;

const Form = styled.form`
  background: #ffffff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
`;

const Title = styled.h2`
  margin-bottom: 1.5rem;
  text-align: center;
  color: #333333;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #dcdcdc;
  border-radius: 5px;
  font-size: 1rem;
  color: #333333;

  &:focus {
    border-color: var(--color-brand-700);
    outline: none;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: -0.5rem;
  margin-bottom: 1rem;
  font-size: 0.875rem;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: var(--color-brand-700);
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--color-brand-800);
  }
`;

const LoginForm = ({ onLogin, error }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    onLogin(data.email, data.password);
  };

  return (
    <FormWrapper>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Title>Login</Title>

        <Input
          type='email'
          placeholder='Email'
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
              message: "Please enter a valid email address",
            },
          })}
        />
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}

        <Input
          type='password'
          placeholder='Password'
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters long",
            },
          })}
        />
        {errors.password && (
          <ErrorMessage>{errors.password.message}</ErrorMessage>
        )}

        <Button type='submit'>Login</Button>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </Form>
    </FormWrapper>
  );
};

export default LoginForm;
