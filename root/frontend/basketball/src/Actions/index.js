// import * as types from "../Constants/ActionTypes";
import axios from 'axios'

console.log('Started Dispatch')
export function loadScores() {
    console.log('Started Dispatch2')
    return (dispatch) => {
        return axios
        .get("http://localhost:8100/scrape")
        .catch((error) => console.error(error))
        .then((response) => {
            dispatch(changeScore(response.data.scrape))
            console.log("Ended Dispatch", response.data.scrape);
        })
    }
}

export function changeScore(scores){
    return {
        type: "CHANGE_SCORES",
        scores: scores
    }
}


export function loadColor() {
  return (dispatch) => {
    return axios
      .get("http://www.colr.org/json/color/random")
        .then((response) => {
          console.log(response)
        dispatch(changeColor("#" + response.data.new_color));
      });
  };
}

export function changeColor(color) {
  return {
    type: "CHANGE_COLOR",
    color: color,
  };
}

// const receiveProducts = (products) => ({
//   type: types.RECEIVE_PRODUCTS,
//   products,
// });

// export const getAllProducts = () => (dispatch) => {
//   shop.getProducts((products) => {
//     dispatch(receiveProducts(products));
//   });
// };

// const addToCartUnsafe = (productId) => ({
//   type: types.ADD_TO_CART,
//   productId,
// });

// export const addToCart = (productId) => (dispatch, getState) => {
//   if (getState().products.byId[productId].inventory > 0) {
//     dispatch(addToCartUnsafe(productId));
//   }
// };

// export const checkout = (products) => (dispatch, getState) => {
//   const { cart } = getState();

//   dispatch({
//     type: types.CHECKOUT_REQUEST,
//   });
//   shop.buyProducts(products, () => {
//     dispatch({
//       type: types.CHECKOUT_SUCCESS,
//       cart,
//     });
//     // Replace the line above with line below to rollback on failure:
//     // dispatch({ type: types.CHECKOUT_FAILURE, cart })
//   });
// };
