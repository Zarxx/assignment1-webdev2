import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import RemoveFromPlaylist from "../components/cardIcons/removeFromPlaylist";

const ToWatchPage = () => {
  const { playlist: movieIds } = useContext(MoviesContext);

  // Create an array of queries and run in parallel.
  const toWatchQueries = useQueries(
    movieIds.map((movieId) => {
      return {
        queryKey: ["movie", { id: movieId }],
        queryFn: getMovie,
      };
    })
  );

  const isLoading = toWatchQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const movies = toWatchQueries.map((q) => {
    q.data.genre_ids = q.data.genres.map((g) => g.id);
    console.log(q.data.genres);
    return q.data;
  });

  return (
    <div className="form-container">
      <PageTemplate
        title="Feedback"
        movies={movies}
        action={(movie) => {
          return (
            <>
              <RemoveFromPlaylist movie={movie} />
            </>
          );
        }}
        className="Feedback-form"
      >
        <h2>Feedback Form</h2>
        <form>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" />
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" />
          <label htmlFor="feedback">Feedback:</label>
          <textarea id="feedback" rows="5"></textarea>
          <button type="submit">Submit</button>
        </form>
      </PageTemplate>
    </div>
  );
};

export default ToWatchPage;