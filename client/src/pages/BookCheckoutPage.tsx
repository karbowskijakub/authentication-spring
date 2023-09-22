import { useEffect, useContext} from "react";
import { useQuery } from "react-query";
import { SpinnerLoading } from "../components/SpinnerLoading";
import { BooksContext } from "../providers/BooksContext";
import Images from "../images/Images";
import StarsReview from "../components/StarsReview";
import CheckoutAndReviewBox from "../components/CheckoutAndReviewBox";
import LatestReviews from "../components/LatestReviews";

const BookCheckoutPage = () => {

  const bookId = window.location.pathname.split("/")[2];
  const { newBook, setNewBook, review,setReview,totalStars} = useContext(BooksContext);



  const BASE_URL = `http://localhost:8080/api/books/${bookId}`;
  const REVIEW_URL = `http://localhost:8080/api/reviews/search/findByBookId?bookId=${bookId}`;

  const { data, isLoading, error } = useQuery("bookData", () =>
    fetch(BASE_URL).then((res) => res.json())
  );

  const { data:reviewData, isLoading:isReviewLoading, error:errorReview } = useQuery("reviewData", () =>
    fetch(REVIEW_URL).then((res) => res.json())
  );

  useEffect(() => {
    data && setNewBook(data);
  }, [data]);

  useEffect(() => {
    reviewData && setReview(reviewData._embedded.reviews)

  }, [reviewData]);  

  if (isLoading || isReviewLoading) {
    return <SpinnerLoading />;
  }

  if (error||errorReview) {
    return `An error has occurred:${error}`;
  }


  return (
    <div>
      <div className="container d-none d-lg-block">
        <div className="row mt-5">
          <div className="col-sm-2 col-md-2">
            {newBook?.img ? (
              <img src={newBook?.img} width="226" height="349" alt="Book" />
            ) : (
              <img src={Images.image1} width="123" height="196" alt="Book" />
            )}
          </div>
          <div className="col-4 col-md-4 container">
            <div className="ml-2">
              <h2>{newBook?.title}</h2>
              <h5 className="text-primary">{newBook?.author}</h5>
              <p className="lead">{newBook?.description}</p>
              <StarsReview rating={totalStars} size={32} />
            </div>
          </div>
          <CheckoutAndReviewBox newBook={newBook} mobile={false} />
        </div>
        <hr />
         <LatestReviews review={review} bookId={newBook?.id} mobile={false} /> 
      </div>
      <div className="container d-lg-none mt-5">
        <div className="d-flex justify-content-center alighn-items-center">
          {newBook?.img ? (
            <img src={newBook?.img} width="226" height="349" alt="Book" />
          ) : (
            <img src={Images.image1} width="123" height="196" alt="Book" />
          )}
        </div>
        <div className="mt-4">
          <div className="ml-2">
            <h2>{newBook?.title}</h2>
            <h5 className="text-primary">{newBook?.author}</h5>
            <p className="lead">{newBook?.description}</p>
            {/* <StarsReview rating={totalStars} size={32} /> */}
          </div>
        </div>
        <CheckoutAndReviewBox newBook={newBook} mobile={true} />
        <hr />
        <LatestReviews review={review} bookId={newBook?.id} mobile={true}  /> 
      </div>
    </div>
  );
};

export default BookCheckoutPage;
