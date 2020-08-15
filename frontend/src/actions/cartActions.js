import axios from 'axios';
import {CART_ADD_ITEM, CART_ADD_FAIL} from '../constants/cartConstants';

const addToCart = (productId, qty) => async (dispatch) => {
  try {
    const {data} = await axios.get(`/api/products/${productId}`);
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        productId: data.__id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty: qty
      }
    })
  }
  catch (e) {
    dispatch({
      type: CART_ADD_FAIL,
      payload: e.message
    })
  }
}

export {addToCart};