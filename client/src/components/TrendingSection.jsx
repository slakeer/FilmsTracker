import React from 'react';
import MovieCard from './MovieCard';
import '../styles/TrendingSection.css';

const TrendingSection = ({ movies, onLoadMore, loading, hasMore }) => {
  return (
    <section className="trending-section">
      <h2>Trending Movies</h2>
      <div className="movies-container">
        {movies.map((movie) => {
          const movieIdFromGenre = movie.movie_genre[0]?.movie_id;

          return (
            <MovieCard
              key={movieIdFromGenre}
              movie={movie}
              movieIdFromGenre={movieIdFromGenre}
            />
          );
        })}
      </div>
      {hasMore && ( 
        <button
          className="load-more-btn"
          onClick={onLoadMore}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Find More'}
        </button>
      )}
    </section>
  );
};

export default TrendingSection;
