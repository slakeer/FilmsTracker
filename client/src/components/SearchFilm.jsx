import React from 'react';
import PropTypes from 'prop-types';
import MovieCard from './MovieCard';

const SearchResults = ({ results }) => (
  <section>
    <h2>Search Results</h2>
    <div className="movie-list">
      {results.map(movie => (
        <MovieCard key={movie.id} {...movie} />
      ))}
    </div>
  </section>
);

SearchResults.propTypes = {
  results: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired
    })
  ).isRequired
};

export default SearchResults;
