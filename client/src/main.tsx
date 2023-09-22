import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "../src/styles/styles.scss";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import { BooksProvider } from "./providers/BooksContext.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <BooksProvider>
          <App />
        </BooksProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
