import { ActionTypes } from "../constants/action-types";

const initialState = {
  posts: [],
  users: [],
  filteredPosts: [],
  selectedUser: "",
  loading: false,
  error: null,
};

const postReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.FETCH_POSTS_SUCCESS:
      return { ...state, posts: payload, filteredPosts: payload };
    case ActionTypes.FETCH_USERS_SUCCESS:
      return { ...state, users: payload };
    case ActionTypes.SET_FILTERED_POSTS:
      return { ...state, filteredPosts: payload };
    case ActionTypes.SET_SELECTED_USER:
      return { ...state, selectedUser: payload };
    case ActionTypes.ERROR_OCCURRED:
      return { ...state, error: payload };
    default:
      return state;
  }
};

export default postReducer;
