import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {savePayment} from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

const PaymentPage = (props) => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const dispatch = useDispatch();


  const submitHandler = e => {
    e.preventDefault();
    dispatch(savePayment({paymentMethod}));
    props.history.push('/placeorder');
  }


  return (
    <div>
      <CheckoutSteps step1 step2 step3/>
      <div className="form">
        <form onSubmit={submitHandler}>
          <ul className="form-container">
            <li>
              <h2>Payment</h2>
            </li>
            <li>
              <label htmlFor="paymentMethod">
                <input type="radio" name="paymentMethod" id="paymentMethod" value="Paypal"
                       onChange={(e) => setPaymentMethod(e.target.value)}>
                </input>
                Paypal
              </label>
            </li>
            <li>
              <button type="submit" className="action-button">
                Continue
              </button>
            </li>
          </ul>
        </form>
      </div>
    </div>
  )
}

export default PaymentPage;