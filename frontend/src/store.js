import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import {
  productDetailsReducer,
  productListReducer,
  productsSaveReducer
} from './reducers/productReducer';
import {cartReducer} from './reducers/cartReducer';
import {userSigninReducer, userUpdateReducer} from './reducers/userReducer'
import {userRegisterReducer} from './reducers/userReducer'
import {productsDeleteReducer} from './reducers/productReducer'
import {
  myOrderListReducer,
  orderCreateReducer, orderDeleteReducer,
  orderDetailsReducer,
  orderListReducer,
  orderPayReducer
} from './reducers/orderReducer'
import thunk from 'redux-thunk';
import cookie from 'js-cookie';

const cartItems = cookie.getJSON('cartItems') || [];
const userInfo = cookie.getJSON('userInfo') || null;
const initialState = {cart: {cartItems, shipping: {}, payment: {}}, userSignin: {userInfo}};

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  userUpdate: userUpdateReducer,
  productSave: productsSaveReducer,
  productDelete: productsDeleteReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  myOrderList: myOrderListReducer,
  orderList: orderListReducer,
  orderDelete: orderDeleteReducer
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;