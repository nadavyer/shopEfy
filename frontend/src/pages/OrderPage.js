import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {detailsOrder, payOrder} from '../actions/orderActions'
import PaypalButton from '../components/PaypalButton'

const OrderPage = (props) => {
  const dispatch = useDispatch();
  const orderPay = useSelector(state => state.orderPay);
  const {loading: loadingPay, success: successPay, error: errorPay} = orderPay;
  const orderDetails = useSelector(state => state.orderDetails);
  const {loading, order, error} = orderDetails;

  const handleSuccessPayment = paymentResult => {
    dispatch(payOrder(order, paymentResult))
  }

  useEffect(() => {
    if (successPay) {
      props.history.push('/profile');
    } else {
      dispatch(detailsOrder(props.match.params.id));
    }
  }, [successPay, dispatch, props.match.params.id, props.history])

  return (
    loading ? <div>Loading...</div> : error ? <div>{error.message} </div> :
      <div>
        <div className="placeorder">
          <div className="placeorder-info">
            <div>
              <h3>
                Shipping
              </h3>
              <div>
                {order.shipping.address}, {order.shipping.city}, {order.shipping.postalCode}, {order.shipping.country}
              </div>
              <div>
                {order.isDelivered ? `Delivered at ${order.deliveredAt}` : `Not delivered`}
              </div>
            </div>
            <div>
              <h3> Payment
              </h3>
              <div>
                Payment Method: {order.payment.paymentMethod}
              </div>
              <div>
                {order.isPaid ? `Paid at ${order.paidAt}` : `Not paid`}
              </div>
            </div>
            <div>
              <ul className="cart-list-container">
                <li>
                  <h3>
                    Order Items
                  </h3>
                  <div>
                    Price
                  </div>
                </li>
                {
                  order.orderItems.length === 0 ?
                    <div>
                      Cart is empty
                    </div>
                    :
                    order.orderItems.map(cartItem =>
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
              <li className="placeorder-action-payment">
                {!order.isPaid &&
                <PaypalButton
                  amount={order.totalPrice}
                  onSuccess={handleSuccessPayment}/>
                }
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
                  ${order.itemsPrice}
                </div>
              </li>
              <li>
                <div>
                  Shipping
                </div>
                <div>
                  ${order.shippingPrice}
                </div>
              </li>
              <li>
                <div>
                  Tax
                </div>
                <div>
                  ${order.taxPrice}
                </div>
              </li>
              <li>
                <div>
                  Order Total
                </div>
                <div>
                  ${order.totalPrice}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
  )
}

export default OrderPage;