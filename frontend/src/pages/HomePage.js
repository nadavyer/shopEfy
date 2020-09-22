import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import {listProducts} from '../actions/productActions'

const HomePage = (props) => {
  const category = props.match.params.id ? props.math.params.id : '';
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const productList = useSelector(state => state.productList);
  const {products, loading, error} = productList;
  const dispatch = useDispatch();

  const submitHandler = e => {
    e.preventDefault();
    dispatch(listProducts(category, searchKeyword, sortOrder));
  }

  const sortHandler = e => {
    e.preventDefault();
    setSortOrder(e.target.value);
    dispatch(listProducts(category, searchKeyword, sortOrder))
  }

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <div className="content">
      {category &&
      <h2>{category}</h2>
      }
      <ul className="filter">
        <li>
          <form onSubmit={submitHandler}>
            <input name="searchKeyword" onChange={e => setSearchKeyword(e.target.value)}/>
            <button type="submit">Search</button>
          </form>
        </li>
        <li>
          Sort By {' '}
          <select name="sortOrder" onChange={sortHandler}>
            <option value=''>Newest</option>
            <option value='lowest'>Lowest</option>
            <option value='highest'>Highest</option>
          </select>
        </li>
      </ul>
      {loading ? <div>Loading...</div>
        : error ? <div>{error}</div> :
          <ul className="products">
            {products.map(product =>
              <li key={product.id}>
                <div className="product">
                  <Link classname="img-link" to={`/products/${product.id}`}>
                    <img className="product-image" src={product.image} alt="product"/>
                  </Link>
                  <div className="product-name">
                    <Link to={`/products/${product.id}`}>{product.name}</Link>
                  </div>
                  <div className="product-brand">Brand: {product.brand}</div>
                  <div className="product-price">Price: ${product.price}</div>
                  <div className="product-rating">{product.rating} stars ({product.numReviews} reviews)</div>
                </div>
              </li>
            )}
          </ul>
      }
    </div>
  )
}

export default HomePage;