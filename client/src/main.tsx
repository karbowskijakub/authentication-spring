import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "../src/styles/styles.scss";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import { BooksProvider } from "./providers/BooksContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <BooksProvider>
        <App />
      </BooksProvider>
    </BrowserRouter>
  </React.StrictMode>
);
