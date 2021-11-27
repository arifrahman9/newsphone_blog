import { GET_ALL, GET_DETAIL_ALL, GET_DETAIL_USER, ISLOADING } from "./actionTypes"

const initialState = {
  blogs: [],
  blog: {},
  user: {},
  loading: false,
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL:
      return { ...state, blogs: action.payload }
    case GET_DETAIL_ALL:
      return { ...state, blog: action.payload }
    case GET_DETAIL_USER:
      return { ...state, user: action.payload }
    case ISLOADING:
      return { ...state, loading: action.payload }
    default:
      return state
  }
}
