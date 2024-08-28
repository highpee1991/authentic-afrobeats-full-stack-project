import React, { createContext, useContext, useEffect, useReducer } from "react";
import { CART_TIMESTAMP_KEY } from "../ui/cart/CartConst";

const CartContext = createContext();

const CART_STORAGE_KEY = "cartItems";

const initialState = {
  items: [],
  deliveryOption: "pickup",
  deliveryCost: 0,
  deliveryAddress: "",
  deliveryPhoneNumber: "",
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      const itemExists = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (itemExists) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
          items: [
            ...state.items,
            {
              ...action.payload,
              quantity: 1,
            },
          ],
        };
      }
    case "UPDATE_QUANTITY":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.max(action.payload.quantity, 1) }
            : item
        ),
      };
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };
    case "CLEAR_CART":
      localStorage.removeItem(CART_STORAGE_KEY);
      localStorage.removeItem(CART_TIMESTAMP_KEY);
      return {
        ...state,
        items: [],
      };
    case "SET_DELIVERY_OPTION":
      return { ...state, deliveryOption: action.payload };
    case "SET_DELIVERY_COST":
      return { ...state, deliveryCost: action.payload };
    case "LOAD_CART":
      return {
        ...state,
        items: action.payload,
      };
    case "SET_DELIVERY_ADDRESS":
      return { ...state, deliveryAddress: action.payload };
    case "SET_DELIVERY_PHONE":
      return { ...state, deliveryPhoneNumber: action.payload };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState, (initial) => {
    const savedCart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY));
    return savedCart ? { ...initial, items: savedCart } : initial;
  });

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
  }, [state.items]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
