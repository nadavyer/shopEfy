import React from 'react'
import data from '../data'
import {Link} from 'react-router-dom'

const HomePage = () => {
  return (
    <div>
      <ul className="products">
        {data.products.map(product =>
          <li key={product.__id}>
            <div className="product">
              <Link to={`/products/${product.__id}`}>
                <img className="product-image" src={product.image} alt="product"/>
              </Link>
              <div className="product-name">
                <Link to={`/products/${product.__id}`}>{product.name}</Link>
              </div>
              <div className="product-brand">{product.brand}</div>
              <div className="product-price">${product.price}</div>
              <div className="product-rating">{product.rating} stars ({product.numReviews} reviews)</div>
            </div>
          </li>
        )}
      </ul>
    </div>
  )
}

export default HomePage;