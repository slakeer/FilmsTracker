import React from 'react';
import MovieCard from '../MovieCard/MovieCard';
import './TrendingSection.css';

const TrendingSection = ({ movies }) => {
  return (
    <section className="trending-section">
      <h2>Trending Movies</h2>
      <div className="movies-container">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
};

export default TrendingSection;