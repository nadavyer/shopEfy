import React from 'react';
import './App.css';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';
import HomePage from './Pages/HomePage';
import SigningPage from './Pages/SigninPage'
import ProductPage from './Pages/ProductPage';
import CartPage from './Pages/CartPage'
import RegisterPage from './Pages/RegisterPage'
import ProductsPage from './Pages/ProductsPage'
import {useSelector} from 'react-redux'

const App = () => {

  const userSignin = useSelector(state => state.userSignin);
  const {userInfo} = userSignin;
  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  }

  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
  }

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <button className="burger-button" onClick={openMenu}>
              &#9776;
            </button>
            <Link to="/">Amoazona</Link>
          </div>
          <div className="header-links">
            <Link to="/cart/">Cart</Link>
            {
              userInfo
                ? <Link to="/profile">{userInfo.name}</Link>
                : <Link to="/signin">Sign in</Link>
            }

          </div>
        </header>
        <aside className="sidebar">
          <h3>Shopping categories</h3>
          <button className="sidebar-close-button" onClick={closeMenu}>x</button>
          <ul>
            <li key="1">
              <a href="index.html">Shirts</a>
            </li>
            <li key="2">
              <a href="index.html">Pants</a>
            </li>
            <li key="3">
              <a href="index.html">Shoes</a>
            </li>
          </ul>
        </aside>
        <main className="main">
          <div className="content">
            <Switch>
              <Route path="/signin" component={SigningPage}/>
              <Route path="/register" component={RegisterPage}/>
              <Route path="/products/:id" component={ProductPage}/>
              <Route path="/products" component={ProductsPage}/>
              <Route path="/cart/:id?" component={CartPage}/>
              <Route path="/" exact={true} component={HomePage}/>
            </Switch>
          </div>
        </main>
        <footer className="footer">
          All rights reserved.
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
