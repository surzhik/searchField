import { combineReducers } from 'redux';
import movies from './movies';
import runtime from './runtime';
import error from './error';

export default combineReducers({
  movies,
  error,
  runtime,
});
