import { createContext, useState } from "react";
import { BookModel } from "../models/BookModel";


type BooksContextType = {
    books: BookModel[];
    setBooks: (books: BookModel[]) => void;
  };
  
  const defaultBooksContextValue: BooksContextType = {
    books: [],
    setBooks: () => {
      console.warn("setBooks is not implemented");
    },
  };
  
  export const BooksContext = createContext<BooksContextType>(defaultBooksContextValue);


type BooksProviderProps = {
  children: React.ReactNode;
};

export const BooksProvider = ({ children }: BooksProviderProps) => {
  const [books, setBooks] = useState<BookModel[]>([]);
  return (
    <BooksContext.Provider value={{ books, setBooks }}>
      {children}
    </BooksContext.Provider>
  );
};


