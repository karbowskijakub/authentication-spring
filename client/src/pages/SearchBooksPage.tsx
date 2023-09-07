
import { useEffect ,useContext} from 'react'
import { useQuery } from 'react-query'
import { SpinnerLoading } from '../utils/SpinnerLoading'
import SearchBook from '../components/SearchBook'
import { BooksContext } from '../providers/BooksContext'
const SearchBooksPage = () => {

    const {books, setBooks} = useContext(BooksContext)
    const BASE_URL = "http://localhost:8080/api/books";
  
    const { data, isLoading, error } = useQuery("repoData", () =>
      fetch(`${BASE_URL}?page=0&size=5`).then((res) => res.json())
    );
  
    useEffect(() => {
      data && setBooks(data._embedded.books);
    }, [data]);
  
    if (isLoading) {
      return (
  <SpinnerLoading/>
      );
    }
  
    if (error) {
      return `An error has occurred:${error}`;
    }



  return (
    <div>
    <div className='container'>
        <div>
            <div className='row mt-5'>
                <div className='col-6'>
                    <div className='d-flex'>
                        <input className='form-control me-2' type='search'
                            placeholder='Search' aria-labelledby='Search' />
                        <button className='btn btn-outline-success'
                          >
                            Search
                        </button>
                    </div>
                </div>
                <div className='col-4'>
                    <div className='dropdown'>
                        <button className='btn btn-secondary dropdown-toggle' type='button'
                            id='dropdownMenuButton1' data-bs-toggle='dropdown'
                            aria-expanded='false'>
                         Category
                        </button>
                        <ul className='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
                            <li >
                                <a className='dropdown-item' href='#'>
                                    All
                                </a>
                            </li>
                            <li >
                                <a className='dropdown-item' href='#'>
                                    Front End
                                </a>
                            </li>
                            <li >
                                <a className='dropdown-item' href='#'>
                                    Back End
                                </a>
                            </li>
                            <li >
                                <a className='dropdown-item' href='#'>
                                    Data
                                </a>
                            </li>
                            <li >
                                <a className='dropdown-item' href='#'>
                                    DevOps
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
          
                    <div className='mt-3'>
                        <h5>Number of results: (22)</h5>
                    </div>
                    <p>
                       1 to 5 of 22 items:
                    </p>
                    {books.map(book => (
                        <SearchBook book={book} key={book.id} />
                    ))}
                <div className='m-5'>
                    <h3>
                        Can't find what you are looking for?
                    </h3>
                    <a type='button' className='btn main-color btn-md px-4 me-md-2 fw-bold text-white'
                        href='#'>Library Services</a>
                </div>
        </div>
    </div>
</div>
  )
}

export default SearchBooksPage