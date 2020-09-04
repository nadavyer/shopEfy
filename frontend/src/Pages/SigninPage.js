import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {signin} from '../actions/userActions'

const SigninPage = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const userSignin = useSelector(state => state.userSignin);
  const {loading, userInfo, error} = userSignin;
  const dispatch = useDispatch();

  useEffect(() => {
    if(userInfo) {
      props.history.push('/');
    }
  }, [userInfo]);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(signin(email, password))
  }


  return (
    <div className="form">
      <form onSubmit={submitHandler}>
        <ul className="form-container">
          <li>
            <h2>Sign-in</h2>
          </li>
          <li>
            {loading && <div>Loading...</div>}
            {error && <div>{error.message}</div>}
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
            <Link className="button secondary text-center" to={"/register"}>
              Create your Amazona account
            </Link>
          </li>
        </ul>
      </form>
    </div>
  )
}

export default SigninPage;