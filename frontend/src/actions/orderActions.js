import axios from 'axios';
import {
  MY_ORDER_LIST_FAIL,
  MY_ORDER_LIST_REQUEST,
  MY_ORDER_LIST_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DELETE_FAIL,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS
} from '../constants/orderConstants'

const createOrder = order => async (dispatch, getState) => {
  try {
    dispatch({type: ORDER_CREATE_REQUEST, payload: order});
    const {userSignin: {userInfo}} = getState();
    const {data: {data: newOrder}} = await axios.post('/api/orders', order, {
      headers: {Authorization: `Bearer ${userInfo.token}`}
    });
    dispatch({type: ORDER_CREATE_SUCCESS, payload: newOrder})
  } catch (e) {
    dispatch({type: ORDER_CREATE_FAIL, payload: e.message})
  }
}

const deleteOrder = orderId => async (dispatch, getState) => {
  try {
    dispatch({type: ORDER_DELETE_REQUEST, payload: orderId});
    const {userSignin: {userInfo}} = getState();
    const {data: {data: data}} = await axios.delete(`/api/order/${orderId}`, {
      headers: {Authorization: `Bearer ${userInfo.token}`}
    });
    dispatch({type: ORDER_DELETE_SUCCESS, payload: data})
  } catch (e) {
    dispatch({type: ORDER_DELETE_FAIL, payload: e.message})
  }
}

const detailsOrder = orderId => async (dispatch, getState) => {
  try {
    dispatch({type: ORDER_DETAILS_REQUEST, payload: orderId});
    const {userSignin: {userInfo}} = getState();
    const {data} = await axios.get(`/api/orders/${orderId}`, {
      headers: {Authorization: `Bearer ${userInfo.token}`}
    });
    dispatch({type: ORDER_DETAILS_SUCCESS, payload: data})
  } catch (e) {
    dispatch({type: ORDER_DETAILS_FAIL, payload: e.message})

  }
}

const payOrder = (order, paymentResult) => async (dispatch, getState) => {
  try {
    dispatch({type: ORDER_PAY_REQUEST, payload: paymentResult});
    const {userSignin: {userInfo}} = getState();
    const {data} = await axios.put(`/api/orders/${order.id}/pay`, paymentResult, {
      headers: {Authorization: `Bearer ${userInfo.token}`}
    });
    dispatch({type: ORDER_PAY_SUCCESS, payload: data})
  } catch (e) {
    dispatch({type: ORDER_PAY_FAIL, payload: e.message})

  }
}

const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({type: MY_ORDER_LIST_REQUEST});
    const {userSignin: {userInfo}} = getState();
    const {data} = await axios.get(`/api/orders/mine`, {
      headers: {Authorization: `Bearer ${userInfo.token}`}
    });
    dispatch({type: MY_ORDER_LIST_SUCCESS, payload: data})
  } catch (e) {
    dispatch({type: MY_ORDER_LIST_FAIL, payload: e.message})

  }
}

const listOrders = () => async (dispatch, getState) => {
  try {
    dispatch({type: ORDER_LIST_REQUEST});
    const {userSignin: {userInfo}} = getState();
    const {data} = await axios.get('/api/orders', {
      headers: {Authorization: `Bearer ${userInfo.token}`}
    });
    dispatch({type: ORDER_LIST_SUCCESS, payload: data})
  } catch (e) {
    dispatch({type: ORDER_LIST_FAIL, payload: e.message})

  }
}

export {
  createOrder,
  detailsOrder,
  payOrder,
  listMyOrders,
  listOrders,
  deleteOrder
};