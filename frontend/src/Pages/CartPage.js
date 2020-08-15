import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {addToCart} from '../actions/cartActions'
import {Link} from 'react-router-dom'

const CartPage = (props) => {
  const productId = props.match.params.id;
  const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1;
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const {cartItems} = cart;
  useEffect((() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }), []);

  return (
    <div className="cart">
      <div className="cart-list">
        <ul className="cart-list-container">
          <li>
            <h3>
              Shopping cart
            </h3>
            <div>
              Price
            </div>
          </li>
          {
            cartItems.length === 0 ?
              <div>
                Cart is empty
              </div>
              :
              cartItems.map(cartItem =>
                <li>
                  <div className="cart-image">
                    <img src={cartItem.image} alt="product"/>
                  </div>
                  <div className="cart-name">
                    <div>
                      <Link to={`/product/${cartItem.productId}`}>
                        {cartItem.name}
                      </Link>
                    </div>
                    Qty:
                    <select>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </select>
                  </div>
                  <div className="cart-price">
                    ${cartItem.price}
                  </div>
                </li>
              )}
        </ul>
      </div>
      <div className="cart-action">
        <h3>
          Subtotal ( {cartItems.reduce((a, b) => a + b.qty, 0)} items )
          :
          ${cartItems.reduce((a, b) => a + b.price * b.qty, 0)}
        </h3>
        <button className="action-button" disabled={cartItems.length === 0}>
          Proceed to checkout
        </button>
      </div>
    </div>
  )
}

export default CartPage;