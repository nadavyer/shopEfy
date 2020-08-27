import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import {listProducts} from '../actions/productActions'

const HomePage = () => {
  const productList = useSelector(state => state.productList);
  const {products, loading, error} = productList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts());
  }, []);

  return (
    loading ? <div>Loading...</div>
      : error ? <div>{error}</div> :
      <ul className="products">
        {products.map(product =>
          <li key={product.__id}>
            <div className="product">
              <Link to={`/products/${product.__id}`}>
                <img className="product-image" src={product.image} alt="product"/>
              </Link>
              <div className="product-name">
                <Link to={`/products/${product.__id}`}>{product.name}</Link>
              </div>
              <div className="product-brand">Brand: {product.brand}</div>
              <div className="product-price">Price: ${product.price}</div>
              <div className="product-rating">{product.rating} stars ({product.numReviews} reviews)</div>
            </div>
          </li>
        )}
      </ul>
  )
}

export default HomePage;