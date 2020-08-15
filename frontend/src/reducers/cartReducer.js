import {CART_ADD_ITEM} from '../constants/cartConstants'

const cartReducer = (state = {cartItems: []}, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const product = state.cartItems.find(itm => itm.__id === item.productId);
      if (product) {
        return {
          cartItems: state.cartItems.map(cartItm => cartItm.productId === item.productId ? item : cartItm)
        }
      }
      return {cartItems: [...state.cartItems, item]}

    default:
      return state;
  }
}

export {cartReducer};