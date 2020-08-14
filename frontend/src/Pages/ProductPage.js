import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {detailsProduct} from '../actions/actions'

const ProductPage = (props) => {
  const [qty, setQty] = useState(1);
  const productDetails = useSelector(state => state.productDetails);
  const dispatch = useDispatch();
  const {product, loading, error} = productDetails;
  console.log(productDetails);

  useEffect(() => {
    dispatch(detailsProduct(props.match.params.id));
  }, []);

  const handleAddToCart = () => {
    props.history.push(`/cart/${props.match.params.id}?qty=${qty}`)
  }

  return (
    loading ? <div>Loading...</div>
      : error ? <div>{error}</div> :
      <div>
        <div className="back-to-shop">
          <Link to="/">
            Back to shop
          </Link>
          <div className="details">
            <div className="details-image">
              <img src={product.image} alt="product"/>
            </div>
            <div className="details-info">
              <ul>
                <li key={"name"}>
                  <h4>{product.name}</h4>
                </li>
                <li>
                  {product.rating} starts ({product.numReviews} reviews)
                </li>
                <li key={"price"}>
                  Price: <b>${product.price}</b>
                </li>
                <li key={"description"}>
                  Description:
                  <div>
                    {product.description}
                  </div>
                </li>
              </ul>
            </div>
            <div className="details-action">
              <ul>
                <li>
                  Price: {product.price}
                </li>
                <li>
                  Status: {product.status}
                </li>
                <li>
                  Qty: <select value={qty} onChange={(e) => {
                  setQty(e.target.value)
                }}>
                  {[...Array(product.countInStock).keys()].map(qtyOption =>
                    <option key={qtyOption} value={qtyOption + 1}>{qtyOption + 1}</option>
                  )}
                </select>
                </li>
                <li>
                  {product.countInStock > 0
                    ? <button onClick={handleAddToCart} className="action-button">Add to cart</button>
                    : <div>Out of stock.</div>}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
  )
}

export default ProductPage;