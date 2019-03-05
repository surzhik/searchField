import {
  GET_MOVIES_LIST,
  GET_MOVIES_LIST_SUCCESS,
  GET_MOVIES_LIST_FAIL,
  SET_SEARCH_TEXT,
} from '../constants';

export default function runtime(
  state = {
    loading: false,
    searchText: '',
    data: {},
    suggestions: [],
  },
  action,
) {
  switch (action.type) {
    case GET_MOVIES_LIST:
      return {
        ...state,
        loading: true,
      };
    case GET_MOVIES_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
        suggestions:
          action.payload.data && action.payload.data.results
            ? action.payload.data.results.map(row => ({
                id: row.id,
                title: row.title,
              }))
            : [],
      };
    case GET_MOVIES_LIST_FAIL:
      return {
        ...state,
        loading: false,
        data: {},
        suggestions: [],
      };
    case SET_SEARCH_TEXT:
      return {
        ...state,
        searchText: action.payload.searchText,
      };
    default:
      return state;
  }
}
