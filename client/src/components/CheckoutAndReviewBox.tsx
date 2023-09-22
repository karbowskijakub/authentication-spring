import { BookModel } from '../models/BookModel'
import { Link } from 'react-router-dom'

const CheckoutAndReviewBox = ({newBook,mobile}:{newBook:BookModel | null, mobile:boolean}) => {
  return (
<div className={mobile ? 'card d-flex mt-5' : 'card col-3 container d-flex mb-5'}>
            <div className='card-body container'>
                <div className='mt-3'>
                    <p>
                        <b>0 /5 </b>
                        books checked out
                    </p>
                    <hr />
                    {newBook && newBook.copiesAvailable && newBook.copiesAvailable > 0 ?
                        <h4 className='text-success'>
                            Available
                        </h4>
                        :
                        <h4 className='text-danger'>
                            Wait List
                        </h4>
                    }
                    <div className='row'>
                        <p className='col-6 lead'>
                            <b>{newBook?.copies} </b>
                            copies
                        </p>
                        <p className='col-6 lead'>
                            <b>{newBook?.copiesAvailable} </b>
                            available
                        </p>
                    </div>
                </div>
                <Link to='/#' className='btn btn-success btn-lg'>Sign in</Link>
                <hr />
                <p className='mt-3'>
                    This number can change until placing order has been complete.
                </p>
                <p>
                    This number can change until placing order has been complete.
                </p>

            </div>
        </div>
  )
}

export default CheckoutAndReviewBox