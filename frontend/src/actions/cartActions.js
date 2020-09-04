import axios from 'axios';
import cookie from 'js-cookie';
import {CART_ADD_ITEM, CART_ADD_FAIL, CART_REMOVE_ITEM} from '../constants/cartConstants';

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
  }
  catch (e) {
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

export {addToCart, removeFromCart};