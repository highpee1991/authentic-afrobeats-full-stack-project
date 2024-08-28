import React, { createContext, useState } from "react";

export const BillingContext = createContext();

export const BillingProvider = ({ children }) => {
  const [billingDetails, setBillingDetails] = useState(null);

  return (
    <BillingContext.Provider value={{ billingDetails, setBillingDetails }}>
      {children}
    </BillingContext.Provider>
  );
};
