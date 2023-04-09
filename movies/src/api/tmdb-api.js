const TMDB_ENDPOINT_BASE = "https://api.themoviedb.org/3";
const TMDB_API_KEY = "45f06f3a4d7ac9bca7192e83bf7e51c8";

export const getMovies = () => {
  return fetch(
    `${TMDB_ENDPOINT_BASE}/discover/movie?api_key=${TMDB_API_KEY}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getUpcomingMovies = () => {
  return fetch(
    `${TMDB_ENDPOINT_BASE}/movie/upcoming?api_key=${TMDB_API_KEY}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const searchMovies = (query) => {
  return fetch(
    `${TMDB_ENDPOINT_BASE}/search/movie?api_key=${TMDB_API_KEY}&query=${query}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getMovie = (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  return fetch(
    `${TMDB_ENDPOINT_BASE}/movie/${id}?api_key=${TMDB_API_KEY}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getGenres = () => {
  return fetch(
    `${TMDB_ENDPOINT_BASE}/genre/movie/list?api_key=${TMDB_API_KEY}&language=en-US`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getMovieImages = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetch(
    `${TMDB_ENDPOINT_BASE}/movie/${id}/images?api_key=${TMDB_API_KEY}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getMovieReviews = (id) => {
  return fetch(
    `${TMDB_ENDPOINT_BASE}/movie/${id}/reviews?api_key=${TMDB_API_KEY}`
  )
    .then((res) => res.json())
    .then((json) => {
      return json.results;
    });
};