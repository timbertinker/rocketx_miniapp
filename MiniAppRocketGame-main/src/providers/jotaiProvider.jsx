import React from "react";
import { Provider as JotaiProvider } from "jotai";

const Provider = ({ children }) => {
  return <JotaiProvider>{children}</JotaiProvider>;
};

export default Provider;
