import { GET_CATEGORY, GET_CATEGORIES, DELETE_CATEGORY } from '../actions/types'

const initialState = {
  categories: [],
  category: {},
  loading: true
}

export default function (state = initialState, action) {
  switch (action.type) {
    case DELETE_CATEGORY:
      return {
        ...state,
        //remove from state without page reload
        categories: state.categories.filter(
          category => category._id !== action.payload
        )
      }
    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload
      }
    case GET_CATEGORY:
      return {
        ...state,
        category: action.payload,
        loading: false
      }
    default:
      return state
  }
}
