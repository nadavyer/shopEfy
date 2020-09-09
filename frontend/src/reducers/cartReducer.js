import {CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT, CART_SAVE_SHIPPING} from '../constants/cartConstants'

const cartReducer = (state = {cartItems: [], shipping: {}, payment: {}}, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const product = state.cartItems.find(itm => itm.product === item.product);
      if (product) {
        return {
          cartItems: state.cartItems.map(cartItm => cartItm.product === item.product ? item : cartItm)
        }
      }
      return {cartItems: [...state.cartItems, item]}

    case CART_REMOVE_ITEM:
      return {
        cartItems: state.cartItems.filter(item => item.product !== action.payload)
      }

    case CART_SAVE_SHIPPING:
      return {
        ...state, shipping: action.payload
      }
    case CART_SAVE_PAYMENT:
      return {
        ...state, payment: action.payload
      }
    default:
      return state;
  }
}

export {cartReducer};