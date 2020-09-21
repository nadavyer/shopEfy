import React, {useEffect, useState} from 'react';
import {logout, update} from '../actions/userActions';
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {listMyOrders} from '../actions/orderActions'

const ProfilePage = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const userSignin = useSelector(state => state.userSignin);
  const {userInfo} = userSignin;
  const userUpdate = useSelector(state => state.userUpdate);
  const {loading, success, error} = userUpdate

  const handleLogout = () => {
    dispatch(logout());
    props.history.push('/signin');
  }

  const submitHandler = e => {
    e.preventDefault();
    dispatch(update({userId: userInfo.id, name, email, password}))
  }

  const myOrderList = useSelector(state => state.myOrderList);
  const {loading: loadinMyOrders, orders, error: errorOrders} = myOrderList;

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setPassword(userInfo.password);
      setEmail(userInfo.email);
    }
    dispatch(listMyOrders())
  }, [dispatch, userInfo])

  return <div className="profile">
    <div className="profile-info">
      <div className="form">
        <form onSubmit={submitHandler}>
          <ul className="form-container">
            <li>
              <h2>User Profile</h2>
            </li>
            <li>
              {loading && <div>Loading...</div>}
              {error && <div>{error}</div>}
            </li>
            <li>
              <label htmlFor="name">
                Name
              </label>
              <input type="name" name="name" id="name" value={name || ''} onChange={(e) => setName(e.target.value)}>
              </input>
            </li>
            <li>
              <label htmlFor="email">
                Email
              </label>
              <input type="email" name="email" id="email" value={email || ''}
                     onChange={(e) => setEmail(e.target.value)}>
              </input>
            </li>
            <li>
              <label htmlFor="password">
                Password
              </label>
              <input type="password" name="password" id="password" value={password || ''}
                     onChange={(e) => setPassword(e.target.value)}>
              </input>
            </li>
            <li>
              <button type="submit" className="action-button">
                Update
              </button>
            </li>
            <li>
              <button type="button" className="button secondary full-width" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </form>
      </div>
    </div>
    <div className="profile-orders content-margined">
      {
        loadinMyOrders ? <div>Loading...</div> :
          errorOrders ? <div>{errorOrders}</div> :
            <table className="table">
              <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Total</th>
                <th>Paid</th>
                <th>Actions</th>
              </tr>
              </thead>
              <tbody>
              {orders.map(order => <tr key={order.id}>
                {console.log(order)}
                  <td>{order.id}</td>
                  <td>{order.createdAt}</td>
                  <td>{order.totalPrice}</td>
                  <td>{order.isPaid ? 'Yes' : 'No'}</td>
                  <td><Link to={`/order/${order.id}`}>
                    Details
                  </Link></td>
                </tr>
              )}
              </tbody>
            </table>
      }
    </div>
  </div>
}

export default ProfilePage;