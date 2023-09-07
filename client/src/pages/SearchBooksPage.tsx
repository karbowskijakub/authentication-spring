import { useEffect, useContext,useState } from "react";
import { useQuery } from "react-query";
import { SpinnerLoading } from "../components/SpinnerLoading";
import SearchBook from "../components/SearchBook";
import { BooksContext } from "../providers/BooksContext";
import Pagination from "../components/Pagination";


const SearchBooksPage = () => {

const [currentPage,setCurrentPage] = useState(1);
const [booksPerPage] = useState(5);
const [totalAmountOfBooks, setTotalAmountOfBooks] = useState(0);
const [totalPages,setTotalPages] = useState(0);

  const { books, setBooks } = useContext(BooksContext);
  const BASE_URL = "http://localhost:8080/api/books";

  const { data, isLoading, error,  isFetching } = useQuery(["repoData", currentPage], () =>
    fetch(`${BASE_URL}?page=${currentPage-1}&size=${booksPerPage}`).then((res) => res.json())
  );

  useEffect(() => {
   

    data && (setBooks(data._embedded.books),


    setTotalAmountOfBooks(data.page.totalElements),
    setTotalPages(data.page.totalPages)

    );
    
  }, [data]);


  if (isLoading|| isFetching) {
    return <SpinnerLoading />;
  }

  if (error) {
    return `An error has occurred:${error}`;
  }

const indexOfLastBook: number = currentPage * booksPerPage;
const indexOfFirstBook: number = indexOfLastBook - booksPerPage;
let lastItem = booksPerPage * currentPage <= totalAmountOfBooks ? booksPerPage * currentPage: totalAmountOfBooks;

const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="container">
        <div>
          <div className="row mt-5">
            <div className="col-6">
              <div className="d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-labelledby="Search"
                />
                <button className="btn btn-outline-success">Search</button>
              </div>
            </div>
            <div className="col-4">
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Category
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li>
                    <a className="dropdown-item" href="#">
                      All
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Front End
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Back End
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Data
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      DevOps
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-3">
            <h5>Number of results: (22)</h5>
          </div>
          <p>1 to 5 of 22 items:</p>
          {books.map((book) => (
            <SearchBook book={book} key={book.id} />
          ))}
          {totalPages >1 && 
          <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate}/>
          }
        </div>
      </div>
    </div>
  );
};

export default SearchBooksPage;
