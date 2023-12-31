import { useEffect, useContext, useState } from "react";
import { useQuery } from "react-query";
import { SpinnerLoading } from "../components/SpinnerLoading";
import SearchBook from "../components/SearchBook";
import { BooksContext } from "../providers/BooksContext";
import Pagination from "../components/Pagination";

const SearchBooksPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(5);
  const [totalAmountOfBooks, setTotalAmountOfBooks] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");
  const [searchUrl, setSearchUrl] = useState("");
const [categorySelection, setCategorySelection] = useState('Book category')


  const { books, setBooks } = useContext(BooksContext);
  const BASE_URL = "http://localhost:8080/api/books";

  let url: string = "";

  if (searchUrl === '') {
    url = `${BASE_URL}?page=${currentPage - 1}&size=${booksPerPage}`;
       } else {
          var searchWithPage = searchUrl.replace('<pageNumber>', `${currentPage - 1}`)
          url = BASE_URL + searchWithPage;
       } 

  const { data, isLoading, error, isFetching } = useQuery(
    ["repoData", currentPage, searchUrl],
    () => fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    data &&
      (setBooks(data._embedded.books),
      setTotalAmountOfBooks(data.page.totalElements),
      setTotalPages(data.page.totalPages));
  }, [data]);

  if (isLoading || isFetching) {
    return <SpinnerLoading />;
  }

  if (error) {
    return `An error has occurred:${error}`;
  }

  const searchHandleChange = () => {
    setCurrentPage(1)
    if (search === '') {
        setSearchUrl('');
    } else {
        setSearchUrl(`/search/findByTitleContaining?title=${search}&page=<pageNumber>&size=${booksPerPage}`)
    }
    setCategorySelection('Book category');
}

const categoryField = (value: string) => {
  setCurrentPage(1)
  if (value.toLowerCase() === 'fe' || value.toLowerCase() === 'be' || value.toLowerCase() === 'data' || value.toLowerCase() === 'devops') {
      setCategorySelection(value);
      setSearchUrl(`/search/findByCategory?category=${value}&page=<pageNumber>&size=${booksPerPage}`)
  } else {
      setCategorySelection('All');
      setSearchUrl(`?page=<pageNumber>&size=${booksPerPage}`);
  }
}

  const indexOfLastBook: number = currentPage * booksPerPage;
  const indexOfFirstBook: number = indexOfLastBook - booksPerPage;
  let lastItem =
    booksPerPage * currentPage <= totalAmountOfBooks
      ? booksPerPage * currentPage
      : totalAmountOfBooks;

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
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button
                  className="btn btn-outline-success"
                  onClick={searchHandleChange}
                >
                  Search
                </button>
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
                  {categorySelection}
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li onClick={()=> categoryField('All')}>
                    <a className="dropdown-item" href="#">
                      All
                    </a>
                  </li>
                  <li onClick={()=> categoryField('FE')}>
                    <a className="dropdown-item" href="#">
                      Front End
                    </a>
                  </li>
                  <li onClick={()=> categoryField('BE')}>
                    <a className="dropdown-item" href="#">
                      Back End
                    </a>
                  </li>
                  <li onClick={()=> categoryField('Data')}>
                    <a className="dropdown-item" href="#">
                      Data
                    </a>
                  </li>
                  <li onClick={()=> categoryField('DevOps')}>
                    <a className="dropdown-item" href="#">
                      DevOps
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {totalAmountOfBooks > 0 ? (
            <>
              <div className="mt-3">
                <h5>Number of results: ({totalAmountOfBooks})</h5>
              </div>
              <p>
                {indexOfFirstBook + 1} to {lastItem} of {totalAmountOfBooks}{" "}
                items:
              </p>
              {books.map((book) => (
                <SearchBook book={book} key={book.id} />
              ))}
            </>
          ) : (
            <div className="m-5">
              <h3>Can't find what you are looking for?</h3>
              <a
                type="button"
                className="btn main-color btn-md px-4 me-md-2 fw-bold text-white"
                href="#"
              >
                Library Services
              </a>
            </div>
          )}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              paginate={paginate}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBooksPage;
