import axios from 'axios';
import cookie from 'js-cookie';
import {
  CART_ADD_ITEM, CART_ADD_FAIL, CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING, CART_SAVE_PAYMENT
} from '../constants/cartConstants';

const addToCart = (productId, qty) => async (dispatch, getState) => {
  try {
    const {data} = await axios.get(`/api/products/${productId}`);
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        productId: data.id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty: qty
      }
    })
    const {cart: {cartItems}} = getState();
    cookie.set("cartItems", JSON.stringify(cartItems));
  } catch (e) {
    dispatch({
      type: CART_ADD_FAIL,
      payload: e.message
    })
  }
}

const removeFromCart = (productId) => async (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: productId
  })
  const {cart: {cartItems}} = getState();
  cookie.set("cartItems", JSON.stringify(cartItems));
}

const saveShipping = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING,
    payload: data
  })
}

const savePayment = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT,
    payload: data
  })
}

export {addToCart, removeFromCart, saveShipping, savePayment};