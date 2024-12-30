import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { fetchMovies } from './api/movie';
import LoginPage from './components/LoginPage';
import SignUp from './components/SignUp';
import TrendingSection from './components/TrendingSection';
import AppHeader from './components/AppHeader';
import MovieDetails from './components/MovieDetails';
import FavoriteFilms from './components/FavoriteFilms';
import WatchedFilms from './components/WatchedFilms';
import './App.css';

const App = () => {
  const [allMovies, setAllMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [loading, setLoading] = useState(false);
  const [rangeStart, setRangeStart] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const MOVIE_BATCH_SIZE = 30;

  const loadInitialMovies = async () => {
    setLoading(true);
    const fetchedMovies = await fetchMovies(1, 10000);
    setAllMovies(
      fetchedMovies.map(movie => ({
        ...movie,
        movie_genre: movie.movie_genre.map(genre => ({
          ...genre,
          movie_id: String(genre.movie_id)
        }))
      }))
    );
    setRangeStart(MOVIE_BATCH_SIZE);
    setLoading(false);
  };

  const loadMoreMovies = () => {
    if (rangeStart + MOVIE_BATCH_SIZE >= allMovies.length) {
      setHasMore(false);
      return;
    }
    setRangeStart(rangeStart + MOVIE_BATCH_SIZE);
  };

  useEffect(() => {
    loadInitialMovies();
  }, []);

  const filteredMovies = allMovies.filter(movie => {
    const matchesSearch = movie.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre
      ? movie.movie_genre.some(
          genre => genre.genre.genre_name === selectedGenre
        )
      : true;

    return matchesSearch && matchesGenre;
  });

  return (
    <div className="app">
      <AppHeader onSearch={setSearchQuery} onGenreSelect={setSelectedGenre} />
      <Routes>
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route
          path="/"
          element={
            <TrendingSection
              movies={filteredMovies.slice(0, rangeStart)}
              onLoadMore={hasMore ? loadMoreMovies : null}
              loading={loading}
              hasMore={hasMore}
            />
          }
        />
        <Route path="/favorite-films/:userId" element={<FavoriteFilms />} />
        <Route path="/watched-films/:userId" element={<WatchedFilms />} />
        <Route path="/movie/:movieId" element={<MovieDetails />} />
      </Routes>
    </div>
  );
};

export default App;
