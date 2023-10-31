import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { ToastContainer } from "react-toastify";
import { ContextProvider } from "./utils/context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ContextProvider>
      <App />
      <ToastContainer
        position="top-right"
        autoClose={500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </ContextProvider>
  </React.StrictMode>
);
