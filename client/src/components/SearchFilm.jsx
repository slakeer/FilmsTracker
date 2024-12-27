import React from 'react';
import MovieCard from './MovieCard';

const SearchResults = ({ results }) => (
  <section>
    <h2>Search Results</h2>
    <div className="movie-list">
      {results.map((movie) => (
        <MovieCard key={movie.id} {...movie} />
      ))}
    </div>
  </section>
);

export default SearchResults;
