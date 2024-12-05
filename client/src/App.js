import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AppHeader from './AppHeader/AppHeader';
import TrendingSection from './TrendingSection/TrendingSection';
import LoginPage from './Login/LoginPage';
import SignUp from './SignUp/SignUp';
import './App.css';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const trendingMovies = [
    {
      id: 1,
      title: 'Inception',
      imageUrl: 'https://m.media-amazon.com/images/I/51NbVEuw1HL._AC_SY679_.jpg',
      rating: 8.8,
      releaseDate: '2010',
    },
    {
      id: 2,
      title: 'The Matrix',
      imageUrl: 'https://m.media-amazon.com/images/I/51EG732BV3L._AC_SY679_.jpg',
      rating: 8.7,
      releaseDate: '1999',
    },
    {
      id: 3,
      title: 'Interstellar',
      imageUrl: 'https://m.media-amazon.com/images/I/51EG732BV3L._AC_SY679_.jpg',
      rating: 8.6,
      releaseDate: '2014',
    },
    {
      id: 4,
      title: 'The Dark Knight',
      imageUrl: 'https://m.media-amazon.com/images/I/51EG732BV3L._AC_SY679_.jpg',
      rating: 9.0,
      releaseDate: '2008',
    },
  ];

  const searchResults = searchQuery
    ? trendingMovies.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : trendingMovies;

  return (
    <div className="app">
      <AppHeader onSearch={setSearchQuery} />
      <Routes>
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/" element={<TrendingSection movies={searchResults} />} />
      </Routes>
    </div>
  );
};

export default App;
