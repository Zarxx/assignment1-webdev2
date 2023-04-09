import React, { useState } from "react";
import { getMovies, searchMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';
import Button from '../Button';

const HomePage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleModeChange = () => {
    setIsDarkMode(!isDarkMode);
    const htmlClasses = document.querySelector('html').classList;
    if (isDarkMode) {
      htmlClasses.remove('dark');
    } else {
      htmlClasses.add('dark');
    }
  }

  const { data, error, isLoading, isError } = useQuery('discover', () => searchQuery ? searchMovies(searchQuery) : getMovies());

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }
  
  const movies = data.results;

  // Redundant, but necessary to avoid app crashing.
  const favorites = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))

  return (
    <>
      <Button onClick={handleModeChange}>
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </Button>
      <div>
        <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      </div>
      <PageTemplate
        title="Discover Movies"
        movies={movies}
        action={(movie) => {
          return (
            <>
              <AddToFavoritesIcon movie={movie} />
            </>
          );
        }}
      />
    </>
  );
};

export default HomePage;