import axios from "axios";
import { ActionTypes } from "../constants/action-types";

export const fetchPosts = () => async (dispatch) => {
  try {
    const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
    dispatch({
      type: ActionTypes.FETCH_POSTS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: ActionTypes.ERROR_OCCURRED,
      payload: error.message,
    });
  }
};

// export const fetchUsers = () => async (dispatch) => {
//   try {
//     const response = await axios.get("https://jsonplaceholder.typicode.com/users");
//     dispatch({
//       type: ActionTypes.FETCH_USERS_SUCCESS,
//       payload: response.data,
//     });
//   } catch (error) {
//     dispatch({
//       type: ActionTypes.ERROR_OCCURRED,
//       payload: error.message,
//     });
//   }
// };
export const fetchUsers = () => async (dispatch) => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/users');
  dispatch({ type: 'FETCH_USERS_SUCCESS', payload: response.data });
};

export const setFilteredPosts = (posts) => ({
  type: ActionTypes.SET_FILTERED_POSTS,
  payload: posts,
});

export const setSelectedUser = (userId) => ({
  type: ActionTypes.SET_SELECTED_USER,
  payload: userId,
});
