import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { searchMovies } from '../../actions/movies';
import Loader from '../../components/Loader';
import debounce from '../../debounce';
import s from './Search.css';

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        searchMovies,
      },
      dispatch,
    ),
  };
}

function mapStateToProps({ movies, error }) {
  return {
    loading: movies.loading,
    error,
    suggestions: movies.suggestions,
  };
}

export class Search extends React.Component {
  /* eslint-disable react/forbid-prop-types */

  static propTypes = {
    suggestions: PropTypes.array,
    actions: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    suggestions: [],
  };

  state = {
    suggestions: this.props.suggestions, // list of suggestions
    searchText: '', // text in input field
    showSuggest: false, // show suggestions block
    fetching: false, // getting data from server
  };

  componentDidUpdate(prevProps) {
    /* eslint-disable react/no-did-update-set-state */
    const { suggestions, loading } = this.props;
    const stateObject = {};

    // changing suggestions list if any
    if (prevProps.suggestions !== suggestions) {
      stateObject.suggestions = suggestions;
    }

    // changing fetching if loaded
    if (prevProps.loading !== loading && !loading) {
      stateObject.fetching = false;
    }

    if (Object.keys(stateObject).length) {
      this.setState(stateObject);
    }
  }

  setFocus = () => {
    this.setState({
      showSuggest: true,
    });
  };

  setBlur = () => {
    this.setState({
      showSuggest: false,
    });
  };

  setSearch = searchText => {
    this.setState({
      searchText,
      showSuggest: false,
    });
    // here is Action on submit search
  };

  // debounce input to prevent unnecessary API call
  doSearch = debounce(() => {
    const { searchText } = this.state;
    const { actions } = this.props;

    actions.searchMovies(1, searchText);
  }, 1000);

  handleChange = event => {
    this.setState({
      suggestions: [],
      searchText: event.currentTarget.value,
      fetching: true,
    });

    this.doSearch();
  };

  handleSubmit = event => {
    event.preventDefault();
    // here is Action on submit search
  };

  render() {
    /* eslint-disable no-nested-ternary */
    const { suggestions, searchText, showSuggest, fetching } = this.state;
    const { loading } = this.props;

    return (
      <div className={s.wrap}>
        <div className={s.searchHolder}>
          <div className={s.searchField}>
            <form onSubmit={this.handleSubmit}>
              <input
                id="searchInput"
                type="text"
                placeholder="Type to search movies"
                className={s.inputField}
                value={searchText}
                onChange={this.handleChange}
                onFocus={this.setFocus}
                onBlur={this.setBlur}
              />
              <button type="submit" />
            </form>
            {loading &&
              showSuggest && (
                <div className={s.suggestionsHolder}>
                  <Loader />
                </div>
              )}
            {!loading &&
              showSuggest &&
              searchText &&
              !fetching && (
                <div className={s.suggestionsHolder}>
                  {/* eslint-disable jsx-a11y/anchor-is-valid */

                  suggestions.length ? (
                    <ul>
                      {suggestions.map(row => (
                        <li key={`sugg_${row.id}`}>
                          <a
                            href="#"
                            onMouseDown={() => this.setSearch(row.title)}
                          >
                            {row.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className={s.noSuggestions}>It is no suggestions</div>
                  )}
                </div>
              )}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(s)(Search));
