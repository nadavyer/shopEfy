import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {register} from '../actions/userActions'

const RegisterPage = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const userRegister = useSelector(state => state.userRegister);
  const {loading, userInfo, error} = userRegister;
  const dispatch = useDispatch();
  const redirect = props.location.search ? props.location.search.split('=')[1] : '/';


  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [userInfo, props.history, redirect]);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(register(name, email, password, rePassword))
  }


  return (
    <div className="form">
      <form onSubmit={submitHandler}>
        <ul className="form-container">
          <li>
            <h2>Create account</h2>
          </li>
          <li>
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
          </li>
          <li>
            <label htmlFor="name">
              Name
            </label>
            <input type="name" name="name" id="name" onChange={(e) => setName(e.target.value)}>
            </input>
          </li>
          <li>
            <label htmlFor="email">
              Email
            </label>
            <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}>
            </input>
          </li>
          <li>
            <label htmlFor="password">
              Password
            </label>
            <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)}>
            </input>
          </li>
          <li>
            <label htmlFor="rePassword">
              Re-enter password
            </label>
            <input type="password" name="password" id="password" onChange={(e) => setRePassword(e.target.value)}>
            </input>
          </li>
          <li>
            <button type="submit" className="action-button">
              Register
            </button>
          </li>
          <li>
            <Link to={redirect === '/' ? 'signin' : `register?redirect=${redirect}`} className="button secondary text-center" >
              Already have an account?
            </Link>
          </li>
        </ul>
      </form>
    </div>
  )
}

export default RegisterPage;