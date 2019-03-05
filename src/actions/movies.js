/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import moviesApi from '../constants/moviesApi';
import { errorClear, errorSet } from './errors';
import {
  GET_MOVIES_LIST,
  GET_MOVIES_LIST_SUCCESS,
  GET_MOVIES_LIST_FAIL,
  SET_SEARCH_TEXT,
} from '../constants';

export const getMoviesStart = () => ({
  type: GET_MOVIES_LIST,
});

export const getMoviesSuccess = data => ({
  type: GET_MOVIES_LIST_SUCCESS,
  payload: { data },
});

export const getMoviesFail = () => ({
  type: GET_MOVIES_LIST_FAIL,
});

export function getMoviesList(page = 1) {
  return dispatch => {
    dispatch(errorClear());
    dispatch(getMoviesStart());
    return axios({
      url: `${moviesApi.url}/movie/popular?page=${page}&api_key=${
        moviesApi.api_key
      }`,
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        dispatch(getMoviesSuccess(response.data));
      })
      .catch(error => {
        dispatch(
          errorSet({
            error,
            message:
              'It is unable to load movies list. Please try again later.',
          }),
        );
        dispatch(getMoviesFail());
      });
  };
}

export function setSearchText(searchText) {
  return {
    type: SET_SEARCH_TEXT,
    payload: {
      searchText,
    },
  };
}

export function searchMovies(page = 1, searchText = '') {
  return dispatch => {
    dispatch(errorClear());
    dispatch(getMoviesStart());
    return axios({
      url: `${
        moviesApi.url
      }/search/movie?page=${page}&query=${searchText}&api_key=${
        moviesApi.api_key
      }`,
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        dispatch(getMoviesSuccess(response.data));
      })
      .catch(error => {
        dispatch(
          errorSet({
            error,
            message:
              'It is unable to load movies list. Please try again later.',
          }),
        );
        dispatch(getMoviesFail());
      });
  };
}
