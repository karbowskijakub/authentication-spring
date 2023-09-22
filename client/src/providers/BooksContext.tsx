import { createContext, useState } from "react";
import { BookModel } from "../models/BookModel";
import { ReviewModel } from "../models/ReviewModel";

type BooksContextType = {
  books: BookModel[];
  setBooks: (books: BookModel[]) => void;
  newBook: BookModel | null;
  setNewBook: (book: BookModel | null) => void;
  review: ReviewModel[];
  setReview: (review: ReviewModel[]) => void;
  totalStars: number;
  setTotalStars: (totalStars: number) => void;

};

const defaultBooksContextValue: BooksContextType = {
  books: [],
  setBooks: () => {
    console.warn("setBooks is not implemented");
  },
  newBook: null,
  setNewBook: () => {
    console.warn("setNewBook is not implemented");
  },
  review: [],
  setReview: () => {
    console.warn("setReview is not implemented");
  },
  totalStars: 0,
  setTotalStars: () => {
    console.warn("setReview is not implemented");
  },
};

export const BooksContext = createContext<BooksContextType>(
  defaultBooksContextValue
);

type BooksProviderProps = {
  children: React.ReactNode;
};

export const BooksProvider = ({ children }: BooksProviderProps) => {
  const [books, setBooks] = useState<BookModel[]>([]);
  const [newBook, setNewBook] = useState<BookModel | null>(null);
  const [review, setReview] = useState<ReviewModel[]>([]);
  const [totalStars,setTotalStars] = useState<number>(0);

  return (
    <BooksContext.Provider
      value={{ books, setBooks, newBook, setNewBook, review, setReview ,totalStars,setTotalStars}}
    >
      {children}
    </BooksContext.Provider>
  );
};
