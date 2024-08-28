import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { CartProvider } from "./components/context/CartContext.jsx";
import { UserProvider } from "./components/context/userContext.jsx";
import { BillingProvider } from "./components/ui/billingContext/BillingContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      <UserProvider>
        <BillingProvider>
          <App />
        </BillingProvider>
      </UserProvider>
    </CartProvider>
  </React.StrictMode>
);
