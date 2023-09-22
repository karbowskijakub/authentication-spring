import Navbar from "./layouts/Navbar";
import { Footer } from "./layouts/Footer";
import HomePage from "./pages/HomePage";
import SearchBooksPage from "./pages/SearchBooksPage";
import { Route, Routes } from "react-router-dom";
import BookCheckoutPage from "./pages/BookCheckoutPage";

const App = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <div className="flex-grow-1">
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/search" element={<SearchBooksPage />} />
          <Route path="/checkout/:bookId" element={<BookCheckoutPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
