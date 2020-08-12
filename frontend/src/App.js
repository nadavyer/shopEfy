import React from 'react';
import './App.css';
import {BrowserRouter, Link, Route} from 'react-router-dom';
import HomePage from './Pages/HomePage';
import ProductPage from './Pages/ProductPage';

const App = () => {
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
            <Link to="/"> ShopEfy </Link>
          </div>
          <div className="header-links">
            <Link to="/">Cart</Link>
            <Link to="/">Sign in</Link>
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
            <Route path="/products/:id" component={ProductPage}/>
            <Route path="/" exact={true} component={HomePage}/>
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
