import React, { useContext, useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import RemoveFromFavorites from "../components/cardIcons/removeFromFavorites";
import WriteReview from "../components/cardIcons/writeReview";


const FavoriteMoviesPage = () => {
  const {favorites: movieIds } = useContext(MoviesContext);

  // Create an array of queries and run in parallel.
  const favoriteMovieQueries = useQueries(
    movieIds.map((movieId) => {
      return {
        queryKey: ["movie", { id: movieId }],
        queryFn: getMovie,
      };
    })
  );

  // Check if any of the parallel queries is still loading.
  const isLoading = favoriteMovieQueries.find((m) => m.isLoading === true);

  const [feedback, setFeedback] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(feedback);
    setFeedback("");
  };

  if (isLoading) {
    return <Spinner />;
  }

  const movies = favoriteMovieQueries.map((q) => {
    q.data.genre_ids = q.data.genres.map(g => g.id)
    return q.data
  });

 

  return (
    <>
      <h2>Favorite Movies</h2>
      <PageTemplate
        movies={movies}
        action={(movie) => {
          return (
            <>
              <RemoveFromFavorites movie={movie} />
              <WriteReview movie={movie} />
            </>
          );
        }}
      />
      <h2>Feedback Form</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="feedback">Feedback:</label>
        <br />
        <textarea
          id="feedback"
          name="feedback"
          rows="4"
          cols="50"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        ></textarea>
        <br />
        <button type="submit">Submit Feedback</button>
      </form>
    </>
  );
};

export default FavoriteMoviesPage;