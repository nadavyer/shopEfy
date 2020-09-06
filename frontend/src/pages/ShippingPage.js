import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {saveShipping} from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps'

const ShippingPage = (props) => {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const dispatch = useDispatch();

  const submitHandler = e => {
    e.preventDefault();
    dispatch(saveShipping({address, city, postalCode, country}))
    props.history.push('/payment');
  }

  return (
    <div>
      <CheckoutSteps step1 step2/>
      <div className="form">
        <form onSubmit={submitHandler}>
          <ul className="form-container">
            <li>
              <h2>Shipping</h2>
            </li>
            <li>
              <label htmlFor="address">
                Address
              </label>
              <input type="text" name="address" id="address" onChange={(e) => setAddress(e.target.value)}>
              </input>
            </li>
            <li>
              <label htmlFor="city">
                City
              </label>
              <input type="text" name="city" id="city" onChange={(e) => setCity(e.target.value)}>
              </input>
            </li>
            <li>
              <label htmlFor="postalcode">
                Postal Code
              </label>
              <input type="text" name="postalcode" id="postalcode" onChange={(e) => setPostalCode(e.target.value)}>
              </input>
            </li>
            <li>
              <label htmlFor="country">
                Country
              </label>
              <input type="text" name="postalcode" id="postalcode" onChange={(e) => setCountry(e.target.value)}>
              </input>
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

export default ShippingPage;