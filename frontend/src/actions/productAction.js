import axios from "axios";

import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  CLEAR_ERRORS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
} from "../constants/productConstants";
let dat = {};

export const getProduct = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCT_REQUEST });

    const { data } = await axios.get("products");
    // dat = await axios.get("product/620dee3bcba5a1229c8e9c87");

    dispatch({
      type: ALL_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: ALL_PRODUCT_FAIL,
      payload: err.response.message,
    });
  }
};

export const getProductDeatails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    await axios;
    // .get("http://192.168.56.1:4000/api/v1/product/620dee3bcba5a1229c8e9c87")
    // .then((d) => console.log(d));

    // const data = dat.data;
    // const dat = await axios.get("products");
    // console.log(dat);
    const { data } = await axios.get(`${id}`);
    console.log(data);
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.product,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: err.response.data.message,
    });
  }
};

//clearing errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
