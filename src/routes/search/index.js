import React from 'react';
import Search from './Search';

function action({ params }) {
  return {
    title: 'Search',
    chunks: ['search'],
    component: <Search type={params.searchText} />,
  };
}
export default action;
