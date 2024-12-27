import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { fetchMovies } from './api/movie';
import LoginPage from './components/LoginPage';
import SignUp from './components/SignUp';
import TrendingSection from './components/TrendingSection';
import AppHeader from './components/AppHeader';
import MovieDetails from './components/MovieDetails';
import './App.css';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');

  useEffect(() => {
    const loadMovies = async () => {
      const fetchedMovies = await fetchMovies();
      setMovies(fetchedMovies);
    };

    loadMovies();
  }, []);

  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre
      ? movie.movie_genre.some((genre) => genre.genre.genre_name === selectedGenre)
      : true;

    return matchesSearch && matchesGenre;
  });

  return (
    <div className="app">
      <AppHeader onSearch={setSearchQuery} onGenreSelect={setSelectedGenre} />
      <Routes>
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/" element={<TrendingSection movies={filteredMovies} />} />
        <Route path="/movie/:movieId" element={<MovieDetails />} />
      </Routes>
    </div>
  );
};

export default App;
