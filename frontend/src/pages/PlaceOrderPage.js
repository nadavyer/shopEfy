import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import {createOrder} from '../actions/orderActions'


const PlaceOrderPage = (props) => {
  const cart = useSelector(state => state.cart);
  const {cartItems, shipping, payment} = cart;
  const orderCreate = useSelector(state => state.orderCreate);
  const dispatch = useDispatch();
  const {loading, success, error, order} = orderCreate;


  if (!shipping.address || !shipping.country || !shipping.city || !shipping.postalCode) {
    props.history.push('/shipping');
  } else if (!payment.paymentMethod) {
    props.history.push('/payment');
  }

  const itemsPrice = cartItems.reduce((a,c) => a + c.price * c.qty, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = 0.18 * itemsPrice;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const placeOrderHandler = () => {
    dispatch(createOrder({
      orderItems: cartItems, shipping, payment, itemsPrice, shippingPrice, taxPrice, totalPrice}));
  }

  useEffect(() => {
    if (success) {
      props.history.push(`/order/${order.id}`)
    }
  }, [success, props.history]);

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4/>
      <div className="placeorder">
        <div className="placeorder-info">
          <div>
            <h3> Shipping
            </h3>
            <div>
              {cart.shipping.address}, {cart.shipping.city}, {cart.shipping.postalCode}, {cart.shipping.country}
            </div>
          </div>
          <div>
            <h3> Payment
            </h3>
            <div>
              Payment Method: {cart.payment.paymentMethod}
            </div>
          </div>
          <div>
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
                    <li key={cartItem.product}>
                      <div className="cart-image">
                        <img src={cartItem.image} alt="product"/>
                      </div>
                      <div className="cart-name">
                        <div>
                          <Link to={`/product/${cartItem.product}`}>
                            {cartItem.name}
                          </Link>
                        </div>
                        Qty: {cartItem.qty}
                      </div>
                      <div className="cart-price">
                        ${cartItem.price}
                      </div>
                    </li>
                  )}
            </ul>
          </div>
        </div>
        <div className="placeorder-action">
          <ul>
            <li>
              <button  className="button primary full-width" onClick={placeOrderHandler}> Place Order </button>
            </li>
            <li>
              <h3>
                Order Summary
              </h3>
            </li>
            <li>
              <div>
                Items
              </div>
              <div>
                ${itemsPrice}
              </div>
            </li>
            <li>
              <div>
                Shipping
              </div>
              <div>
                ${shippingPrice}
              </div>
            </li>
            <li>
              <div>
                Tax
              </div>
              <div>
                ${taxPrice}
              </div>
            </li>
            <li>
              <div>
                Order Total
              </div>
              <div>
                ${totalPrice}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrderPage;