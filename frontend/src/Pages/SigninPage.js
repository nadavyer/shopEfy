import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'

const SigingPage = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const productDetails = useSelector(state => state.productDetails);
  const dispatch = useDispatch();

  useEffect(() => {
  }, []);

  const submitHandler = e => {
    e.preventDefault();


    setEmail('');
    setPassword('');
  }


  return (
    <div className="form">
      <form onSubmit={submitHandler}>
        <ul className="form-container">
          <li>
            <h3>Signin</h3>
          </li>
          <li>
            <label itemType="email">
              Email
            </label>
            <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}>
            </input>
          </li>
          <li>
            <label itemType="password">
              Password
            </label>
            <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)}>
            </input>
          </li>
          <li>
            <button type="submit" className="action-button">
              Signin
            </button>
          </li>
          <li>
            New to Amazona?
          </li>
          <li>
            <Link className="button full-width" to={"/register"}>
              Create your Amazon account
            </Link>
          </li>
        </ul>
      </form>
    </div>
  )
}

export default SigingPage;